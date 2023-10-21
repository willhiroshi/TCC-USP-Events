import requests
from classes.Logger import Logger
from decouple import config
from getProcessPosts import get_process_posts

API_BASE_URL = config("API_BASE_URL", default="http://localhost:9000", cast=str)

processedPosts = get_process_posts()

# header = {"Content-type": "application/json"}

# logger = Logger(__name__)

# for processedPost in processedPosts:
#     response = requests.post(
#         f"{API_BASE_URL}/events", headers=header, json=processedPost
#     )
#     if response.status_code >= 300:
#         logger.error(f"Failed to save post on database: {processedPost}\n")
#     else:
#         logger.info(f"Post saved successfully: {processedPost}\n")
