import React from "react";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";

function AdminSidebar() {
  return (
    <div className="sidebar">
      <h3>Admin Panel</h3>
      <ul>
        <li><Link to="/admin/students">Quản lý học sinh</Link></li>
        <li><Link to="/admin/statistics">Thống kê</Link></li>
        <li><Link to="/admin/reports">Báo cáo</Link></li>
        <li><Link to="/">Đăng xuất</Link></li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
