import React, { useState } from "react";
import "./Login.css";
import RoleSelector from "../../components/ui/RoleSelector";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom"; 

function Login() {
  const [role, setRole] = useState("student"); // "admin" hoặc "student"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


    const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password, role);
    if (!result.success) {
      setError(result.message);
    } else {
      if (role === "admin") navigate("/admin");
      else navigate("/student");
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng nhập hệ thống quản lý học sinh</h2>
      <RoleSelector role={role} setRole={setRole} />

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Đăng nhập</button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;
