from flask import Blueprint, render_template, request,redirect,url_for,jsonify, session


app_inicio = Blueprint('inicio', __name__)

@app_inicio.route('/')
def inicio():
    
   return render_template('inicio.html')