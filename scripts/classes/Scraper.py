from abc import ABC, abstractmethod


class Scraper(ABC):
    def __init__(self):
        self.web_driver = None
        self.email = None
        self.password = None

    @abstractmethod
    def _login(self, email: str, password: str) -> None:
        pass

    @abstractmethod
    def get_posts(self, page: str, num_posts: int) -> set:
        pass
