import React from "react";
import { addUser } from "../../data/fakeUserDB";
import authService from "../../services/api/AuthService";

const Register = ({
  username,
  setUsername,
  password,
  setPassword,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  setShowRegister,
}) => {
  const validateEmail = (email) => {
    // Regex kiểm tra định dạng email: chữ@chữ.chữ
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Kiểm tra có đúng 10 chữ số
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert(
        "Email không hợp lệ. Vui lòng nhập đúng định dạng (ví dụ: a@gmail.com)."
      );
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      alert("Số điện thoại phải gồm đúng 10 chữ số.");
      return;
    }

    // Nếu hợp lệ thì tiếp tục đăng ký
    authService.signUp(username, password, email, phoneNumber);
    alert("Đăng ký thành công!");
    setShowRegister(false);
  };

  return (
    <div className="modal">
      <form onSubmit={handleRegister}>
        <h2>Đăng ký</h2>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Tên tài khoản"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          type="password"
          required
        />
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Số điện thoại"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">Đăng ký</button>
        <button type="button" onClick={() => setShowRegister(false)}>
          Đóng
        </button>
      </form>
    </div>
  );
};

export default Register;
