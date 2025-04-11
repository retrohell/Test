# Document created by Daniel Campos at 2025.
# This is a simple task management application using Flask and SQLAlchemy.
# It allows you to create, update, delete, and retrieve tasks with priorities and statuses.
# It also includes a SQLite database for testing purposes.
# Import required libraries

from models import Priority, Status, Task
from datetime import datetime
from models import session

# Seed to database
def seed_database():
    priorityHigh = Priority(name='High', active=True)
    priorityLow = Priority(name='Low', active=True)
    statusOpen = Status(name='Open', active=True)
    statusClosed = Status(name='Closed', active=True)
    task = Task(title='Test Task', description='This is a test task', priority_id=1,
                status_id=1, expires_at=datetime.now(), active=True)

    # Add to session and commit
    if not session.query(Priority).filter_by(name='Low').first():
        session.add(priorityLow)
    if not session.query(Priority).filter_by(name='High').first():
        session.add(priorityHigh)
    if not session.query(Status).filter_by(name='Open').first():
        session.add(statusOpen)
    if not session.query(Status).filter_by(name='Closed').first():
        session.add(statusClosed)
    if not session.query(Task).filter_by(title='Test Task').first():
        session.add(task)

    session.commit()