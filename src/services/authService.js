export function login(username, password, role) {
  // Dữ liệu giả
  const accounts = {
    admin: { username: "admin", password: "123456" },
    student: { username: "student", password: "123456" },
  };

  const account = accounts[role];
  if (account.username === username && account.password === password) {
    return { success: true };
  }
  return { success: false, message: "Sai tên đăng nhập hoặc mật khẩu" };
}
