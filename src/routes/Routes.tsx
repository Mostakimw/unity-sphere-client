import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AllUsers from "../pages/Users/AllUsers";
import AllUsersTable from "../pages/CreateTeam/AllUsersTable";
import AllTeam from "../pages/Team/AllTeam";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/users",
        element: <AllUsers />,
      },
      {
        path: "/create-team",
        element: <AllUsersTable />,
      },
      {
        path: "/teams",
        element: <AllTeam />,
      },
    ],
  },
]);

export default router;
