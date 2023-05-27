import instaloader
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

nltk.download('stopwords')
nltk.download('punkt')

LInstance = instaloader.Instaloader()

dateKeyWords = ['dia', 'dias', 'data']
addressKeyWords = ['local', 'endereço', 'rua', 'avenida']
applyKeywords = ['inscrição', 'inscrições']
breakWords = ['\n', '.', '', ' ', '\u2800', '\\n']

def getInfosFromPosts(captionList: list[str]):
    infosObject = {"infos": []}

    for caption in captionList:
        singleInfo = {}
        print(caption)
        for index, word in enumerate(caption):
            if word.lower() in dateKeyWords and 'date' not in singleInfo:
                print('\n\n\npalavra -> ', word)
                date = caption[index + 1]

                if word[-1] == 's':
                    date += f"-{caption[index + 3]}/{caption[index + 5]}"
                else:
                    date += f'/{caption[index + 3]}'
                singleInfo['date'] = date
                print(singleInfo)

            elif word.lower() in addressKeyWords and 'address' not in singleInfo:
                print('\n\n\nendereço -> ', word.lower())
                address = ''

                for breakpoint in range (index + 1, len(caption)):
                    address = address + f' {caption[breakpoint]}'
                    if caption[breakpoint] in breakWords:
                        index += breakpoint -1
                        word = caption[index]
                        break
                singleInfo['address'] = f"{address}".strip()
                print(singleInfo)

            elif word == 'R' and caption[index + 1] == '$':
                print(word, caption[index + 1], caption[index + 2])
                singleInfo['price'] = f'{word}{caption[index + 1]}{caption[index + 2]}'

            elif 'http' in word.lower() and 'inscriptions' not in singleInfo:
                print(word)
                singleInfo['inscriptions'] = f'{word}'

        if 'price' not in singleInfo:
            singleInfo['price'] = 'Gratuito'

        infosObject['infos'].append(singleInfo)


    return infosObject

def tokenizePosts(captionList: list[str], conjunctions: set[str]):
    tokenizedPosts = list[str]()

    print(captionList)

    for caption in captionList:
        listOfWords = word_tokenize(caption, preserve_line=True)
        tokenizedPosts.append(listOfWords)

    print("\n\ntokenizedPosts -> ", tokenizedPosts)

    return tokenizedPosts

def getInstagramCaptionPosts(hashtag: str, limit: int):
    posts = instaloader.Hashtag.from_name(LInstance.context, hashtag).get_posts()
    postsList = list(posts)
    # print('saída instagram -> ', postsList)
    captionList = list()

    for post in postsList:
        captionList.append(post.caption.replace(':', '').split('#', 1)[0])

        if (limit < 0):
            break
        else:
            limit -= 1

    return captionList

    # firstPost = postsList[0].caption.split('#', 1)[0]

    # print(postsList[0].caption)

    # return firstPost.replace('?', '').replace('!', '')

def dataParser(postsList: list[str]):
    conjunctions = set(stopwords.words('portuguese'))
    hashtag = 'eventosusp'
    posts = postsList
    # posts = getInstagramCaptionPosts(hashtag, 2)
    # with open(r'input.txt', encoding='utf-8', newline='\n') as f:
    #     listPosts = f.readlines()
    #     print('ListPosts -> ', listPosts)
    # for i in range(len(listPosts)):
    #     treatedPost = listPosts[i].strip('\n')
    #     if treatedPost != '':
    #         posts.append(treatedPost)
    # f.close()
    # posts = open(r'input.txt', 'r').read()
    print('posts -> ', posts)

    tokenizedPosts = tokenizePosts(posts, conjunctions)

    infos = getInfosFromPosts(tokenizedPosts)

    print(infos)

    return infos

    # print("------------------------------------")
    # print(post)

    # print("************************************")
    # print(tokenizedPosts)
    # print("************************************")

    # words = word_tokenize(post)
    # conjunctions = set(stopwords.words('portuguese'))


    # filteredPost = [word for word in words if not word in conjunctions]

    # print(filteredPost)