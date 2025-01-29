from flask import Blueprint, render_template,request,jsonify, make_response
import sqlite3
from ..database.dpto import get_db_connection2,get_db_connection_importadora
app_consulta = Blueprint('consulta', __name__)

@app_consulta.route('/')
def inicio():

    return render_template ('opciones_de_verificacion.html')







@app_consulta.route('/consulta')
def consulta():
    def database():
        conexion  = sqlite3.connect('DATABASE.db')
        pointer = conexion.cursor()
        pointer.execute("SELECT * FROM CODIFICACION WHERE STATUS = 'PENDIENTE'")
        data = pointer.fetchall()
        conexion.close()
        return data

    a = database()
   
    return render_template ('consulta.html', data = a)




@app_consulta.route('/vericacionxcodigo',methods=['POST', 'GET'])
def vericacionxcodigo():
    try:
       
        data = request.json
    
        conexion = sqlite3.connect('DATABASE.db')
        cursor = conexion.cursor()
        cursor.execute("SELECT * FROM CODIFICACION WHERE C_BULTO = ?",(data['codigo_bulto'],))     
        columns = [column[0] for column in cursor.description]
        rows = cursor.fetchall()
        data = [dict(zip(columns, row)) for row in rows]
        conexion.close()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    



@app_consulta.route('/vericacion',methods=['POST', 'GET'])
def vericacion():
    try:
       
        data = request.json
    
        conexion = get_db_connection_importadora()
        cursor = conexion.cursor()
        cursor.execute("SELECT * FROM TablaCodificacion")     
        columns = [column[0] for column in cursor.description]
        rows = cursor.fetchall()
        data = [dict(zip(columns, row)) for row in rows]
        conexion.close()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    




@app_consulta.route('/update', methods=['PUT'])
def update():
    data = request.json
    update_var = "PROCESADO"
    conexion = sqlite3.connect('DATABASE.db')
    pointer = conexion.cursor()
    pointer.execute("UPDATE CODIFICACION SET STATUS = ? WHERE C_BULTO = ?",(update_var,data['bulto']))
    conexion.commit()
    conexion.close()
    return make_response(jsonify({
            "status": "success",
            "message": "Actualizado corecctamente.",
            "data": data  # Incluye los datos enviados si lo deseas
    }), 200)





@app_consulta.route('/cprovedor',methods=['POST', 'GET'])
def provedor():
    try:
       
        data = request.json
    
        conexion = get_db_connection2()
        cursor = conexion.cursor()
        cursor.execute("SELECT * FROM MA_PRODXPROV WHERE c_codigo  = ?",(data['c_codigo'],))
      
        columns = [column[0] for column in cursor.description]

        rows = cursor.fetchall()
        data = [dict(zip(columns, row)) for row in rows]

        conexion.close()

        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
