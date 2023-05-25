import time

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By

CHROMEDRIVER_PATH = "./chromedriver/chromedriver"
driver = webdriver.Chrome(CHROMEDRIVER_PATH)

# open site
FACEBOOK_SITE = "https://www.facebook.com/ProReitoriadeCulturaeExtensao"
driver.get(FACEBOOK_SITE)

# close the login modal
time.sleep(1)
try:
    close_button = driver.find_element(by=By.XPATH, value='//div[@aria-label="Fechar"]')
    close_button.click()
except:
    print("Close button not found. Skipping click.")

# get limited number of posts
LIMIT_POSTS = 5
posts_content = set()

while len(posts_content) <= LIMIT_POSTS:
    # click on 'Ver mais' buttons available
    try:
        ver_mais_buttons = driver.find_elements(
            By.XPATH,
            f'//*[text()="Ver mais"]',
        )
        for button in ver_mais_buttons:
            driver.execute_script("arguments[0].click();", button)
            time.sleep(1)  # Wait for the expanded text to load
    except Exception as error:
        print(f"Error clicking on 'Ver mais' button. ERROR=[{error}]")

    # find all posts
    page_source = driver.page_source
    soup = BeautifulSoup(page_source, "html.parser")
    all_posts = soup.find_all("div", {"class": "x1yztbdb x1n2onr6 xh8yej3 x1ja2u2z"})

    # get post content information
    for post in all_posts:
        try:
            post_text = post.find(
                "span",
                {
                    "class": "x193iq5w xeuugli x13faqbe x1vvkbs x10flsy6 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x4zkp8e x41vudc x6prxxf xvq8zen xo1l8bm xzsf02u x1yc453h"
                },
            )

            posts_content.add(post_text.text)
        except Exception as error:
            print("Did not find post's text")

    # scroll down on page
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(3)

for index, post in enumerate(posts_content):
    print(f"Index: {index}, Post: {post} \n")
driver.quit()
