// Document created by Daniel Campos at 2025.
// This is a simple task management application using Flask and SQLAlchemy.
// It allows you to create, update, delete, and retrieve tasks with priorities and statuses.
// It also includes a SQLite database for testing purposes.
// Import required libraries

export function Header() {
    return (
        <header className={"grid grid-cols-3 items-baseline"}>
            <div className={"col-span-3"}>
                <div className={"flex col-span-3"}>
                    <div className={"card p-1 rounded"}>
                        <a href="/" className="hover:underline">Task list</a>
                    </div>
                    <div className={"card p-1 rounded"}>
                        <a href="/create" className="hover:underline">Create task</a>
                    </div>
                </div>
            </div>
        </header>
    );
}
