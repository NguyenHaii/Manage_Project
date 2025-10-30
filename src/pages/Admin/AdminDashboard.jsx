import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ManageStudents from "./ManageStudents";
import Statistics from "./Statistics";
import Reports from "./Reports";
import AdminSidebar from "../../components/layout/AdminSidebar";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-content">
        <Routes>
          <Route path="students" element={<ManageStudents />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;
