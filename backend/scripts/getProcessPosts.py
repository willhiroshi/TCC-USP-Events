from webscraper.seleniumFaceScraper import get_facebook_posts
from dataparser.dataparser import process_post

facebook_page = "https://www.facebook.com/ProReitoriadeCulturaeExtensao"
posts = get_facebook_posts(facebook_page=facebook_page, num_posts=2)

processed_posts = []
for post in posts:
    processed_posts.append(process_post(post))

# print(processed_posts)