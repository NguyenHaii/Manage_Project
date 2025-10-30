import React from "react";

function RoleSelector({ role, setRole }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label>
        <input
          type="radio"
          value="student"
          checked={role === "student"}
          onChange={() => setRole("student")}
        />
        Học sinh
      </label>
      <label style={{ marginLeft: "15px" }}>
        <input
          type="radio"
          value="admin"
          checked={role === "admin"}
          onChange={() => setRole("admin")}
        />
        Admin
      </label>
    </div>
  );
}

export default RoleSelector;
