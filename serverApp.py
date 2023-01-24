# from server import create_app
from flask import jsonify, request, Flask, make_response
from flask_cors import CORS, cross_origin
import openai
import os
import textwrap
from server.utils import prompts
from slack_sdk import WebClient
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
SLACK_BOT_TOKEN = os.getenv("SLACK_BOT_TOKEN")
channel_id = os.getenv("SLACK_CHANNEL_ID")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/gen_docstring', methods=['POST'])
def fetch_gen_docstring():
    response = {
        "code": request.json['code'],
        "language": request.json['language'],
        "docstring": request.json['docstring']
    }
    print(response)
    return jsonify(response)


if __name__ == "__main__":

    app.run(debug=True)


def gen_docstring():
    result = ""
    function = ""
    language = ""
    prompt = ""
    clipboard = ""
    if request.method == 'POST':
        print("--------------------")
        print('POST request received')
        print(request.form)
        print("--------------------")
        print(request.form.get('option') )


        openai.api_key = OPENAI_API_KEY
        function = request.form['function']
        language = request.form.get('language')


        if language == "Python":
            prompt = prompts.generate_prompt_python(function)
        elif language == "C":
            prompt = prompts.generate_prompt_c(function)
        elif language == "JS":
            prompt = prompts.generate_prompt_js(function)
        elif language == "Swift":
            prompt = prompts.generate_prompt_swift(function)

        response = openai.Completion.create(model="text-davinci-003", prompt=prompt, temperature=0., max_tokens=300)
        result = response.choices[0].text

        # Remove Header: from the result
        result = result.replace("Description:", "")
        result = result.replace("Suggested Header:", "")

        if(language == "Python"):
            result = result.splitlines()
        else:
            result = result.split('\n')

        while result[0] == "":
            result.pop(0)

        print("Result2:")
        result[0] = textwrap.fill(result[0], 80)
        print(result)
        if language == "Python":
            clipboard = "\"\"\"\n" + '\n'.join(result) + "\n\"\"\""
        else:
            clipboard = '\n'.join(result)

        print("Clipboard:")
        print(clipboard)

        send_message(channel_id, language, clipboard, function)
