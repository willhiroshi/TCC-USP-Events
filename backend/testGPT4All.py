# from nomic.gpt4all import GPT4All

import gpt4all
gptj = gpt4all.GPT4All("ggml-mpt-7b-chat.bin")
messages = [{"role": "user", "content": "Quem é o atual presidente do Brasil?"}]
response = gptj.chat_completion(messages)

# # Inicialize o modelo GPT4All
# m = GPT4All(model='ggml-mpt-7b-chat')
# m.open()

# # Gere uma resposta com base em um estímulo
# response = m.prompt('how many world cup titles do brazil have?')

# # Imprime a resposta gerada
print(response)
