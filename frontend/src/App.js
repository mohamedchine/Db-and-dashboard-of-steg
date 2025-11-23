import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/notfound/notfound";
import CentralDashboard from "./pages/centraldashboard/centraldashboard";
import GroupementDashboard from "./pages/groupementdashboard/groupementdashboard";
import DirectionDashboard from "./pages/directiondashboard/directiondashboard";
import Home from "./pages/welcomepage/components/home/home"; 
import About from "./pages/welcomepage/components/about/about"; 
import Login from "./pages/welcomepage/components/login/login"; 
import Signup from "./pages/welcomepage/components/signup/signup"; 
import RequestResetPassword from "./pages/welcomepage/components/forgetpassword/requestresetpassword"; 
import Resetpassword from "./pages/welcomepage/components/reset-password-component/resetpassword"; 
import RequireAuth from "./protectedornotroutes/requireAuth";
import PersistingLogin from "./utils/persistinglogin";
import AuthRedirect from "./utils/authredirect";
import { TurbinesProvider } from "./context/turbinesContext";
import { ScentralsProvider } from "./context/supervisedcentrals";
import { AllcentralsProvider } from './context/allcentrals'
import useWarmup from "./hooks/useWarmup";

function App() {
 
  

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Wrap everything in PersistingLogin to check auth status first */}
        <Route element={<PersistingLogin />}>
          {/* Public routes with auth redirect */}
          <Route path="/" element={<AuthRedirect />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} /> 
            <Route path="about" element={<About />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="request-reset-password" element={<RequestResetPassword />} />
            <Route path="reset-password" element={<Resetpassword />} />
          </Route>

          {/* Protected routes */}
          <Route element={<RequireAuth allowedunittype={["central"]} />}> 
            <Route
              path="/central/dashboard/*"
              element={
                <TurbinesProvider>
                  <CentralDashboard />
                </TurbinesProvider>
              }
            />
          </Route>

          <Route element={<RequireAuth allowedunittype={["groupement"]} />}> 
            <Route
              path="/groupement/dashboard/*"
              element={
                <ScentralsProvider>
                  <GroupementDashboard />
                </ScentralsProvider>
              }
            />
          </Route>

          <Route element={<RequireAuth allowedunittype={["direction"]} />}> 
            <Route
              path="/direction/dashboard/*"
              element={
                <AllcentralsProvider>
                  <DirectionDashboard />
                </AllcentralsProvider>
              }
            />
          </Route>
        </Route>

        {/* Not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
