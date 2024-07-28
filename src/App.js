import { useState } from "react";
import "./App.css";
import SideBar from "./components/layout/SideBar";

import Home from "./components/pages/Home";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  return (
    <div className="App">
      <SideBar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      <Home setSideBarOpen={setSideBarOpen} />
    </div>
  );
}

export default App;
