import { useState } from "react";
import "./App.css";
import SideBar from "./components/layout/SideBar";

import Home from "./components/pages/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  return (
    <div className="App">
      <ToastContainer />
      <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      <Home setSideBarOpen={setSideBarOpen} />
    </div>
  );
}

export default App;
