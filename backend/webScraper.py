import instaloader

LInstance = instaloader.Instaloader()

def getInstagramCaptionPosts(hashtag: str):
    posts = instaloader.Hashtag.from_name(LInstance.context, hashtag).get_posts()
    postsList = list(posts)

    print(postsList[0].caption)

hashtag = "eventosusp"
getInstagramCaptionPosts(hashtag)