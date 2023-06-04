from geopy.geocoders import Nominatim

APP_NAME = "TCC-USP-EVENTS"


def getLatLonByAddress(address: str = 'USP - Cidade Universitária'):
    print("address -> ", address)
    geolocator = Nominatim(user_agent=APP_NAME)
    location = geolocator.geocode(address, country_codes="br")
    print(location.latitude, location.longitude)

    return location.latitude, location.longitude


getLatLonByAddress()