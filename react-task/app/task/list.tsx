// Document created by Daniel Campos at 2025.
// This is a simple task management application using Flask and SQLAlchemy.
// It allows you to create, update, delete, and retrieve tasks with priorities and statuses.
// It also includes a SQLite database for testing purposes.
// Import required libraries

export function List(t: any) {
    return (
        <div className="task-containers p-4 rounded">
            <h2 className="text-xl font-bold">Task: {t.task.title ?? 'titulo'}</h2>
            <b>Description:</b>
            <p>{t.task.description ?? 'descripción'}</p>
            <div className="grid grid-cols-6">
                <div className="flex justify-between col-span-3">
                    <span>Created at: {t.task.created_at?.split(' GMT')[0] ?? 'creado en'}</span>
                    <span className={t.task.priority_id == 1 ? 'span-ok' : 'span-bad'}>Priority: {t.task.priority_id == 1 ? 'High' : 'Low'}</span>
                    <span className={t.task.status_id == 1 ? 'span-ok' : 'span-bad'}>Status: {t.task.status_id == 1 ? 'Open' : 'Closed'}</span>
                </div>
                <div></div>
                <div className="col-span-2 justify-end flex">
                    <button className="button-delete">Eliminar</button>
                    <button>Modificar</button>
                </div>
            </div>

        </div>
    );
}