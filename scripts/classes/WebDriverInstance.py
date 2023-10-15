import getpass

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

username = getpass.getuser()
USER_DATA_DIR = f"/home/{username}/tcc/chrome_profiles/tcc_profile"
CHROME_DRIVER_PATH = f"/home/{username}/tcc/chromedriver"


class WebDriverInstance:
    def __init__(self):
        chrome_options = Options()
        chrome_options.add_argument(f"--user-data-dir={USER_DATA_DIR}")
        chrome_options.add_argument(f"--headless=true")

        service = Service(executable_path=CHROME_DRIVER_PATH)
        self.driver = webdriver.Chrome(service=service, options=chrome_options)

    def get_instance(self) -> webdriver.Chrome:
        return self.driver
