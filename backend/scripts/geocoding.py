from classes.Logger import Logger
from geopy.geocoders import Nominatim

APP_NAME = "TCC-USP-EVENTS"


def get_lat_lon_by_address(address: str) -> tuple[str, str]:
    try:
        geolocator = Nominatim(user_agent=APP_NAME)
        location = geolocator.geocode(address, country_codes="br")
        Logger.info(f"Coords for address {address} obtained successfully - {location}")
        if location == None:
            return None, None

    except Exception as error:
        Logger.error(
            f"Not able to obtain the coords from address {address}. Default address used instead. Error=[{error}]"
        )
        address = "USP - Cidade Universitária"
        location = geolocator.geocode(address, country_codes="br")

    return str(location.latitude), str(location.longitude)
