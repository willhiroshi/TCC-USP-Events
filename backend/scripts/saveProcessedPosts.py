from getProcessPosts import getProcessPosts
import logging
import requests

logging.root.setLevel(logging.INFO)

processedPosts = getProcessPosts()

header = {'Content-type': 'application/json'}

for processedPost in processedPosts:
    response = requests.post('http://127.0.0.1:9000/events', headers=header, json=processedPost)
    if response.status_code >= 300:
        logging.error(f" Falha ao salvar post no banco {processedPost}\n")
    else:
        logging.info(f" Post salvo com sucesso: {processedPost}\n")
