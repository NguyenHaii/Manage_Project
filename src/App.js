import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudentProvider } from "./context/StudentContext";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import RoleSelector from "./components/ui/RoleSelector";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelector />} />
        <Route
          path="/admin/*"
          element={
            <StudentProvider>
              <AdminDashboard />
            </StudentProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
