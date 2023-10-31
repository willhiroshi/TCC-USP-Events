from decouple import config
from hugchat import hugchat
from hugchat.login import Login


class HuggingfaceRequester:
    EMAIL = config("HUGGINGFACE_EMAIL")
    PASSWD = config("HUGGINGFACE_PASSWORD")

    def __init__(self):
        self.cookies = self._login()
        self.chatbot = hugchat.ChatBot(
            cookies=self.cookies.get_dict(),
            default_llm=3,  # default_llm=mistralai/Mistral-7B-Instruct-v0.1
        )

    def _login(self):
        cookie_path_dir = "./cookies_snapshot"
        sign = Login(self.EMAIL, self.PASSWD)

        try:
            cookies = sign.loadCookiesFromDir(cookie_path_dir)
        except:
            cookies = sign.login()
            sign.saveCookiesToDir(cookie_path_dir)

        return cookies

    def parse(self, instruction: str):
        response = self.chatbot.chat(instruction)
        processed_text = response.wait_until_done()

        return processed_text
