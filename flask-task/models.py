# Document created by Daniel Campos at 2025.
# This is a simple task management application using Flask and SQLAlchemy.
# It allows you to create, update, delete, and retrieve tasks with priorities and statuses.
# It also includes a SQLite database for testing purposes.
# Import required libraries

# models.py
from sqlalchemy import create_engine, ForeignKey, Column, String, Integer, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from datetime import datetime

Base = declarative_base()

class Priority(Base):
    __tablename__ = 'priority'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), unique=True)
    created_at = Column(DateTime, default=datetime.now)
    active = Column(Boolean, default=True)

class Status(Base):
    __tablename__ = 'status'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), unique=True)
    created_at = Column(DateTime, default=datetime.now)
    active = Column(Boolean, default=True)

class Task(Base):
    __tablename__ = 'task'
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(100))
    description = Column(String(500), nullable=True)
    active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.now)
    expires_at = Column(DateTime, nullable=True)
    priority_id = Column(Integer, ForeignKey('priority.id'))
    priority = relationship('Priority', backref='tasks')
    status_id = Column(Integer, ForeignKey('status.id'))
    status = relationship('Status', backref='tasks')

engine = create_engine('sqlite:///tasks.db', echo=True)
Base.metadata.create_all(bind=engine)
Session = sessionmaker(bind=engine)
session = Session()