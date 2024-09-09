import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { Tasks } from "../pages/Tasks";

const routes = createBrowserRouter([
    {
        path: '/auth',
        element: (
            <Login/>
        )
    },
    {
        path: '/home',
        element: (
            <Home/>
        )
    },
    {
        // path: '/group:id',
        path: '/group',
        element: (
            <Tasks/>
        )
    }
])

export default routes