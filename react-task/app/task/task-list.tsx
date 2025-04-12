// Document created by Daniel Campos at 2025.
// This is a simple task management application using Flask and SQLAlchemy.
// It allows you to create, update, delete, and retrieve tasks with priorities and statuses.
// It also includes a SQLite database for testing purposes.
// Import required libraries

import {GetAsync} from "~/rest-service/rest-service";
import {useEffect, useState} from "react";
import {List} from "~/task/list";
import type {TaskModel} from "~/models/task-model";
import type {PropertyModel} from "~/models/property-model";

export function TaskList() {
    const [items, setItems] = useState<TaskModel[] | null>(null);
    const [status, setStatus] = useState<PropertyModel[] | null>(null);
    const [priorities, setPriorities] = useState<PropertyModel[] | null>(null);

    // GET ALL TASKS
    const fetchTasks = async () => {
        try {
            const tasks: TaskModel[] = await GetAsync('Task/GetActiveTasks', null);
            setItems(tasks);
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
        try {
            const status = await GetAsync('Task/GetProperty/1', null);
            setStatus(status);
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
        try {
            const priorities: PropertyModel[] = await GetAsync('Task/GetProperty/2', null);
            setPriorities(priorities);
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);


    if (items?.length === 0) {
        return (<div>No task list found.</div>);
    } else {
        return (
            items?.map((task: any) => (
                <List task={task} status={status} priorities={priorities}/>
            ))
        );
    }
}