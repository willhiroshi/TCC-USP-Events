import time

from classes.Logger import Logger
from classes.Post import Post, RawPost
from databaseRequester import get_links_on_database
from dataparser import process_post
from geocoding import get_lat_lon_by_address
from scrapers.FaceScraper import FaceScraper
from scrapers.InstagramScraper import InstagramScraper

logger = Logger(__name__)

FACEBOOK_PAGE = "https://www.facebook.com/ProReitoriadeCulturaeExtensao"
INSTAGRAM_PAGE = "https://www.instagram.com/usp.oficial/"

facebook_scraper = FaceScraper()
instagram_scraper = InstagramScraper()


def _get_all_posts() -> set[RawPost]:
    posts = set()

    instagram_posts = instagram_scraper.get_posts(instagram_page=INSTAGRAM_PAGE)
    facebook_posts = facebook_scraper.get_posts(facebook_page=FACEBOOK_PAGE)

    posts.update(instagram_posts)
    posts.update(facebook_posts)

    return posts


def get_process_posts() -> list[Post]:
    post_links_on_database = get_links_on_database()

    raw_posts = _get_all_posts()

    processed_posts = []
    for raw_post in raw_posts:
        try:
            post_link = {"post_link": raw_post.post_link}
            if raw_post.post_link in post_links_on_database:
                logger.info(
                    f"Post link already on database: {raw_post.post_link[:50]}. Skipping process\n"
                )
                continue
            processed_post: dict = process_post(raw_post.post_text)
            lat, lng = get_lat_lon_by_address(processed_post["address"])
            coords = {"lat": lat, "lng": lng}
            source = {"source": raw_post.post_source}

            processed_post.update(coords)
            processed_post.update(post_link)
            processed_post.update(source)
            processed_posts.append(processed_post)
            logger.info(
                f"Post processed: {raw_post.post_text[:50]}, post_link: {raw_post.post_link[:50]}\n"
            )

        except Exception as error:
            logger.error(f"Error on processing post {raw_post}. Error=[{error}]\n")

    return processed_posts
