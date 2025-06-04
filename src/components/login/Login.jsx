import React from "react";
import { motion } from "framer-motion";
import "./Login.css";

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  setShowLogin,
}) => {
  return (
    <motion.div
      className="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <form onSubmit={handleLogin}>
        <h2>Đăng nhập</h2>
        <input
          type="text"
          placeholder="Tài khoản"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Đăng nhập</button>
        <button type="button" onClick={() => setShowLogin(false)}>
          Đóng
        </button>
      </form>
    </motion.div>
  );
};

export default Login;
