import time
from urllib.parse import urlparse

from bs4 import BeautifulSoup
from classes.Logger import Logger
from classes.Scraper import Scraper
from classes.types.Post import RawPost
from classes.types.WebPage import WebPage
from classes.WebDriverInstance import WebDriverInstance
from decouple import config
from selenium.webdriver.common.by import By

logger = Logger(__name__)

FACEBOOK_MAIN_PAGE = "https://www.facebook.com/"
FACEBOOK_EMAIL = config("FACEBOOK_EMAIL")
FACEBOOK_PASSWORD = config("FACEBOOK_PASSWORD")


class FaceScraper(Scraper):
    def __init__(self):
        super().__init__()

    def _pre_process_post_link(self, post_link: str) -> str:
        parsed_link = urlparse(post_link)
        clean_link = parsed_link.scheme + "://" + parsed_link.netloc + parsed_link.path
        return clean_link

    def _login(self, email: str, password: str) -> None:
        self.web_driver.get(FACEBOOK_MAIN_PAGE)
        time.sleep(5)

        email_input = self.web_driver.find_element(By.NAME, "email")
        email_input.send_keys(email)

        password_input = self.web_driver.find_element(By.NAME, "pass")
        password_input.send_keys(password)

        login_button = self.web_driver.find_element(By.NAME, "login")
        login_button.click()

    def get_posts(
        self, facebook_webpages: set[WebPage], num_posts: int = 5
    ) -> set[RawPost]:
        # Instantiate web driver when needed
        self.web_driver = WebDriverInstance().get_instance()

        # login if necessary
        try:
            self._login(FACEBOOK_EMAIL, FACEBOOK_PASSWORD)
            time.sleep(3)
        except:
            logger.info("Login not necessary. Skipping login.\n")

        # get posts from pages
        all_posts_content = set()

        for facebook_webpage in facebook_webpages:
            logger.info(f"Scraping Facebook page: {facebook_webpage.link}\n")

            # open specific page
            self.web_driver.get(facebook_webpage.link)
            time.sleep(3)

            # get limited number of posts
            posts_content = set()
            reach_maximum_posts = False
            while not reach_maximum_posts:
                # click on 'Ver mais' buttons available
                try:
                    ver_mais_buttons = self.web_driver.find_elements(
                        By.XPATH,
                        f'//*[text()="Ver mais"]',
                    )
                    for button in ver_mais_buttons:
                        self.web_driver.execute_script("arguments[0].click();", button)
                        time.sleep(2)  # Wait for the expanded text to load
                except Exception as error:
                    logger.error(
                        f"Error clicking on 'Ver mais' button. ERROR=[{error}]\n"
                    )

                # find all posts
                page_source = self.web_driver.page_source
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
                        post_link = self._pre_process_post_link(post_time.get("href"))
                        logger.info(
                            f"[Post {len(posts_content)}] Post link: {post_link}\n"
                        )
                        logger.info(
                            f"[Post {len(posts_content)}] Post text: {post_text.text[:30]}...\n"
                        )

                        posts_content.add(
                            RawPost(
                                post_text=post_text.text,
                                post_link=post_link,
                                post_source="Facebook",
                                webpage=facebook_webpage,
                            )
                        )
                        if len(posts_content) >= num_posts:
                            reach_maximum_posts = True
                            break
                    except Exception as error:
                        logger.error(
                            f"Something went wrong while getting post information. ERROR=[{error}]\n"
                        )

                # scroll down on page
                self.web_driver.execute_script(
                    "window.scrollTo(0, document.body.scrollHeight);"
                )
                time.sleep(3)

            all_posts_content.update(posts_content)

            logger.info(f"Posts obtained from Facebook page: {facebook_webpage.link}\n")

        self.web_driver.quit()
        return all_posts_content
