import json
from datetime import date

from classes.HuggingfaceRequester import HuggingfaceRequester
from classes.Logger import Logger

logger = Logger(__name__)

huggingface_requester = None


def _get_huggingface_requester():
    global huggingface_requester
    if huggingface_requester is None:
        huggingface_requester = HuggingfaceRequester()
    return huggingface_requester


def process_post(post_text: str):
    huggingface_requester = _get_huggingface_requester()

    get_info = f'Colete informações sobre o possível evento acima: DATA de quando o evento acontecerá no formato string yyyy-mm-dd (use a seguinte data {date.today().strftime("%Y-%m")} como referência). ENDEREÇO de onde acontecerá o evento como string. PREÇO do evento como número, coloque 0 caso o evento seja gratuito. Classifique-o como evento cultura ("culture"), esporte ("sport") ou não classificado ("unclassified"). Informe apenas os dados em um formato JSON, sem nenhuma informação adicional. Os campos do JSON devem ser "date", "address", "price" e "type". Caso o texto acima não seja um evento, apenas retorne string "null".'
    text_to_be_processed = "\n\n".join([post_text, get_info])

    try:
        logger.info(f"Start processing post text: {post_text[:50]}...\n")

        processed_text = huggingface_requester.parse(text_to_be_processed)

        return json.loads(processed_text)
    except Exception as error:
        logger.error(f"Error on processing post. Error=[{error}]\n")
        return {}
