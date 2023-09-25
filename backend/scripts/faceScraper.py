import logging
import time

from bs4 import BeautifulSoup
from decouple import config
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options

# Set Chrome options
firefox_options = Options()
firefox_options.add_argument("--headless")

os = config("OPERATING_SYSTEM", default="linux")
if os == "linux":
    GECKODRIVER_PATH = "./geckodriver/geckodriver-linux64"
elif os == "arm64":
    GECKODRIVER_PATH = "./geckodriver/geckodriver-aarch64"
else:
    raise ValueError(f"Unsupported OS: {os}")

service = Service(executable_path=GECKODRIVER_PATH)
driver = webdriver.Firefox(service=service, options=firefox_options)


def get_facebook_posts(facebook_page: str, num_posts: int = 5):
    FACEBOOK_SITE = "https://www.facebook.com/"

    # open site
    driver.get(FACEBOOK_SITE)

    # close the login modal
    time.sleep(5)

    # login on facebook
    email = driver.find_element(By.NAME, "email")
    email.send_keys(config("FACEBOOK_EMAIL"))

    password = driver.find_element(By.NAME, "pass")
    password.send_keys(config("FACEBOOK_PASSWORD"))

    login_button = driver.find_element(By.NAME, "login")
    login_button.click()

    # access facebook page
    time.sleep(5)
    driver.get(facebook_page)

    # wait page to load
    time.sleep(5)

    # get limited number of posts
    posts_content = set()
    reach_maximum_posts = False
    while not reach_maximum_posts:
        # click on 'Ver mais' buttons available
        try:
            ver_mais_buttons = driver.find_elements(
                By.XPATH,
                f'//*[text()="Ver mais"]',
            )
            for button in ver_mais_buttons:
                driver.execute_script("arguments[0].click();", button)
                time.sleep(2)  # Wait for the expanded text to load
        except Exception as error:
            logging.error(f" Error clicking on 'Ver mais' button. ERROR=[{error}]\n")

        # find all posts
        page_source = driver.page_source
        soup = BeautifulSoup(page_source, "html.parser")
        all_posts = soup.find_all(
            "div", {"class": "x1yztbdb x1n2onr6 xh8yej3 x1ja2u2z"}
        )

        # get post content information
        for post in all_posts:
            try:
                post_text = post.find(
                    "span",
                    {
                        "class": "x193iq5w xeuugli x13faqbe x1vvkbs x10flsy6 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x4zkp8e x41vudc x6prxxf xvq8zen xo1l8bm xzsf02u x1yc453h"
                    },
                )
                post_time = post.find(
                    "a",
                    {
                        "class": "x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x1heor9g xt0b8zv xo1l8bm"
                    },
                )
                post_link = post_time.get("href")
                posts_content.add((post_text.text, post_link))
                if len(posts_content) >= num_posts:
                    reach_maximum_posts = True
                    break
            except Exception as error:
                logging.error(f" Did not find post's text\n${error}")

        # scroll down on page
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(5)

    driver.quit()

    logging.info(f" Posts list obtained\n")

    return posts_content
