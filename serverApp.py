from server import create_app
from flask import jsonify, request, Flask, make_response
from flask_cors import CORS, cross_origin

# app = create_app()

if __name__ == "__main__":
    app = Flask(__name__)
    # CORS(app, resources={r"/*": {"origins": "*"}},
    # supports_credentials=True)

    # app.config['CORS_HEADERS'] = 'Content-Type'

    app.run(debug=True)


@app.route('/', methods=['POST', 'GET'])
@cross_origin()
def get_docstring():
    if request.method == 'POST':
        response = {
            "code": request.json['code'],
            "language": request.json['language']
        }
        print(response)
        return jsonify({'message': response})
    else:
        return jsonify({'message': 'Hello World'})
