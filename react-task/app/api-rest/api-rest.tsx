// Document created by Daniel Campos at 2025.
// This is a simple task management application using Flask and SQLAlchemy.
// It allows you to create, update, delete, and retrieve tasks with priorities and statuses.
// It also includes a SQLite database for testing purposes.
// Import required libraries

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ApiRest() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ title: '', description: '' });

    // GET
    const GetActiveTasks = () => {
        axios
            .get('/Task/GetActiveTasks')
            .then((response) => setItems(response.data))
            .catch((error) => console.error('Error al obtener las tareas:', error));
    };

    // GET
    const GetTask = (id: number) => {
        axios
            .get(`/Task/GetTask/${id}`)
            .then((response) => setItems(response.data))
            .catch((error) => console.error('Error al obtener la tarea:', error));
    };

    // (POST)
    const CreateTask = () => {
        axios
            .post('/Task/Create', newItem)
            .then((response: any) => {
                setNewItem({ title: '', description: '' });
            })
            .catch((error) => console.error('Error al crear tarea:', error));
    };

    // (PUT)
    const UpdateTask = (id: number, updatedData: any) => {
        axios
            .put(`/Task/Update`, updatedData)
            .then(() => {

            })
            .catch((error) => console.error('Error al actualizar el tarea:', error));
    };

    // (DELETE)
    const DeleteTask = (id: number) => {
        axios
            .delete(`/Task/Delete/${id}`)
            .then(() => {
                setItems(items.filter((item: any ) => item.id !== id));
            })
            .catch((error) => console.error('Error al eliminar el tarea:', error));
    };

    // (SOFT DELETE)
    const SoftDeleteTask = (id: number) => {
        axios
            .delete(`/Task/SoftDelete/${id}`)
            .then(() => {
                setItems(items.filter((item: any ) => item.id !== id));
            })
            .catch((error) => console.error('Error al eliminar el tarea:', error));
    };

    useEffect(() => {
        GetActiveTasks();
    }, []);

    return (
        <div>
            <h1>CRUD Example</h1>

            {/* Crear */}
            <div>
                <h2>Crear nuevo elemento</h2>
                <input
                    type="text"
                    placeholder="Título"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
                <button onClick={CreateTask}>Crear</button>
            </div>

            {/* Leer */}
            <div>
                <h2>Lista de elementos</h2>
                <ul>
                    {items.map((item: any) => (
                        <li key={item.id}>
                            <strong>{item.title}</strong>: {item.description}
                            <button onClick={() => UpdateTask(item.id, { title: 'Nuevo Título', description: 'Nueva Descripción' })}>
                                Actualizar
                            </button>
                            <button onClick={() => delete(item.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ApiRest;