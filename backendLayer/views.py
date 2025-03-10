from flask import Flask, render_template, jsonify, request, session
import requests, json, yaml, csv

app = Flask( __name__)

@app.route('/homepage')
def testFunction():
    print("FAHMI")
    return


if __name__ == '__main__':
    app.run()