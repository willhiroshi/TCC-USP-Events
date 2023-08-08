from dataparser import process_post
from faceScraper import get_facebook_posts
from geocoding import get_lat_lon_by_address

import logging

logging.root.setLevel(logging.INFO)

facebook_page = "https://www.facebook.com/ProReitoriadeCulturaeExtensao"
posts = get_facebook_posts(facebook_page=facebook_page, num_posts=1)

def get_process_posts():
    processed_posts = []
    for post in posts:
        try:
            post_link = {'post_link': post[1]}
            processed_post:dict = process_post(post[0])
            lat, lng = get_lat_lon_by_address(processed_post["address"])
            coords = {'lat': lat, 'lng': lng}

            processed_post.update(coords)
            processed_post.update(post_link)
            processed_posts.append(processed_post)
            logging.info(f" Post processed: {post}\n")
        except Exception as error:
            logging.error(f" Error on processing post {post}. Error=[{error}]\n")

    return processed_posts
