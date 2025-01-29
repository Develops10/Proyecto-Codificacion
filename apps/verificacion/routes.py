from flask import Blueprint, render_template, request,redirect,url_for,jsonify, session
from ..database.dpto import get_db_connection2,get_db_connection_importadora

app_verificacion = Blueprint('verificacion', __name__)

@app_verificacion.route('/')
def verificacion():
    
    return render_template ('verificacion.html')



#VERIFICACACION DE CODIGO ANTES DE LA CREACION DE CODIGO TIO

@app_verificacion.route('/verificarcodigo',methods=['POST', 'GET'])
def verificacion_de_codigo():
    try:
        data = request.json
    
        conexion = get_db_connection2()
        cursor = conexion.cursor()
        cursor.execute("SELECT * FROM MA_CODIGOS WHERE c_Codigo = ?",(data['codigo']))
      
        columns = [column[0] for column in cursor.description]

        rows = cursor.fetchall()
        data = [dict(zip(columns, row)) for row in rows]

        conexion.close()

        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

