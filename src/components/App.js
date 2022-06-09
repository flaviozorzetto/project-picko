import React from "react";
import Signup from "./Signup.js";
import { AuthProvider } from "../contexts/AuthContext.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard.js";
import Login from "./Login.js";

export default function App() {
  return (
    <>
      <div style={{ maxWidth: "400px" }}>
        <AuthProvider>
          <Router>
            <Routes> 
              <Route exact path="/" element={<Dashboard/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </>
  );
}
