import re
import time

from classes.Logger import Logger
from classes.Scraper import Scraper
from classes.types.Post import RawPost
from classes.WebDriverInstance import WebDriverInstance
from decouple import config
from selenium.webdriver.common.by import By

logger = Logger(__name__)

INSTAGRAM_MAIN_PAGE = "https://www.instagram.com/"
INSTAGRAM_EMAIL = config("INSTAGRAM_EMAIL")
INSTAGRAM_PASSWORD = config("INSTAGRAM_PASSWORD")


class InstagramScraper(Scraper):
    def __init__(self) -> None:
        super().__init__()

    def _pre_process_post_text(self, post_text: str) -> str:
        without_hashtags = re.sub(r"#\w+\s*", "", post_text)
        without_hashtags_excessive_breaks = re.sub(r"\n+", "\n", without_hashtags)
        return without_hashtags_excessive_breaks

    def _login(self, email: str, password: str) -> None:
        self.web_driver.get(INSTAGRAM_MAIN_PAGE)
        time.sleep(5)

        email_input = self.web_driver.find_element(By.NAME, "username")
        email_input.send_keys(email)

        password_input = self.web_driver.find_element(By.NAME, "password")
        password_input.send_keys(password)

        login_button = self.web_driver.find_element(
            By.CSS_SELECTOR, "button[type='submit']"
        )
        login_button.click()

    def get_posts(self, instagram_pages: set[str], num_posts: int = 5) -> set[RawPost]:
        # Instantiate web driver when needed
        self.web_driver = WebDriverInstance().get_instance()

        # login if necessary
        try:
            self._login(INSTAGRAM_EMAIL, INSTAGRAM_PASSWORD)
            time.sleep(5)
        except:
            logger.info("Login not necessary. Skipping login.\n")

        # get posts from pages
        all_posts_content = set()

        for instagram_page in instagram_pages:
            logger.info(f"Scraping Instagram page: {instagram_page}\n")

            # open specific page
            self.web_driver.get(instagram_page)
            time.sleep(5)

            # get limited number of posts
            posts_content = set()
            previous_posts = list()
            reach_maximum_posts = False
            while not reach_maximum_posts:
                # find all posts visible on current page
                all_posts = self.web_driver.find_element(
                    By.CSS_SELECTOR,
                    "article.x1iyjqo2",
                )
                all_posts_list = all_posts.find_elements(
                    By.CSS_SELECTOR,
                    "a.x1i10hfl.xjbqb8w.x6umtig.x1b1mbwd.xaqea5y.xav7gou.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz._a6hd",
                )

                # check if there are no more posts to be loaded
                if previous_posts == all_posts_list:
                    break
                previous_posts = all_posts_list

                # click on posts and extract information
                for post in all_posts_list:
                    try:
                        post.click()
                        time.sleep(3)

                        # get post content information
                        post_link = post.get_attribute("href")
                        logger.info(
                            f"[Post {len(posts_content)}] Post link: {post_link}\n"
                        )

                        # get post text
                        post_text = self.web_driver.find_element(
                            By.CSS_SELECTOR,
                            "h1._aacl._aaco._aacu._aacx._aad7._aade",
                        ).text
                        logger.info(
                            f"[Post {len(posts_content)}] Post text: {post_text[:30]}...\n"
                        )

                        posts_content.add(
                            RawPost(
                                post_text=self._pre_process_post_text(post_text),
                                post_link=post_link,
                                post_source="Instagram",
                            )
                        )
                        if len(posts_content) >= num_posts:
                            reach_maximum_posts = True
                            break

                        logger.info(
                            f"[Post {len(posts_content)}] Post got successfully.\n"
                        )
                        self.web_driver.back()

                    except Exception as error:
                        logger.error(
                            f"Error clicking on post and gathering its information. ERROR=[{error}]\n"
                        )

                # scroll down on page
                self.web_driver.execute_script(
                    "window.scrollTo(0, document.body.scrollHeight);"
                )
                time.sleep(3)

            logger.info(f"Posts obtained from Instagram page: {instagram_page}\n")

            all_posts_content.update(posts_content)

        self.web_driver.quit()
        return all_posts_content
