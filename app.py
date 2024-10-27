from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    expression = request.json.get('expression', '')
    try:
        result = eval(expression)
        return jsonify(result=result)
    except Exception as e:
        return jsonify(error="Invalid operation"), 400

if __name__ == '__main__':
    app.run(debug=True)
