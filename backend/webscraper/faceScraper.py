import os

from facebook_scraper import get_posts
from dotenv import load_dotenv

load_dotenv()

FACEBOOK_EMAIL = os.getenv("FACEBOOK_EMAIL")
FACEBOOK_PASSWORD = os.getenv("FACEBOOK_PASSWORD")
facebookCredentials = (FACEBOOK_EMAIL, FACEBOOK_PASSWORD)

def getFacebookPosts():
    rawPosts = get_posts('ProReitoriadeCulturaeExtensao', credentials=facebookCredentials, pages=10)

    limit = 1
    counter = 0
    posts = []
    for post in rawPosts:
        posts.append({
            'text': post['text'],
            'time': post['time'],
            'post_url': post['post_url']
        })

        counter += 1
        if counter == limit:
            break

    return posts

posts = getFacebookPosts()
