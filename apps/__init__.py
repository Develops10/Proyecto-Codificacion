from flask import Flask

def create_app():
    app = Flask(__name__)
    app.secret_key = 'deiker040601'
    
    from .formulario.routes import app_codificacion
    from .consulta.routes import app_consulta
    from .inicio.routes import app_inicio
    from .zebra.routes import app_zebra
    from .verificacion.routes import app_verificacion
    
    app.register_blueprint(app_inicio, url_prefix = "/")
    app.register_blueprint(app_consulta, url_prefix = "/consulta")
    app.register_blueprint(app_codificacion, url_prefix = "/code")
    app.register_blueprint(app_zebra, url_prefix = "/izebra")
    app.register_blueprint(app_verificacion, url_prefix = "/verificacion")
    
    return app