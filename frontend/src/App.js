import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/welcomepage/components/home/home";
import About from "./pages/welcomepage/components/about/about";
import Login from "./pages/welcomepage/components/login/login";
import Signup from "./pages/welcomepage/components/signup/signup";
import Wpage from "./pages/welcomepage/welcomepage";
import NotFound from "./pages/notfound/notfound";
import RequestResetPassword from "./pages/welcomepage/components/forgetpassword/requestresetpassword";
import Resetpassword from "./pages/welcomepage/components/reset-password-component/resetpassword";
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
          <Route path="/welcomepage" element={<Wpage />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="request-reset-password" element={<RequestResetPassword/>}/>
            <Route path="reset-password" element={<Resetpassword/>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
