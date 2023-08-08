import logging
import time

from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By

# Set Chrome options
chrome_options = Options()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--headless")  # Run Chrome in headless mode

CHROMEDRIVER_PATH = "./chromedriver/chromedriver-114"
driver = webdriver.Chrome(CHROMEDRIVER_PATH, options=chrome_options)


def get_facebook_posts(facebook_page: str, num_posts: int = 5):
    # open site
    driver.get(facebook_page)

    # close the login modal
    time.sleep(1)
    try:
        close_button = driver.find_element(
            by=By.XPATH, value='//div[@aria-label="Fechar"]'
        )
        close_button.click()
    except:
        logging.info(" Close button not found. Skipping click.\n")

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
                time.sleep(1)  # Wait for the expanded text to load
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
                    }
                )
                post_link = post_time.get('href')
                posts_content.add((post_text.text, post_link))
                if len(posts_content) >= num_posts:
                    reach_maximum_posts = True
                    break
            except Exception as error:
                logging.error(f" Did not find post's text\n${error}")

        # scroll down on page
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(3)

    driver.quit()

    logging.info(f" Posts list obtained\n")

    return posts_content
