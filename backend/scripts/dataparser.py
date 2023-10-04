import json

from classes.Logger import Logger
from decouple import config
from llama_cpp import Llama

logger = Logger(__name__)


MODEL_FILENAME = "llama-2-13b-chat.Q5_K_M.gguf"
MODEL_PATH = (
    config("MODEL_BASE_PATH", default="../models", cast=str) + "/" + MODEL_FILENAME
)
llm = Llama(model_path=MODEL_PATH, n_threads=6, n_ctx=1024)

TEMPERATURE = 0.70
TOP_P = 0.95


def process_post(post_text: str):
    get_info = 'Colete informações sobre o evento acima: data no formato string DD/MM/2023 ou null, localização como string ou null, preço como number ou 0 e classifique como evento cultural ("culture"), esportivo ("sport") ou sem classificação ("unclassified"). Campos devem ser "date", "address", "price" e "type". Informe apenas os dados em um formato JSON, nada mais. Responda "Não é evento", caso não seja um evento. Resposta: \n'
    text_to_be_processed = "\n".join([post_text, get_info])

    try:
        logger.info(f"Start processing post text: {post_text[:50]}...")

        output = llm(text_to_be_processed, temperature=TEMPERATURE, top_p=TOP_P)
        processed_text = output["choices"][0]["text"].strip().replace("```", "")

        return json.loads(processed_text)
    except Exception as error:
        logger.error(f"Error on processing post. Error=[{error}]")
        return {}
