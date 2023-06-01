from geopy.geocoders import Nominatim

APP_NAME = "TCC-USP-EVENTS"


def getLatLonByAddress(address: str):
    geolocator = Nominatim(user_agent=APP_NAME)
    location = geolocator.geocode(address, country_codes="br")

    return location.latitude, location.longitude
