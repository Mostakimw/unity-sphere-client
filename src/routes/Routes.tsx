import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AllUsers from "../pages/Users/AllUsers";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/users",
        element: <AllUsers />,
      },
    ],
  },
]);

export default router;
