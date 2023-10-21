class User:
    def __init__(self, id, email, username, name):
        self.id = id
        self.email = email
        self.username = username
        self.name = name

    def __str__(self):
        return f"User(id={self.id}, email={self.email}, username={self.username}, name={self.name})"

    def __repr__(self):
        return self.__str__()

    def __eq__(self, other):
        return (
            self.id == other.id
            and self.email == other.email
            and self.username == other.username
            and self.name == other.name
        )

    def __hash__(self):
        return hash((self.id, self.email, self.username, self.name))

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "name": self.name,
        }

    @staticmethod
    def from_dict(user_dict):
        return User(
            id=user_dict["id"],
            email=user_dict["email"],
            username=user_dict["username"],
            name=user_dict["name"],
        )
