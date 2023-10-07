from decouple import config
from llama_cpp import Llama

MODEL_FILENAME = "llama-2-13b-chat.Q5_K_M.gguf"
MODEL_PATH = (
    config("MODEL_BASE_PATH", default="./models", cast=str) + "/" + MODEL_FILENAME
)


class LlamaSingleton:
    _instance = None

    @staticmethod
    def getInstance():
        if LlamaSingleton._instance == None:
            LlamaSingleton()
        return LlamaSingleton._instance

    def __init__(self):
        if LlamaSingleton._instance != None:
            raise Exception("This class is a singleton!")
        else:
            LlamaSingleton._instance = Llama(
                model_path=MODEL_PATH, n_threads=6, n_ctx=1024
            )
