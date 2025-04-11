# Document created by Daniel Campos at 2025.
# This is a simple task management application using Flask and SQLAlchemy.
# It allows you to create, update, delete, and retrieve tasks with priorities and statuses.
# It also includes a SQLite database for testing purposes.
# Import required libraries

from flask import Flask
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from seed import seed_database
from task_controller import controllers as task_controller
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.run(host='0.0.0.0', port=4200)

Base = declarative_base()

# Database connection to SQLite for testing
engine = create_engine('sqlite:///tasks.db', echo=True)

Base.metadata.create_all(bind=engine)
Session = sessionmaker(bind=engine)
session = Session()

# seed the database
seed_database()

@app.teardown_appcontext
def shutdown_session(exception=None):
    session.close()

@app.route('/')
def hello_world():
    return 'App created by Daniel Campos'

# Create a blueprint for the task controller
@task_controller.route('/')
def index():
    return "Task Controller"
app.register_blueprint(task_controller, url_prefix='/Task')

if __name__ == '__main__':
    app.run(debug=True)
