import json

from classes.LlamaSingleton import LlamaSingleton
from classes.Logger import Logger

logger = Logger(__name__)

TEMPERATURE = 0.70
TOP_P = 0.95


def process_post(post_text: str):
    global llm
    get_info = 'Colete informações sobre o evento acima: data no formato string yyyy-mm-dd ou null, localização como string ou null, preço como number ou 0 e classifique como evento cultural ("culture"), esportivo ("sport") ou sem classificação ("unclassified"). Campos devem ser "date", "address", "price" e "type". Informe apenas os dados em um formato JSON, nada mais. Responda "Não é evento", caso não seja um evento. Resposta: \n'
    text_to_be_processed = "\n".join([post_text, get_info])

    try:
        logger.info(f"Start processing post text: {post_text[:50]}...")
        llm = LlamaSingleton.getInstance()

        output = llm(text_to_be_processed, temperature=TEMPERATURE, top_p=TOP_P)
        processed_text = output["choices"][0]["text"].strip().replace("```", "")

        return json.loads(processed_text)
    except Exception as error:
        logger.error(f"Error on processing post. Error=[{error}]")
        return {}
