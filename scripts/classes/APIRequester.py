import json

import requests
from classes.Logger import Logger
from classes.types.Event import Event
from classes.types.Post import Post
from classes.types.WebPage import WebPage
from decouple import config

logger = Logger(__name__)


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

    def get_all_events(self) -> list[Event]:
        token = self._get_access_token()
        bearer_auth = BearerAuth(token)

        request_response = requests.get(f"{self.API_BASE_URL}/events", auth=bearer_auth)

        if request_response.status_code >= 300:
            logger.error(f"Failed to get events from database")
            logger.error(f"Response: {request_response.content}\n")
            return []

        logger.info(f"Events obtained successfully from database\n")
        database_content = request_response.content
        events_on_database = json.loads(database_content)["data"]
        return [Event.from_dict(event) for event in events_on_database]

    def get_all_webpages(self) -> list[WebPage]:
        token = self._get_access_token()
        bearer_auth = BearerAuth(token)

        request_response = requests.get(
            f"{self.API_BASE_URL}/webpage/all", auth=bearer_auth
        )

        if request_response.status_code >= 300:
            logger.error(f"Failed to get webpages from database")
            logger.error(f"Response: {request_response.content}\n")
            return []

        logger.info(f"Webpages obtained successfully from database\n")
        database_content = request_response.content
        webpages_on_database = json.loads(database_content)["data"]

        return [WebPage.from_dict(webpage) for webpage in webpages_on_database]

    def save_event(self, event_json: Post) -> None:
        token = self._get_access_token()
        bearer_auth = BearerAuth(token)

        request_response = requests.post(
            f"{self.API_BASE_URL}/events", auth=bearer_auth, json=event_json
        )

        if request_response.status_code >= 300:
            logger.error(f"Failed to save event on database")
            logger.error(f"Response: {request_response.content}\n")
            return None

        logger.info(f"Event saved successfully on database. Event={event_json}\n")
        return None
