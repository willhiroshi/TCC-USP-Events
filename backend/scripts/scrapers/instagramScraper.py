import getpass
import time

import undetected_chromedriver as uc
from classes.Logger import Logger
from classes.Post import RawPost
from decouple import config
from selenium.webdriver.common.by import By

username = getpass.getuser()
user_data_dir = f"/home/{username}/tcc/chrome_profiles/instagram"

options = uc.ChromeOptions()
options._user_data_dir = user_data_dir

driver = uc.Chrome(
    use_subprocess=False,
    options=options,
    headless=False,
    driver_executable_path=f"/home/{username}/.local/share/undetected_chromedriver/chromedriver_copy",
)

INSTAGRAM_MAIN_PAGE = "https://www.instagram.com/"
INSTAGRAM_EMAIL = config("INSTAGRAM_EMAIL")
INSTAGRAM_PASSWORD = config("INSTAGRAM_PASSWORD")

logger = Logger(__name__)


def _login(email: str, password: str) -> None:
    email_input = driver.find_element(By.NAME, "username")
    email_input.send_keys(email)

    password_input = driver.find_element(By.NAME, "password")
    password_input.send_keys(password)

    login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    login_button.click()


def get_instagram_posts(instagram_page: str, num_posts: int = 5) -> set[RawPost]:
    logger.info(f"Scraping Instagram page: {instagram_page}")

    # open site
    driver.get(INSTAGRAM_MAIN_PAGE)
    time.sleep(5)

    # login if necessary
    try:
        _login(INSTAGRAM_EMAIL, INSTAGRAM_PASSWORD)
        time.sleep(5)
    except:
        logger.info("Login not necessary. Skipping login.")

    # open site
    driver.get(instagram_page)
    time.sleep(5)

    # get limited number of posts
    posts_content = set()
    previous_posts = list()
    reach_maximum_posts = False
    while not reach_maximum_posts:
        # find all posts visible on current page
        all_posts = driver.find_element(
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

                # get post text
                post_text = driver.find_element(
                    By.CSS_SELECTOR,
                    "h1._aacl._aaco._aacu._aacx._aad7._aade",
                ).text

                posts_content.add(RawPost(post_text=post_text, post_link=post_link))
                if len(posts_content) >= num_posts:
                    reach_maximum_posts = True
                    break

                driver.back()

            except Exception as error:
                logger.error(
                    f"Error clicking on post and gathering its information. ERROR=[{error}]"
                )

        # scroll down on page
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(3)

    driver.quit()

    logger.info(f"Posts obtained from Instagram page: {instagram_page}")

    return posts_content