import React from "react";
import Signup from "./Signup.js";
import { AuthProvider } from "../contexts/AuthContext.js";

export default function App() {
  return (
    <>
    <AuthProvider>
      <div style={{ maxWidth:"400px" }}>
         <Signup />
      </div>
    </AuthProvider>
    </>
  );
}
