import {type RouteConfig, index, route} from "@react-router/dev/routes";
import type {Config} from "@react-router/dev/config";

export default [
    index("routes/home.tsx"),
    route("create", "routes/task/create.tsx"),
    route("edit/:id", "routes/task/edit.tsx"),
] satisfies RouteConfig;
