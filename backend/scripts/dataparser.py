import json

from llama_cpp import Llama
# wget -c https://huggingface.co/eachadea/ggml-vicuna-13b-1.1/resolve/main/ggml-vic13b-uncensored-q5_1.bin
MODEL_PATH = (
    "/home/cobli/Bruno/USP/TCC/TCC-USP-Events/backend/models/ggml-vic13b-uncensored-q5_1.bin"
)
llm = Llama(model_path=MODEL_PATH, n_threads=4)

TEMPERATURE = 0.70
TOP_P = 0.95


def process_post(post_text: str):
    get_info = "Colete informações sobre o evento acima em formato JSON com os valores entre aspas: data, localização, e preço. Nomeie os campos do objeto como date, address e price respectivamente ?\n\n\n"
    text_to_be_processed = "\n".join([post_text, get_info])

    output = llm(text_to_be_processed, temperature=TEMPERATURE, top_p=TOP_P)
    print(output)

    processed_text = output["choices"][0]["text"].strip().replace("```", "")
    print(processed_text)
    return json.loads(processed_text)
