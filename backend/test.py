from facebook_scraper import get_posts

for post in get_posts('Pró-ReitoriaDeCulturaEExtensãoUniversitáriaUSP-PRCEU', pages=10):
    print(post['text'])