import React from "react";
import Dashboard from "./components/Dashboard";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PageNotFound from "./components/PageNotFound";
function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
