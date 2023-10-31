import json
from datetime import date

from classes.Logger import Logger
from decouple import config
from hugchat import hugchat
from hugchat.login import Login

logger = Logger(__name__)

email = config("HUGGINGFACE_EMAIL")
passwd = config("HUGGINGFACE_PASSWORD")

cookie_path_dir = "./cookies_snapshot"
sign = Login(email, passwd)

try:
    cookies = sign.loadCookiesFromDir(cookie_path_dir)
except:
    cookies = sign.login()
    sign.saveCookiesToDir(cookie_path_dir)

chatbot = hugchat.ChatBot(
    cookies=cookies.get_dict(),
    default_llm=3,
)


def process_post(post_text: str):
    get_info = f'Colete informações sobre o possível evento acima: DATA de quando o evento acontecerá no formato string yyyy-mm-dd (use a seguinte data {date.today().strftime("%Y-%m")} como referência). ENDEREÇO de onde acontecerá o evento como string. PREÇO do evento como número, coloque 0 caso o evento seja gratuito. Classifique-o como evento cultura ("culture"), esporte ("sport") ou não classificado ("unclassified"). Informe apenas os dados em um formato JSON, sem nenhuma informação adicional. Os campos do JSON devem ser "date", "address", "price" e "type". Caso o texto acima não seja um evento, apenas retorne string "null".'
    text_to_be_processed = "\n\n".join([post_text, get_info])

    try:
        logger.info(f"Start processing post text: {post_text[:50]}...\n")

        response = chatbot.chat(text_to_be_processed)
        processed_text = response.wait_until_done()

        return json.loads(processed_text)
    except Exception as error:
        logger.error(f"Error on processing post. Error=[{error}]\n")
        return {}
