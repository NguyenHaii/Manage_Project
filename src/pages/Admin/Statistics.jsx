import React, { useContext } from "react";
import "./Statistics.css";
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
    ResponsiveContainer,
} from "recharts";

function Statistics() {
    const { students } = useContext(StudentContext);

    // 🔹 Tổng số học sinh
    const totalStudents = students.length;

    // 🔹 Lớp và chuyên ngành duy nhất
    const uniqueClasses = new Set(students.map((s) => s.class)).size;
    const uniqueMajors = new Set(students.map((s) => s.major || "Chưa rõ")).size;

    // 🔹 Gom dữ liệu theo lớp
    const classStats = Object.entries(
        students.reduce((acc, s) => {
            acc[s.class] = (acc[s.class] || 0) + 1;
            return acc;
        }, {})
    ).map(([name, value]) => ({ name, value }));

    // 🔹 Gom dữ liệu theo chuyên ngành
    const majorStats = Object.entries(
        students.reduce((acc, s) => {
            const m = s.major || "Chưa rõ";
            acc[m] = (acc[m] || 0) + 1;
            return acc;
        }, {})
    ).map(([name, value]) => ({ name, value }));

    // 🔹 Danh sách học sinh đăng ký gần đây
    const recentStudents = [...students].slice(-5).reverse();

    // 🔹 Màu sắc cho biểu đồ
    const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"];

    return (
        <div className="stats-container">
            <header className="stats-header">
                <div>
                    <h1>📊 Dashboard Thống Kê Học Sinh</h1>
                    <p>Tổng quan dữ liệu và phân tích chi tiết</p>
                </div>
                <div className="header-actions">
                    <button className="refresh">🔄 Làm mới</button>
                    <button className="analyze">📈 Thống kê</button>
                </div>
            </header>

            {/* ====== THẺ TỔNG QUAN ====== */}
            <section className="stats-cards">
                <div className="card total">
                    <h3>Tổng Học Sinh</h3>
                    <p>{totalStudents}</p>
                    <span>+5% so với tháng trước</span>
                </div>

                <div className="card major">
                    <h3>Chuyên Ngành</h3>
                    <p>{uniqueMajors}</p>
                    <span>+2 ngành mới</span>
                </div>

                <div className="card class">
                    <h3>Lớp Học</h3>
                    <p>{uniqueClasses}</p>
                    <span>+4 lớp mới</span>
                </div>

                <div className="card rate">
                    <h3>Tỷ Lệ Hoạt Động</h3>
                    <p>
                        {totalStudents > 0
                            ? `${(95 + Math.random() * 5).toFixed(1)}%`
                            : "0%"}
                    </p>
                    <span>+1.2% cải thiện</span>
                </div>
            </section>

            {/* ====== BIỂU ĐỒ ====== */}
            <section className="charts-section">
                <div className="chart-box">
                    <h3>📈 Phân Bố Theo Lớp</h3>
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
                        <div className="chart-placeholder">Chưa có dữ liệu lớp học</div>
                    )}
                </div>

                <div className="chart-box">
                    <h3>💡 Phân Bố Chuyên Ngành</h3>
                    {majorStats.length > 0 ? (
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={majorStats}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) =>
                                        `${name} ${(percent * 100).toFixed(0)}%`
                                    }
                                    outerRadius={100}
                                    dataKey="value"
                                >
                                    {majorStats.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="chart-placeholder">Chưa có dữ liệu chuyên ngành</div>
                    )}
                </div>
            </section>

            {/* ====== DƯỚI CÙNG ====== */}
            <section className="bottom-stats">
                <div className="chart-box small">
                    <h3>🏆 Top Chuyên Ngành</h3>
                    <div className="ranking-list">
                        {majorStats.length > 0 ? (
                            majorStats
                                .sort((a, b) => b.value - a.value)
                                .slice(0, 5)
                                .map((m, index) => (
                                    <div key={m.name} className="ranking-item">
                                        <div className="rank-badge">#{index + 1}</div>
                                        <div className="rank-info">
                                            <strong>{m.name}</strong>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress-fill"
                                                    style={{
                                                        width: `${(m.value / majorStats[0].value) * 100}%`,
                                                        backgroundColor:
                                                            ["#FFD700", "#C0C0C0", "#CD7F32", "#60A5FA", "#A78BFA"][index] ||
                                                            "#4F46E5",
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                        <div className="rank-count">{m.value} HS</div>
                                    </div>
                                ))
                        ) : (
                            <p className="no-data">[Chưa có dữ liệu]</p>
                        )}
                    </div>
                </div>


                <div className="chart-box small">
                    <h3>🕒 Đăng Ký Gần Đây</h3>
                    <div className="recent-list">
                        {recentStudents.length > 0 ? (
                            recentStudents.map((s, index) => (
                                <div key={s.id} className="recent-item">
                                    <div className="avatar">
                                        {s.name ? s.name.charAt(0).toUpperCase() : "?"}
                                    </div>
                                    <div className="info">
                                        <strong>{s.name}</strong>
                                        <p className="class">{s.class || "Chưa rõ lớp"}</p>
                                        <p className="time">🗓️ {new Date().toLocaleDateString("vi-VN")}</p>
                                    </div>
                                    <span className="badge">Mới</span>
                                </div>
                            ))
                        ) : (
                            <p className="no-data">[Chưa có học sinh đăng ký]</p>
                        )}
                    </div>
                </div>


                <div className="chart-box small">
                    <h3>📏 Chỉ Số Hiệu Suất</h3>
                    <div className="performance">
                        <div className="metric">
                            <span>Tỷ lệ đăng ký</span>
                            <div className="bar blue" style={{ width: "85%" }}></div>
                        </div>
                        <div className="metric">
                            <span>Hoàn thành hồ sơ</span>
                            <div className="bar green" style={{ width: "92%" }}></div>
                        </div>
                        <div className="metric">
                            <span>Độ hài lòng</span>
                            <div className="bar purple" style={{ width: "96%" }}></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Statistics;
