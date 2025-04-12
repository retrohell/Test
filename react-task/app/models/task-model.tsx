// Document created by Daniel Campos at 2025.
// This is a simple task management application using Flask and SQLAlchemy.
// It allows you to create, update, delete, and retrieve tasks with priorities and statuses.
// It also includes a SQLite database for testing purposes.
// Import required libraries

export interface TaskModel {
    id: number;
    title: string;
    description: string;
    priority_id: number;
    status_id: number;
    created_at: Date; // ISO 8601 format (e.g., "2023-01-01T00:00:00Z")
    expires_at: Date; // ISO 8601 format
    active: boolean;
}