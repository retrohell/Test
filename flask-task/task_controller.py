# Document created by Daniel Campos at 2025.
# This is a simple task management application using Flask and SQLAlchemy.
# It allows you to create, update, delete, and retrieve tasks with priorities and statuses.
# It also includes a SQLite database for testing purposes.
# Import required libraries

# controllers.py
from flask import Blueprint, request, jsonify
from datetime import datetime
from models import session, Task

# Crear un Blueprint para los controladores
controllers = Blueprint('task_controller', __name__)

@controllers.route('/GetActiveTasks', methods=['GET'])
def get_task():
    result = session.query(Task).filter(Task.active == True).all()
    return jsonify([{
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'priority_id': task.priority_id,
        'status_id': task.status_id,
        'created_at': task.created_at,
        'expires_at': task.expires_at,
        'active': task.active
    } for task in result])

@controllers.route('/GetTask/<int:task_id>', methods=['GET'])
def get_task_by_id(task_id):
    result = session.query(Task).filter(Task.id == task_id, Task.active == True).first()
    if result:
        return jsonify({
            'id': result.id,
            'title': result.title,
            'description': result.description,
            'priority_id': result.priority_id,
            'status_id': result.status_id,
            'created_at': result.created_at,
            'expires_at': result.expires_at,
            'active': result.active
        })
    else:
        return {'message': 'Task not found'}, 404

@controllers.route('/Update', methods=['PUT'])
def update_tasks():
    data = request.get_json()
    result = session.query(Task).filter(Task.id == data['id']).first()
    if result:
        result.title = data['title']
        result.description = data['description']
        result.priority_id = data['priority_id']
        result.status_id = data['status_id']
        result.expires_at = datetime.strptime(data['expires_at'], '%Y-%m-%d %H:%M:%S')
        result.active = data.get('active', True)
        session.commit()
        return {'message': 'Task updated successfully'}, 200
    else:
        return {'message': 'Task not found'}, 404

@controllers.route('/Create', methods=['POST'])
def create_tasks():
    data = request.get_json()
    new_task = Task(
        title=data['title'],
        description=data.get('description'),
        priority_id=data['priority_id'],
        status_id=data['status_id'],
        expires_at=datetime.strptime(data['expires_at'], '%Y-%m-%d %H:%M:%S'),
        active=data.get('active', True)
    )
    session.add(new_task)
    session.commit()
    return {'message': 'Task created successfully', 'task_id': new_task.id}, 201

@controllers.route('/Delete/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = session.query(Task).filter(Task.id == task_id, Task.active == True).first()
    if task:
        session.delete(task)
        session.commit()
        return {'message': 'Task deleted successfully'}, 200
    else:
        return {'message': 'Task not found'}, 404

@controllers.route('/SoftDelete/<int:task_id>', methods=['DELETE'])
def soft_delete_tasks(task_id):
    result = session.query(Task).filter(Task.id == task_id, Task.active == True).first()
    if result:
        result.active = False
        session.commit()
        return {'message': 'Task soft deleted successfully'}, 200
    else:
        return {'message': 'Task not found'}, 404