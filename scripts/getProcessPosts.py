import json
import requests

from classes.Logger import Logger
from classes.Post import Post
from dataparser import process_post
from decouple import config
from geocoding import get_lat_lon_by_address
from scrapers.instagramScraper import get_instagram_posts

logger = Logger(__name__)

# TODO: fix getting facebook posts
# facebook_page = "https://www.facebook.com/ProReitoriadeCulturaeExtensao"
# posts = get_facebook_posts(facebook_page=facebook_page, num_posts=5)

INSTAGRAM_PAGE = "https://www.instagram.com/usp.oficial/"

API_BASE_URL = config("API_BASE_URL", default="http://localhost:9000", cast=str)

header = {"Content-type": "application/json"}

def get_process_posts() -> list[Post]:
    database_content = requests.get(f"{API_BASE_URL}/events", headers=header).content
    posts_on_database = json.loads(database_content)['data']
    post_links_on_database = [post['post_link'] for post in posts_on_database]

    raw_posts = get_instagram_posts(instagram_page=INSTAGRAM_PAGE, num_posts=5)
    processed_posts = []
    for raw_post in raw_posts:
        try:
            post_link = {"post_link": raw_post.post_link}
            if raw_post.post_link in post_links_on_database:
                logger.info(f"Post link already on database: {raw_post.post_link[:50]}. Skipping process")
                continue
            processed_post: dict = process_post(raw_post.post_text)
            lat, lng = get_lat_lon_by_address(processed_post["address"])
            coords = {"lat": lat, "lng": lng}

            processed_post.update(coords)
            processed_post.update(post_link)
            processed_posts.append(processed_post)
            logger.info(f"Post processed: {raw_post.post_text[:50]}, post_link: {raw_post.post_link[:50]}")

        except Exception as error:
            logger.error(f"Error on processing post {raw_post}. Error=[{error}]")

    return processed_posts
