import json


text = '''
{
"date": "2023-06-04",
"address": "USP - Campus da Capital",
"price": "5,00"
}
'''

a = {'a': 'b'}
b = {'c': 'd'}
a.update(b)
print(a)

# print(json.loads(text))