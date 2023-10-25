from classes.APIRequester import APIRequester
from decouple import config
from getProcessPosts import get_process_posts

api_requester = APIRequester()

API_BASE_URL = config("API_BASE_URL", default="http://localhost:9000", cast=str)

processedPosts = get_process_posts()

for processedPost in processedPosts:
    api_requester.save_event(processedPost)
