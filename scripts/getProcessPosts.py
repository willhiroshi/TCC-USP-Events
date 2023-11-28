import hashlib

from classes.APIRequester import APIRequester
from classes.Logger import Logger
from classes.types.Post import Post, RawPost
from geocoding import get_lat_lon_by_address
from huggingfaceParser import process_post
from scrapers.FaceScraper import FaceScraper
from scrapers.InstagramScraper import InstagramScraper

logger = Logger(__name__)

facebook_scraper = FaceScraper()
instagram_scraper = InstagramScraper()
api_requester = APIRequester()


def _get_all_posts() -> set[RawPost]:
    all_webpages = api_requester.get_all_webpages()

    facebook_webpages = set()
    instagram_webpages = set()

    for webpage in all_webpages:
        if webpage.source == "facebook":
            facebook_webpages.add(webpage)
        elif webpage.source == "instagram":
            instagram_webpages.add(webpage)

    posts = set()

    facebook_posts = facebook_scraper.get_posts(facebook_webpages=facebook_webpages)
    instagram_posts = instagram_scraper.get_posts(instagram_webpages=instagram_webpages)

    posts.update(facebook_posts)
    posts.update(instagram_posts)

    return posts


def get_process_posts() -> list[Post]:
    all_events = api_requester.get_all_events()
    all_events_links = [event.post_link for event in all_events]

    raw_posts = _get_all_posts()

    processed_posts = []
    for raw_post in raw_posts:
        try:
            post_link = {"post_link": raw_post.post_link}
            if raw_post.post_link in all_events_links:
                logger.info(
                    f"Post link already on database: {raw_post.post_link[:50]}. Skipping process\n"
                )
                continue

            processed_post: dict = process_post(raw_post.post_text)
            lat, lng = get_lat_lon_by_address(processed_post["address"])
            coords = {"lat": lat, "lng": lng}
            source = {"source": raw_post.post_source}
            webpage = {"webpage": raw_post.webpage.id}

            hash_object = hashlib.sha256()
            post_text: str = raw_post.post_text
            post_source: str = raw_post.post_source
            hash_object.update(post_text.encode())
            hash_object.update(post_source.encode())
            hash_hex = {"hash_hex": hash_object.hexdigest()}

            processed_post.update(coords)
            processed_post.update(post_link)
            processed_post.update(source)
            processed_post.update(webpage)
            processed_post.update(hash_hex)
            processed_posts.append(processed_post)
            logger.info(f"Processed post: {processed_post}\n")

        except Exception as error:
            logger.error(f"Error on processing post {raw_post}. Error=[{error}]\n")

    return processed_posts
