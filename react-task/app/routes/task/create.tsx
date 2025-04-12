// Document created by Daniel Campos at 2025.
// This is a simple task management application using Flask and SQLAlchemy.
// It allows you to create, update, delete, and retrieve tasks with priorities and statuses.
// It also includes a SQLite database for testing purposes.
// Import required libraries

import {useEffect, useState} from "react";
import type {Route} from "./+types/create";
import {useNavigate} from "react-router-dom";
import {GetAsync, PostAsync} from "~/rest-service/rest-service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type {TaskModel} from "~/models/task-model";
import type {PropertyModel} from "~/models/property-model";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Create task"},
        {name: "description", content: "Create a new task"},
    ];
}

export default function Create() {
    const [task, setTask] = useState<TaskModel>({
        id: 0,
        title: "",
        description: "",
        expires_at: new Date(),
        priority_id: 1,
        status_id: 1,
        created_at: new Date(),
        active: true,
    });
    const [status, setStatus] = useState<PropertyModel[] | null>(null);
    const [priorities, setPriorities] = useState<PropertyModel[] | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const tasks = await PostAsync('Task/Create', task);
            alert(tasks.message);
            navigate('../');
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
    };

    // GET ALL PROPERTIES
    const fetchProperties = async () => {
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
        fetchProperties();
    }, []);

    return (
        <div className={"grid grid-cols-6 gap-4 p-4 rounded"}>
            <form onSubmit={handleSubmit} className={"col-span-6"}>
                <div className={"card col-span-6 grid grid-cols-6 justify-between"}>
                    <h1 className={"col-span-6"}>Create new task</h1>
                    <div className={"col-span-6"}>
                        <label htmlFor="title"><b>Title:*</b></label>
                        <input
                            id="title"
                            type="text" inputMode={"text"}
                            value={task.title}
                            onChange={(e) => setTask({...task, title: e.target.value})}
                            required
                        />
                    </div>
                    <div className={"col-span-6"}>
                        <label htmlFor="description"><b>Description:*</b></label>
                        <textarea
                            id="description"
                            value={task.description}
                            onChange={(e) => setTask({...task, description: e.target.value})}
                            required
                        />
                    </div>
                    <div className={"col-span-2"} style={{margin: "1rem"}}>
                        <label htmlFor="description"><b>Priority:*</b></label>
                        <select
                            id="priority"
                            value={task.priority_id}
                            onChange={(e) => setTask({...task, priority_id: parseInt(e.target.value)})}
                            required>
                            {priorities?.map((priority) => (
                                <option key={priority.id} value={priority.id}>
                                    {priority.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={"col-span-2"} style={{margin: "1rem"}}>
                        <label><b>Status:*</b></label>
                        <select
                            id="priority"
                            value={task.status_id}
                            onChange={(e) => setTask({...task, status_id: parseInt(e.target.value)})}
                            required>
                            {status?.map((status) => (
                                <option key={status.id} value={status.id}>
                                    {status.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={"col-span-2"} style={{margin: "1rem"}}>
                        <label htmlFor="expires_at"><b>Expires:*</b></label>
                        <div className={"w-full"}>
                            <DatePicker
                                id="expires_at"
                                selected={task.created_at}
                                onChange={(date) => setTask({...task, created_at: date || new Date()})}
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>
                    </div>
                    <div className={"col-span-6 flex justify-end items-center"}>
                        <button type="submit" style={{width: "15%"}}>Save</button>
                    </div>
                </div>
            </form>
        </div>
    );
}