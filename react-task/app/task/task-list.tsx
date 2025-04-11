// Document created by Daniel Campos at 2025.
// This is a simple task management application using Flask and SQLAlchemy.
// It allows you to create, update, delete, and retrieve tasks with priorities and statuses.
// It also includes a SQLite database for testing purposes.
// Import required libraries


import axios from "axios";
import {useEffect, useState} from "react";
import {List} from "~/task/list";

export function TaskList() {
    const [items, setItems] = useState([]);

    // GET
    const GetActiveTasks = () => {
        axios
            .get('http://127.0.0.1:5000/Task/GetActiveTasks', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((response) => setItems(response.data))
            .catch((error) => console.error('Error al obtener las tareas:', error));
    };

    useEffect(() => {
        GetActiveTasks();
    }, []);


    if (items.length === 0) {
        return (<div>No task list found.</div>);
    } else {
        return (
            items.map((task: any) => (
                <List task={task}/>
            ))
        );
    }
}