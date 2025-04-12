// Document created by Daniel Campos at 2025.
// This is a simple task management application using Flask and SQLAlchemy.
// It allows you to create, update, delete, and retrieve tasks with priorities and statuses.
// It also includes a SQLite database for testing purposes.
// Import required libraries

export function Footer() {
    return (
        <div className={"h-full w-full"}>
            <div className={"flex items-center justify-between p-4 bg-gray-800 text-white"}>
                <div>
                    <p className={"text-sm"}>© 2025 Task App. All rights reserved.</p>
                </div>
                <div>
                    Made by Daniel Campos
                </div>
            </div>
        </div>
    );
}