import { Outlet } from "react-router-dom";
// import Navbar from "./components/shared/Navbar";

const App = () => {
  return (
    <div className="w-10/12 mx-auto">
      {/* <Navbar /> */}
      <Outlet />
    </div>
  );
};

export default App;
