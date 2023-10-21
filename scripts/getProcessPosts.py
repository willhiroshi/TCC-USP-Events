from classes.APIRequester import APIRequester
from classes.Logger import Logger
from classes.types.Post import Post, RawPost
from dataparser import process_post
from geocoding import get_lat_lon_by_address
from scrapers.FaceScraper import FaceScraper
from scrapers.InstagramScraper import InstagramScraper
from utils.defaultPages import default_facebook_page_links, default_instagram_page_links

logger = Logger(__name__)

facebook_scraper = FaceScraper()
instagram_scraper = InstagramScraper()
api_requester = APIRequester()


def _get_all_posts() -> set[RawPost]:
    all_webpages = api_requester.get_all_webpages()

    facebook_page_links = default_facebook_page_links.copy()
    instagram_page_links = default_instagram_page_links.copy()

    for webpage in all_webpages:
        if webpage.source == "facebook":
            facebook_page_links.append(webpage.link)
        elif webpage.source == "instagram":
            instagram_page_links.append(webpage.link)

    posts = set()

    instagram_posts = instagram_scraper.get_posts(instagram_pages=instagram_page_links)
    facebook_posts = facebook_scraper.get_posts(facebook_pages=facebook_page_links)

    posts.update(instagram_posts)
    posts.update(facebook_posts)

    return posts


def get_process_posts() -> list[Post]:
    all_events = api_requester.get_all_events()
    all_events_links = [event.post_link for event in all_events]

    raw_posts = _get_all_posts()

    # processed_posts = []
    # for raw_post in raw_posts:
    #     try:
    #         post_link = {"post_link": raw_post.post_link}
    #         if raw_post.post_link in all_events_links:
    #             logger.info(
    #                 f"Post link already on database: {raw_post.post_link[:50]}. Skipping process\n"
    #             )
    #             continue
    #         processed_post: dict = process_post(raw_post.post_text)
    #         lat, lng = get_lat_lon_by_address(processed_post["address"])
    #         coords = {"lat": lat, "lng": lng}
    #         source = {"source": raw_post.post_source}

    #         processed_post.update(coords)
    #         processed_post.update(post_link)
    #         processed_post.update(source)
    #         processed_posts.append(processed_post)
    #         logger.info(
    #             f"Post processed: {raw_post.post_text[:50]}, post_link: {raw_post.post_link[:50]}\n"
    #         )

    #     except Exception as error:
    #         logger.error(f"Error on processing post {raw_post}. Error=[{error}]\n")

    # return processed_posts
