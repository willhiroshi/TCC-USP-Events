import logging

import requests
from decouple import config
from getProcessPosts import get_process_posts

API_BASE_URL = config("API_BASE_URL")

logging.root.setLevel(logging.INFO)

processedPosts = get_process_posts()

header = {"Content-type": "application/json"}

for processedPost in processedPosts:
    response = requests.post(
        f"{API_BASE_URL}/events", headers=header, json=processedPost
    )
    if response.status_code >= 300:
        logging.error(f" Falha ao salvar post no banco {processedPost}\n")
    else:
        logging.info(f" Post salvo com sucesso: {processedPost}\n")
