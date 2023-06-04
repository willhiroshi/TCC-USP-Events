from getProcessPosts import getProcessPosts
# from backend.server.views import event
import requests

processedPosts = getProcessPosts()
# processedPosts = [{'date': '2023-06-04', 'address': 'Universidade de São Paulo (USP)', 'price': 'R$ 5,00'}]

print(processedPosts)

header = {'Content-type': 'application/json'}

for processedPost in processedPosts:
    print('post -> ', processedPost)
    response = requests.post('http://127.0.0.1:9000/events', headers=header, json=processedPost)
    print(response)