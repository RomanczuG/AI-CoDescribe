# from server import create_app
from flask import jsonify, request, Flask, make_response
from flask_cors import CORS
import openai
import os
import textwrap
from server.utils import prompts
from server.utils import explain
from server.utils import optimize
from dotenv import load_dotenv, find_dotenv
import pymongo
from flask_compress import Compress
# heroku logs --tail
# command to freeze requirements.txt
# pip freeze > requirements.txt

load_dotenv(find_dotenv())
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MONGODB_URI = os.getenv("MONGODB_URI")


app = Flask(__name__, static_folder='./client/dist', static_url_path='/')

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
# disable default compression of all eligible requests
app.config["COMPRESS_REGISTER"] = False
compress = Compress()
compress.init_app(app)

client = pymongo.MongoClient(MONGODB_URI)


def add_comment(request, language, code, output):
    """
    Use ``add_comment(request, language, code, output)`` to add a comment to the
    database.

    Parameters
    ----------
    request : str
        The request to be added
    language : str
        The language of the code
    code : str
        The code to be added
    output : str
        The output of the code

    Returns
    ----------
    save_doc : dict
        The document containing the code, language, and output
    """
    save_doc = {'docstring': output, 'code': code, 'language': language}
    db = client.get_database("requests")
    return db.python.insert_one(save_doc)


@app.route('/')
def index():
    """
    Use ``index()`` to check if the Accept-Encoding header contains gzip and if so,
    return a gzipped version of the index.html file.

    Parameters
    ----------
    accept_encoding : str
        The Accept-Encoding header from the request

    Returns
    ----------
    response : Response
        The response object containing the gzipped index.html file
    """
    accept_encoding = request.headers.get("Accept-Encoding", "")
    if "gzip" in accept_encoding:
        print("gzip html found")
        file_path = os.path.join(app.static_folder, 'index.html.gz')
        response = make_response(open(file_path, "rb").read())
        response.headers['Content-Encoding'] = 'gzip'
        response.headers['Content-Type'] = 'text/html'
        response.headers.pop("Content-Disposition", None)
        response.headers["Cache-Control"] = "public, max-age=31536000"
        return response
    else:
        return app.send_static_file('index.html')


@app.route('/assets/<file_name>')
def assets(file_name):
    accept_encoding = request.headers.get("Accept-Encoding", "")
    file_name_without_extension, file_extension = file_name.rsplit('.', 1)
    # dont check for png files
    if file_extension in ["png", "jpg", "jpeg", "gif", "svg", "ico"]:
        return app.send_static_file(f"assets/{file_name_without_extension}.{file_extension}")

    if file_extension in ["js", "css"] and "gzip" in accept_encoding:
        # if "gzip" in accept_encoding:
        print("gzip other found")
        file_path = os.path.join(
            app.static_folder, f"assets/{file_name_without_extension}.{file_extension}.gz")
        response = make_response(open(file_path, "rb").read())
        response.headers['Content-Encoding'] = 'gzip'
        if file_extension == "js":
            response.headers['Content-Type'] = 'application/javascript'
        elif file_extension == "css":
            response.headers['Content-Type'] = 'text/css'
        response.headers.pop("Content-Disposition", None)
        response.headers["Cache-Control"] = "public, max-age=31536000"
        return response
    else:
        return app.send_static_file(f"assets/{file_name_without_extension}.{file_extension}")


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
    # response.headers['Content-Disposition'] = 'attachment; filename="index.html.gz"'
    # with open("index-7c730f09.js.gz", "rb") as f:
    #     index_js_gz = f.read()
    #     response.data += index_js_gz


@app.route('/gen_docstring', methods=['POST'])
def fetch_gen_docstring():
    response = {
        "code": request.json['code'],
        "language": request.json['language'],
        "docstring": request.json['docstring']
    }
    print(response)
    response["docstring"] = gen_docstring(
        response["language"], response["code"])
    new_comment = add_comment(
        "docstring", response["language"], response["code"], response["docstring"])
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

        openai.api_key = OPENAI_API_KEY

        prompt = optimize.generate_prompt_optimize(code)

        response = openai.Completion.create(
            model="text-davinci-003", prompt=prompt, temperature=0., max_tokens=300)
        result = response.choices[0].text

        # Remove Header: from the result
        result = result.replace("Optimization:", "")
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

        openai.api_key = OPENAI_API_KEY

        prompt = explain.generate_prompt_explain(code)

        response = openai.Completion.create(
            model="text-davinci-003", prompt=prompt, temperature=0., max_tokens=300)
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

        clipboard = '\n'.join(result)

        print("Clipboard:")
        print(clipboard)

    return clipboard


def gen_docstring(language, code):
    result = ""
    prompt = ""
    clipboard = ""
    if request.method == 'POST':

        openai.api_key = OPENAI_API_KEY

        if language == "python":
            prompt = prompts.generate_prompt_python(code)
        elif language == "c":
            prompt = prompts.generate_prompt_c(code)
        elif language == "javascript":
            prompt = prompts.generate_prompt_js(code)
        elif language == "swift":
            prompt = prompts.generate_prompt_swift(code)

        response = openai.Completion.create(
            model="text-davinci-003", prompt=prompt, temperature=0., max_tokens=300)
        result = response.choices[0].text

        # Remove Header: from the result
        result = result.replace("Description:", "")
        result = result.replace("Suggested Header:", "")

        if(language == "python"):
            result = result.splitlines()
        else:
            result = result.split('\n')

        while result[0] == "":
            result.pop(0)

        # print("Result2:")
        result[0] = textwrap.fill(result[0], 80)
        # print(result)
        if language == "python":
            clipboard = "\"\"\"\n" + '\n'.join(result) + "\n\"\"\""
        else:
            clipboard = '\n'.join(result)

        print("Clipboard:")
        print(clipboard)

    return clipboard


if __name__ == "__main__":

    app.run()
    # app.run(debug=True)
