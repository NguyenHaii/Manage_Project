import React, { useState, useContext } from "react";
import "./ManageStudents.css";
import { StudentContext } from "../../context/StudentContext";

function ManageStudents() {
  const { students, addStudent, updateStudent, deleteStudent } =
    useContext(StudentContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    class: "",
    major: "",
    contact: "",
    email: "",
    dob: "",
    gender: "Nam",
  });

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setFormData({
      name: "",
      id: "",
      class: "",
      major: "",
      contact: "",
      email: "",
      dob: "",
      gender: "Nam",
    });
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setFormData(student);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.id || !formData.major) {
      alert("Vui lòng nhập đầy đủ thông tin học sinh!");
      return;
    }

    if (editingStudent) {
      updateStudent(formData);
    } else {
      addStudent(formData);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa học sinh này?")) {
      deleteStudent(id);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Hệ Thống Quản Lý Học Sinh</h1>
      </header>

      <section className="stats-section">
        <div className="stat-card">
          <h3>Tổng Học Sinh</h3>
          <p>{students.length}</p>
        </div>
        <div className="stat-card">
          <h3>Hoạt Động</h3>
          <p>100%</p>
        </div>
        <div className="stat-card">
          <h3>Lớp Học</h3>
          <p>5</p>
        </div>
      </section>

      <section className="student-section">
        <div className="section-header">
          <h2>Danh Sách Học Sinh</h2>
          <div className="actions">
            <input
              type="text"
              placeholder="Tìm kiếm học sinh..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleAddStudent}>+ Thêm Học Sinh</button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Họ Tên</th>
              <th>Mã Số</th>
              <th>Lớp</th>
              <th>Chuyên Ngành</th>
              <th>Liên Hệ</th>
              <th>Email</th>
              <th>Ngày Sinh</th>
              <th>Giới Tính</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", color: "#999" }}>
                  Chưa có dữ liệu học sinh
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.id}</td>
                  <td>{student.class}</td>
                  <td>{student.major}</td>
                  <td>{student.contact}</td>
                  <td>{student.email}</td>
                  <td>{student.dob}</td>
                  <td>{student.gender}</td>
                  <td>
                    <button
                      className="edit"
                      onClick={() => handleEditStudent(student)}
                    >
                      Sửa
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(student.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingStudent ? "Sửa Học Sinh" : "Thêm Học Sinh"}</h2>
            <div className="modal-form">
              <label>Họ tên:</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <label>Mã số:</label>
              <input
                name="id"
                value={formData.id}
                onChange={handleChange}
              />

              <label>Lớp:</label>
              <input
                name="class"
                value={formData.class}
                onChange={handleChange}
              />

              <label>Chuyên ngành:</label>
              <select
                name="major"
                value={formData.major}
                onChange={handleChange}
              >
                <option value="">-- Chọn chuyên ngành --</option>
                <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                <option value="Quản trị kinh doanh">Quản trị kinh doanh</option>
                <option value="Thiết kế đồ họa">Thiết kế đồ họa</option>
                <option value="Kế toán">Kế toán</option>
                <option value="Ngôn ngữ Anh">Ngôn ngữ Anh</option>
              </select>

              <label>Liên hệ:</label>
              <input
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />

              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <label>Ngày sinh:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />

              <label>Giới tính:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="save" onClick={handleSave}>
                Lưu
              </button>
              <button className="cancel" onClick={() => setShowModal(false)}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageStudents;
