import React from "react";
import Signup from "./Signup.js";
import { AuthProvider } from "../contexts/AuthContext.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard.js";
import Login from "./Login.js";
import PrivateRoute from "./PrivateRoute.js";
import ForgotPassword from "./ForgotPassword.js";

export default function App() {
  return (
    <>
      <div style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<Dashboard />}/>
              </Route>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}
