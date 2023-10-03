import json

from classes.Logger import Logger
from decouple import config
from llama_cpp import Llama

logger = Logger(__name__)


MODEL_FILENAME = "ggml-vic13b-uncensored-q5_1.bin"
MODEL_PATH = (
    config("MODEL_BASE_PATH", default="../models", cast=str) + "/" + MODEL_FILENAME
)
llm = Llama(model_path=MODEL_PATH, n_threads=6, verbose=True, n_ctx=1024)

TEMPERATURE = 0.70
TOP_P = 0.95


def process_post(post_text: str):
    get_info = "Colete informações sobre o evento acima em formato JSON com os valores entre aspas: data no formato DD/MM/YYYY, localização, e preço. Nomeie os campos do objeto como date, address e price respectivamente ?\n\n\n"
    text_to_be_processed = "\n".join([post_text, get_info])

    try:
        logger.info(f"Start processing post text: {post_text[:50]}...")

        output = llm(text_to_be_processed, temperature=TEMPERATURE, top_p=TOP_P)
        processed_text = output["choices"][0]["text"].strip().replace("```", "")

        logger.info(f"Post processed successfully: {processed_text}")

        return json.loads(processed_text)
    except Exception as error:
        logger.error(f"Error on processing post. Error=[{error}]")
        return {}
