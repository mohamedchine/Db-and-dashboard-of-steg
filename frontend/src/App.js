import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/welcomepage/components/home/home";
import About from "./pages/welcomepage/components/about/about";
import Login from "./pages/welcomepage/components/login/login";
import Signup from "./pages/welcomepage/components/signup/signup";
import Wpage from "./pages/welcomepage/welcomepage";
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
          <Route path="/" element={<Wpage />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
