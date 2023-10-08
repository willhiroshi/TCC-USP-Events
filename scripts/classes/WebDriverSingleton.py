import getpass

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service

username = getpass.getuser()
USER_DATA_DIR = f"/home/{username}/tcc/chrome_profiles/tcc_profile"
CHROME_DRIVER_PATH = f"/home/{username}/tcc/chromedriver"


class WebDriverSingleton:
    _instance = None

    @staticmethod
    def getInstance():
        if WebDriverSingleton._instance == None:
            WebDriverSingleton()
        return WebDriverSingleton._instance

    def __init__(self):
        if WebDriverSingleton._instance != None:
            raise Exception("This class is a singleton!")
        else:
            chrome_options = Options()

            chrome_options.add_argument(f"--user-data-dir={USER_DATA_DIR}")
            chrome_options.add_argument("--headless=true")

            service = Service(executable_path=CHROME_DRIVER_PATH)
            WebDriverSingleton._instance = webdriver.Chrome(
                service=service, options=chrome_options
            )
