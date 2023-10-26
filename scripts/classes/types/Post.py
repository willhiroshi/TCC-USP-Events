class Post:
    def __init__(self, date, address, price, lat, lng, post_link, source, webpage):
        self.date = date
        self.address = address
        self.price = price
        self.lat = lat
        self.lng = lng
        self.post_link = post_link
        self.source = source
        self.webpage = webpage

    def __str__(self):
        return f"Post(date={self.date}, address={self.address}, price={self.price}, lat={self.lat}, lng={self.lng}, post_link={self.post_link}), source={self.source}, webpage={self.webpage}"

    def __repr__(self):
        return f"Post(date={self.date}, address={self.address}, price={self.price}, lat={self.lat}, lng={self.lng}, post_link={self.post_link}), source={self.source}, webpage={self.webpage}"

    def __eq__(self, other):
        return (
            self.date == other.date
            and self.address == other.address
            and self.price == other.price
            and self.lat == other.lat
            and self.lng == other.lng
            and self.post_link == other.post_link
            and self.source == other.source
            and self.webpage == other.webpage
        )

    def __hash__(self):
        return hash(
            (
                self.date,
                self.address,
                self.price,
                self.lat,
                self.lng,
                self.post_link,
                self.source,
                self.webpage,
            )
        )

    def to_dict(self):
        return {
            "date": self.date,
            "address": self.address,
            "price": self.price,
            "lat": self.lat,
            "lng": self.lng,
            "post_link": self.post_link,
            "source": self.source,
            "webpage": self.webpage,
        }

    @staticmethod
    def from_dict(post_dict):
        return Post(
            date=post_dict["date"],
            address=post_dict["address"],
            price=post_dict["price"],
            lat=post_dict["lat"],
            lng=post_dict["lng"],
            post_link=post_dict["post_link"],
            source=post_dict["source"],
            webpage=post_dict["webpage"],
        )


class RawPost:
    def __init__(self, post_text, post_link, post_source, webpage):
        self.post_text = post_text
        self.post_link = post_link
        self.post_source = post_source
        self.webpage = webpage

    def __str__(self):
        return f"RawPost(post_text={self.post_text}, post_link={self.post_link}), post_source={self.post_source}, webpage={self.webpage}"

    def __repr__(self):
        return f"RawPost(post_text={self.post_text}, post_link={self.post_link}), post_source={self.post_source}, webpage={self.webpage}"

    def __eq__(self, other):
        return (
            self.post_text == other.post_text
            and self.post_link == other.post_link
            and self.post_source == other.post_source
            and self.webpage == other.webpage
        )

    def __hash__(self):
        return hash((self.post_text, self.post_link, self.post_source, self.webpage))

    def to_dict(self):
        return {
            "post_text": self.post_text,
            "post_link": self.post_link,
            "post_source": self.post_source,
            "webpage": self.webpage,
        }

    @staticmethod
    def from_dict(raw_post_dict):
        return RawPost(
            post_text=raw_post_dict["post_text"],
            post_link=raw_post_dict["post_link"],
            post_source=raw_post_dict["post_source"],
            webpage=raw_post_dict["webpage"],
        )
