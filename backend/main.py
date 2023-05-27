from webscraper.dataParser import dataParser
# from webscraper.faceScraper import *

def main():
    with open(r'../input.txt', encoding='utf-8', newline='\n') as f:
        postsList = f.readlines()
    rawPosts = postsList
    # facePosts = getFacebookPosts()

    # for facePost in facePosts:
    #     rawPosts.append(facePost['text'])
    print(rawPosts)

    infosArray = dataParser(rawPosts)

    print(infosArray)

main()
