import json
import requests
from classes.Logger import Logger
from decouple import config

logger = Logger(__name__)

API_BASE_URL = config("API_BASE_URL", default="http://localhost:9000", cast=str)

def get_links_on_database() -> list[str]:
    request_response = requests.get(f"{API_BASE_URL}/events")

    if request_response.status_code >= 300:
        logger.error(f"Failed to get post links from database\n")

        return []
    else:
        logger.info(f"Post links obtained successfully from database\n")

        database_content = request_response.content
        posts_on_database = json.loads(database_content)["data"]
        post_links_on_database = [post["post_link"] for post in posts_on_database]

        return post_links_on_database
