import json
from datetime import date

from classes.LlamaSingleton import LlamaSingleton
from classes.Logger import Logger

logger = Logger(__name__)

TEMPERATURE = 0.70
TOP_P = 0.95


def process_post(post_text: str):
    """
    Alternative to HuggingfaceParser that uses LlamaSingleton instead of Huggingface API
    running on the local server
    """

    get_info = f'\nColete informações sobre o possível evento acima: DATA de quando o evento acontecerá no formato string yyyy-mm-dd (use a seguinte data {date.today().strftime("%Y-%m")} como referência). ENDEREÇO de onde acontecerá o evento como string. PREÇO do evento como número, coloque 0 caso o evento seja gratuito. Classifique como evento cultural ("culture"), esportivo ("sport") ou sem classificação ("unclassified"). Informe apenas os dados em um formato JSON, sem nenhuma informação adicional. Os campos do JSON devem ser "date", "address", "price" e "type". Resposta: \n'
    text_to_be_processed = "\n".join([post_text, get_info])

    try:
        logger.info(f"Start processing post text: {post_text[:50]}...\n")
        llm = LlamaSingleton.getInstance()

        output = llm(text_to_be_processed, temperature=TEMPERATURE, top_p=TOP_P)
        processed_text = output["choices"][0]["text"].strip().replace("```", "")

        return json.loads(processed_text)
    except Exception as error:
        logger.error(f"Error on processing post. Error=[{error}]\n")
        return {}
