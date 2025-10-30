import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudentProvider } from "../src/context/StudentContext";
import AdminDashboard from "../src/pages/Admin/AdminDashboard";
// import StudentDashboard from "../src/pages/Student/StudentDashboard";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Trang đăng nhập */}
        <Route path="/" element={<Login />} />

        {/* Trang admin, có context quản lý học sinh */}
        <Route
          path="/admin/*"
          element={
            <StudentProvider>
              <AdminDashboard />
            </StudentProvider>
          }
        />

        {/* Trang student */}
        {/* <Route path="/student/*" element={<StudentDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
