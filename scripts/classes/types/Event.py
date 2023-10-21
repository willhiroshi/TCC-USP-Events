class Event:
    def __init__(
        self, hash_id, post_link, address, date, price, lat, lng, type, source
    ):
        self.hash_id = hash_id
        self.post_link = post_link
        self.address = address
        self.date = date
        self.price = price
        self.lat = lat
        self.lng = lng
        self.type = type
        self.source = source

    def __str__(self):
        return f"Event(hash_id={self.hash_id}, post_link={self.post_link}, address={self.address}, date={self.date}, price={self.price}, lat={self.lat}, lng={self.lng}, type={self.type}, source={self.source})"

    def __repr__(self):
        return self.__str__()

    def __eq__(self, other):
        return (
            self.hash_id == other.hash_id
            and self.post_link == other.post_link
            and self.address == other.address
            and self.date == other.date
            and self.price == other.price
            and self.lat == other.lat
            and self.lng == other.lng
            and self.type == other.type
            and self.source == other.source
        )

    def __hash__(self):
        return hash(
            (
                self.hash_id,
                self.post_link,
                self.address,
                self.date,
                self.price,
                self.lat,
                self.lng,
                self.type,
                self.source,
            )
        )

    def to_dict(self):
        return {
            "hash_id": self.hash_id,
            "post_link": self.post_link,
            "address": self.address,
            "date": self.date,
            "price": self.price,
            "lat": self.lat,
            "lng": self.lng,
            "type": self.type,
            "source": self.source,
        }

    @staticmethod
    def from_dict(event_dict):
        return Event(
            hash_id=event_dict["hash_id"],
            post_link=event_dict["post_link"],
            address=event_dict["address"],
            date=event_dict["date"],
            price=event_dict["price"],
            lat=event_dict["lat"],
            lng=event_dict["lng"],
            type=event_dict["type"],
            source=event_dict["source"],
        )
