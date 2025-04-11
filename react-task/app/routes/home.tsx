// Document created by Daniel Campos at 2025.
// This is a simple task management application using Flask and SQLAlchemy.
// It allows you to create, update, delete, and retrieve tasks with priorities and statuses.
// It also includes a SQLite database for testing purposes.
// Import required libraries

import type { Route } from "./+types/home";
import { Header } from "~/settings/header";
import {Footer} from "~/settings/footer";
import {TaskList} from "~/task/task-list";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Task app" },
    { name: "description", content: "Task list" },
  ];
}

export default function Home() {
  return (<>
    <Header />
    <body className="py-2 ">
      <TaskList/>
    </body>
    <Footer />
  </>);
}
