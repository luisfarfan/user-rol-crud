import { Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";

const Loader = (Component) => (props) =>
        (<Suspense>
            <Component {...props}></Component>
        </Suspense>)

const CreateUserPage = Loader(lazy(() => import('./pages/users-create')))

const ListUserPage = Loader(lazy(() => import('./pages/users-list')))

const routes: RouteObject[] = [
    {
        path: 'create',
        element: <CreateUserPage/>
    },
    {
        path: 'list',
        element: <ListUserPage/>
    }
]

export default routes;