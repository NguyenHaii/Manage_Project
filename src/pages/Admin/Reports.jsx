import React, { useContext } from "react";
import "./Reports.css";
import { StudentContext } from "../../context/StudentContext";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

function Reports() {
  const { students } = useContext(StudentContext);

  // 🔹 Tổng số học sinh, lớp, ngành
  const totalStudents = students.length;
  const totalClasses = new Set(students.map((s) => s.class)).size;
  const totalMajors = new Set(students.map((s) => s.major || "Chưa rõ")).size;

  // 🔹 Gom dữ liệu theo chuyên ngành
  const majorStats = Object.entries(
    students.reduce((acc, s) => {
      const m = s.major || "Chưa rõ";
      acc[m] = (acc[m] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // 🔹 Gom dữ liệu theo lớp
  const classStats = Object.entries(
    students.reduce((acc, s) => {
      acc[s.class] = (acc[s.class] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  // 🔹 Dữ liệu tăng trưởng giả lập
  const growthData = [
    { month: "Tháng 1", value: 40 },
    { month: "Tháng 2", value: 45 },
    { month: "Tháng 3", value: 50 },
    { month: "Tháng 4", value: 56 },
    { month: "Tháng 5", value: 60 },
    { month: "Tháng 6", value: 67 },
    { month: "Tháng 7", value: 70 },
    { month: "Tháng 8", value: 80 },
    { month: "Tháng 9", value: 85 },
  ];

  const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"];

  return (
    <div className="reports-container">
      {/* HEADER */}
      <header className="reports-header">
        <div>
          <h1>📘 Báo Cáo Tổng Hợp Học Sinh</h1>
          <p>Phân tích chi tiết và thống kê toàn diện</p>
        </div>
        <div className="header-actions">
          <button className="export">📄 Xuất PDF</button>
          <button className="print" onClick={() => window.print()}>
            🖨️ In Báo Cáo
          </button>
        </div>
      </header>

      {/* TÓM TẮT */}
      <section className="summary-section">
        <h2>Tóm Tắt Điều Hành</h2>
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Tổng Số Học Sinh</h3>
            <p>{totalStudents}</p>
            <span>+12% so với kỳ trước</span>
          </div>
          <div className="summary-card">
            <h3>Số Lớp Học</h3>
            <p>{totalClasses}</p>
            <span>+2 lớp mới</span>
          </div>
          <div className="summary-card">
            <h3>Chuyên Ngành</h3>
            <p>{totalMajors}</p>
            <span>+1 ngành mới</span>
          </div>
          <div className="summary-card">
            <h3>Tỷ Lệ Hoạt Động</h3>
            <p>
              {totalStudents > 0
                ? `${(95 + Math.random() * 5).toFixed(1)}%`
                : "0%"}
            </p>
            <span>Tăng 12%</span>
          </div>
        </div>
      </section>

      {/* BIỂU ĐỒ */}
      <section className="charts-section">
        <div className="chart-box">
          <h3>📊 Phân Bố Chuyên Ngành</h3>
          {majorStats.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={majorStats}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                  dataKey="value"
                >
                  {majorStats.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="chart-placeholder">[Biểu đồ chuyên ngành]</div>
          )}
        </div>

        <div className="chart-box">
          <h3>🏫 Phân Bố Theo Lớp</h3>
          {classStats.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={classStats}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="chart-placeholder">[Biểu đồ lớp học]</div>
          )}
        </div>
      </section>

      {/* TĂNG TRƯỞNG */}
      <section className="trend-section">
        <h3>📈 Xu Hướng Tăng Trưởng Học Sinh</h3>
        <div className="chart-wrapper large">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#10B981" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="note">
          Xu hướng tăng trưởng ổn định với mức tăng trung bình 12% so với kỳ trước.
        </p>
      </section>

      {/* HIỆU SUẤT */}
      <section className="performance-section">
        <h3>⚙️ Chỉ Số Hiệu Suất</h3>
        <div className="performance-cards">
          <div className="perf-item">
            <div className="circle blue">85%</div>
            <span>Tỷ lệ đăng ký</span>
          </div>
          <div className="perf-item">
            <div className="circle green">92%</div>
            <span>Hoàn thành hồ sơ</span>
          </div>
          <div className="perf-item">
            <div className="circle purple">96%</div>
            <span>Độ hài lòng</span>
          </div>
        </div>
      </section>

      {/* KHUYẾN NGHỊ */}
      <section className="recommend-section">
        <div className="recommend">
          <h3>💡 Khuyến Nghị & Kế Hoạch</h3>
          <div className="recommend-lists">
            <div className="strengths">
              <h4>Điểm Mạnh</h4>
              <ul>
                <li>✅ Tỷ lệ tăng trưởng học sinh ổn định và tích cực</li>
                <li>✅ Đa dạng hóa chuyên ngành đào tạo hiệu quả</li>
                <li>✅ Hệ thống quản lý học sinh vận hành ổn định</li>
              </ul>
            </div>
            <div className="plans">
              <h4>Kế Hoạch Phát Triển</h4>
              <ul>
                <li>➡️ Mở rộng thêm 3–5 chuyên ngành mới</li>
                <li>➡️ Nâng cao chất lượng dịch vụ hỗ trợ học sinh</li>
                <li>➡️ Đầu tư cơ sở vật chất và hạ tầng</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="report-footer">
        <p>
          © 2024 - Hệ Thống Quản Lý Học Sinh | Trường Đại Học ABC <br />
          Kỳ báo cáo: Học kỳ I - Năm học 2024-2025
        </p>
      </footer>
    </div>
  );
}

export default Reports;
