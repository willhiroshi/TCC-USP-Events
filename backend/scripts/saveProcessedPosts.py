from getProcessPosts import getProcessPosts
import requests

processedPosts = getProcessPosts()

print(processedPosts)

header = {'Content-type': 'application/json'}

for processedPost in processedPosts:
    print('post -> ', processedPost)
    response = requests.post('http://127.0.0.1:9000/events', headers=header, json=processedPost)
    print(response)