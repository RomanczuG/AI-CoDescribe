# from server import create_app
from flask import jsonify, request, Flask, make_response
from flask_cors import CORS, cross_origin
import openai
import os
import textwrap
from server.utils import prompts
from server.utils import explain
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
    response["docstring"] = gen_docstring(response["language"], response["code"])
    return jsonify(response)

@app.route('/gen_explanation', methods=['POST'])
def fetch_gen_explanation():
    response = {
        "code": request.json['code'],
        "language": request.json['language'],
        "explanation": request.json['explanation']
    }
    print(response)
    response["explanation"] = gen_explanation(response["code"])
    return jsonify(response)

@app.route('/gen_optimization', methods=['POST'])
def fetch_gen_optimization():
    response = {
        "code": request.json['code'],
        "language": request.json['language'],
        "optimization": request.json['optimization']
    }
    print(response)
    response["optimization"] = gen_optimization(response["code"])
    return jsonify(response)


def gen_optimization(code):
    result = ""
    prompt = ""
    clipboard = ""
    if request.method == 'POST':

        openai.api_key = "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"

        prompt = explain.generate_prompt_explain(code)

        response = openai.Completion.create(model="text-davinci-003", prompt=prompt, temperature=0., max_tokens=300)
        result = response.choices[0].text

        # Remove Header: from the result
        result = result.replace("Description:", "")
        result = result.replace("Suggested Header:", "")

        result = result.split('\n')

        while result[0] == "":
            result.pop(0)

        clipboard = '\n'.join(result)

        print("Clipboard:")
        print(clipboard)

    return clipboard

def gen_explanation(code):
    result = ""
    prompt = ""
    clipboard = ""
    if request.method == 'POST':

        openai.api_key = "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"


        prompt = explain.generate_prompt_explain(code)

        response = openai.Completion.create(model="text-davinci-003", prompt=prompt, temperature=0., max_tokens=300)
        result = response.choices[0].text

        # Remove Header: from the result
        result = result.replace("Description:", "")
        result = result.replace("Suggested Header:", "")

        # if(language == "Python"):
        #     result = result.splitlines()
        # else:
        result = result.split('\n')

        while result[0] == "":
            result.pop(0)

        # # print("Result2:")
        # result[0] = textwrap.fill(result[0], 80)
        # print(result)
        # if language == "Python":
        #     clipboard = "\"\"\"\n" + '\n'.join(result) + "\n\"\"\""
        # else:
        clipboard = '\n'.join(result)

        print("Clipboard:")
        print(clipboard)

    return clipboard

def gen_docstring(language, code):
    result = ""
    prompt = ""
    clipboard = ""
    if request.method == 'POST':

        openai.api_key = "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"

        if language == "Python":
            prompt = prompts.generate_prompt_python(code)
        elif language == "C++/C":
            prompt = prompts.generate_prompt_c(code)
        elif language == "JavaScript":
            prompt = prompts.generate_prompt_js(code)
        elif language == "Swift":
            prompt = prompts.generate_prompt_swift(code)

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

        # print("Result2:")
        result[0] = textwrap.fill(result[0], 80)
        # print(result)
        if language == "Python":
            clipboard = "\"\"\"\n" + '\n'.join(result) + "\n\"\"\""
        else:
            clipboard = '\n'.join(result)

        print("Clipboard:")
        print(clipboard)

    return clipboard


if __name__ == "__main__":
    # app.run()
    app.run(debug=True)


def fit_and_predict(X, y):
    
    # Fit the model to the data
    model = LinearRegression()
    model.fit(X, y)

    # Predict on a new dataset
    X_new = np.array([[0.5], [1.0], [1.5], [2.0]])
    y_pred = model.predict(X_new)

    return y_pred

    """
Use ``fit_and_predict(X, y)`` to fit a linear regression model to the data and
predict on a new dataset.

Parameters
----------
X : array-like
    The independent variable(s) used to fit the model.
y : array-like
    The dependent variable used to fit the model.

Returns
----------
y_pred : array-like
    The predicted values from the model.
"""