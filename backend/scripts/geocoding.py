from geopy.geocoders import Nominatim
import logging

APP_NAME = "TCC-USP-EVENTS"

logging.root.setLevel(logging.INFO)


def get_lat_lon_by_address(address: str):
    try:
        geolocator = Nominatim(user_agent=APP_NAME)
        location = geolocator.geocode(address, country_codes="br")
        logging.info(f" Coords for address {address} obtained successfully - {location}\n")
        if location == None:
            return None, None

    except Exception as error:
        logging.error(f" Not able to obtain the coords from address {address}. Default address used instead. Error=[{error}]\n")
        address = 'USP - Cidade Universitária'
        location = geolocator.geocode(address, country_codes="br")

    return str(location.latitude), str(location.longitude)
