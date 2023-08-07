from dataparser import process_post
from faceScraper import get_facebook_posts
from geocoding import getLatLonByAddress

import logging

logging.root.setLevel(logging.INFO)

facebook_page = "https://www.facebook.com/ProReitoriadeCulturaeExtensao"
posts = get_facebook_posts(facebook_page=facebook_page, num_posts=1)

def getProcessPosts():
    processed_posts = []
    for post in posts:
        try:
            processed_post:dict = process_post(post)
            lat, lng = getLatLonByAddress(processed_post["address"])
            coords = {'lat': lat, 'lng': lng}

            processed_post.update(coords)
            processed_posts.append(processed_post)
            logging.info(f" Post processed: {post}\n")
        except Exception as error:
            logging.error(f" Error on processing post {post}. Error=[{error}]\n")
            
    return processed_posts
