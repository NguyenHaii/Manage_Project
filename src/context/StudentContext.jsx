import React, { createContext, useState } from "react";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  // Thêm học sinh
  const addStudent = (student) => {
    setStudents((prev) => [...prev, student]);
  };

  // Cập nhật học sinh
  const updateStudent = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
  };

  // Xóa học sinh
  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <StudentContext.Provider
      value={{ students, addStudent, updateStudent, deleteStudent }}
    >
      {children}
    </StudentContext.Provider>
  );
};
