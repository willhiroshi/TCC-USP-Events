from classes.types.User import User


class WebPage:
    def __init__(self, id, link, source, users):
        self.id = id
        self.link = link
        self.source = source
        self.users = users

    def __str__(self):
        return f"WebPage(id={self.id}, link={self.link}, source={self.source}, users={self.users})"

    def __repr__(self):
        return self.__str__()

    def __eq__(self, other):
        return (
            self.id == other.id
            and self.link == other.link
            and self.source == other.source
            and self.users == other.users
        )

    def __hash__(self):
        return hash((self.id, self.link, self.source, tuple(self.users)))

    def to_dict(self):
        return {
            "id": self.id,
            "link": self.link,
            "source": self.source,
            "users": [user.to_dict() for user in self.users],
        }

    @staticmethod
    def from_dict(webpage_dict):
        return WebPage(
            id=webpage_dict["id"],
            link=webpage_dict["link"],
            source=webpage_dict["source"],
            users=[User.from_dict(user_dict) for user_dict in webpage_dict["users"]],
        )
