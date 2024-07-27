import "./App.css";
import Navbar from "./components/layout/Navbar";

import Home from "./components/pages/Home";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
