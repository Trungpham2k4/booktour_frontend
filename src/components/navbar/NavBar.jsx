import { Link } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css";
import Login from "../login/Login";
import Register from "../register/Register";
import Profile from "../profile/Profile";
import authService from "../../services/api/AuthService";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signIn(username, password);
      // console.log(user);
      if (user) {
        setIsLoggedIn(true);
        setShowLogin(false);
        setEmail(user.email);
        setPhoneNumber(user.phoneNumber);
        setUserInfo(user);
        alert("Đăng nhập thành công!");
      } else {
        alert("Sai tài khoản hoặc mật khẩu!");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập", error);
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setEmail("");
    setPhoneNumber("");
    setUserInfo(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header>
      <nav>
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/cute-clipart/50/airplane-mode-on.png"
          alt="airplane-mode-on"
          id="dog-image"
        />
        <div className="nav-element">
          <ul>
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/search">Tìm kiếm</Link>
            </li>
            {userInfo && (
              <li>
                <Link to="/comment">Bình luận</Link>
              </li>
            )}

            {/* <li>
              <Link to="/booking">Đặt tour</Link>
            </li> */}
            <li>
              <Link to="/about">Về chúng tôi</Link>
            </li>
          </ul>
        </div>

        <div className="Login-SignUp">
          {!isLoggedIn ? (
            <>
              <span
                className="LoginLink"
                onClick={() => {
                  setShowLogin(true);
                  setShowRegister(false);
                  setShowProfile(false);
                }}
              >
                Đăng nhập
              </span>
              <span
                className="LoginLink"
                onClick={() => {
                  setShowLogin(false);
                  setShowRegister(true);
                  setShowProfile(false);
                }}
              >
                /Đăng ký
              </span>
            </>
          ) : (
            <>
              <span className="LoginLink">Xin chào, {username}</span>
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png" // URL logo mẫu hình đầu người
                alt="Profile"
                className="profile-icon"
                onClick={() => {
                  setShowProfile(true);
                }}
                style={{
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              />
              <span
                className="LoginLink"
                onClick={handleLogout}
                style={{
                  marginLeft: "10px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Đăng xuất
              </span>
            </>
          )}
        </div>
      </nav>

      {showLogin && (
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          setShowLogin={setShowLogin}
        />
      )}

      {showRegister && (
        <Register
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          email={email}
          setEmail={setEmail}
          setShowRegister={setShowRegister}
        />
      )}

      {showProfile && (
        <Profile
          isLoggedIn={isLoggedIn}
          username={username}
          email={email}
          phoneNumber={phoneNumber}
          setShowProfile={setShowProfile}
        />
      )}
    </header>
  );
}

export default NavBar;
