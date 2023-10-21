import json

import requests
from classes.Logger import Logger
from decouple import config


class BearerAuth(requests.auth.AuthBase):
    def __init__(self, token):
        self.token = token

    def __call__(self, r):
        r.headers["Authorization"] = "Bearer " + self.token
        return r


class APIRequester:
    API_BASE_URL = config("API_BASE_URL", default="http://localhost:9000", cast=str)
    DB_SU_USERNAME = config("DB_SU_USERNAME", default="admin", cast=str)
    DB_SU_PASSWORD = config("DB_SU_PASSWORD", default="admin", cast=str)

    def __init__(self):
        self.token = self._get_access_token()
        self.logger = Logger(__name__)
        self.bearer_auth = BearerAuth(self.token)

    def _get_access_token(self):
        response = requests.post(
            f"{self.API_BASE_URL}/auth/token",
            data={
                "username": self.DB_SU_USERNAME,
                "password": self.DB_SU_PASSWORD,
            },
        )
        if response.status_code == 200:
            return response.json().get("access")
        else:
            raise Exception("Failed to get access token")

    def get_links_on_database(self) -> list[str]:
        request_response = requests.get(
            f"{self.API_BASE_URL}/events", auth=self.bearer_auth
        )

        if request_response.status_code >= 300:
            self.logger.error(f"Failed to get post links from database")
            self.logger.error(f"Response: {request_response.content}\n")
            return []

        self.logger.info(f"Post links obtained successfully from database\n")
        database_content = request_response.content
        posts_on_database = json.loads(database_content)["data"]
        post_links_on_database = [post["post_link"] for post in posts_on_database]
        return post_links_on_database

    def get_all_webpages_links(self) -> list[str]:
        request_response = requests.get(
            f"{self.API_BASE_URL}/webpage/all-webpages", auth=self.bearer_auth
        )

        if request_response.status_code >= 300:
            self.logger.error(f"Failed to get webpages from database")
            self.logger.error(f"Response: {request_response.content}\n")
            return []

        self.logger.info(f"Webpages obtained successfully from database\n")
        database_content = request_response.content
        webpages_on_database = json.loads(database_content)["data"]
        print(json.loads(database_content)["data"])

        webpage_links = [webpage["link"] for webpage in webpages_on_database]

        return webpage_links
