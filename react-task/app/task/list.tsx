/*Document created by Daniel Campos at 2025.
 This is a simple task management application using Flask and SQLAlchemy.
 It allows you to create, update, delete, and retrieve tasks with priorities and statuses.
 It also includes a SQLite database for testing purposes.
 Import required libraries*/

import {DeleteAsync} from "~/rest-service/rest-service";
import {useNavigate} from "react-router-dom";

export function List({task, status, priorities}: { task: any; status: any; priorities: any }) {
    const navigate = useNavigate();

    const handleSoftDelete = async () => {
        try {
            const result = await DeleteAsync(`Task/SoftDelete/${task.id}`, null);
            window.location.reload()
            alert(result.message);
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const result = await DeleteAsync(`Task/Delete/${task.id}`, null);
            window.location.reload()
            alert(result.message);
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
    };

    const handlePriorities = (id: number): string => {
        const priorityName = priorities?.find((p: any) => p.id === id)?.name;
        return priorityName;
    }
    const handleStatus = (id: number) => {
        const statusName = status?.find((s: any) => s.id === id)?.name;
        return statusName;
    }

    return (
        <div className={"task-containers gap-4 rounded"}>
            <div>
                <h2 className={"text-xl font-bold"}>Task: {task.title}</h2>
            </div>
            <div>
                <b>Description:</b>
                <p>{task.description}</p>
            </div>

            <div className={"grid"}>
                <div className={"flex justify-between"}>
                    <span>Created at: {task.created_at?.split(' GMT')[0]}</span>
                    <div className={"m-4 grid justify-between items-center "}>
                        <span
                            className={task.priority_id == 1 ? 'span-ok' : 'span-bad'}>Priority: {handlePriorities(task.priority_id)} </span>
                        <span
                            className={task.status_id == 1 ? 'span-ok' : 'span-bad'}> Status: {handleStatus(task.status_id)}</span>
                    </div>
                </div>
                <div className={"justify-end flex"}>
                    <button className={"button-delete"} onClick={() => handleDelete()}>Eliminar</button>
                    <button className={"button-soft-delete"} onClick={() => handleSoftDelete()}>Desactivar</button>
                    <button onClick={() => navigate(`/edit/${task.id}`)}>Modificar</button>
                </div>
            </div>

        </div>
    );
}