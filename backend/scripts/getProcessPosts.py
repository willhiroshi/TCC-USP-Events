from dataparser import process_post
from faceScraper import get_facebook_posts
from geocoding import getLatLonByAddress

facebook_page = "https://www.facebook.com/ProReitoriadeCulturaeExtensao"
posts = get_facebook_posts(facebook_page=facebook_page, num_posts=2)

def getProcessPosts():
    processed_posts = []
    for post in posts:
        processed_post:dict = process_post(post)
        lat, lng = getLatLonByAddress(processed_post["address"])
        coords = {'lat': lat, 'lng': lng}

        processed_post.update(coords)
        print('post processado -> ', processed_post)
        processed_posts.append(processed_post)
        print('coords -> ',lat, lng)

    return processed_posts
