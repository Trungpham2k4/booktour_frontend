import http from "../http";
import Cookies from "universal-cookie";

const AuthService = {
  async signUp(username, password, email, phoneNumber) {
    try {
      const response = await http.post(
        "api/signup",
        {
          username,
          password,
          email,
          phoneNumber,
        }
      );
      console.log(response);
      return response;
    } catch (e) {
      console.log("Error fetching" + e);
      alert("Đăng ký fail");
    }
  },
  async signIn(username, password) {
    try {
      const response = await http.post("api/signin", {
        username,
        password,
      });

      localStorage.setItem("token", response.token);
      if (response && response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
        return response.user;
      } else {
        console.error("response.user không tồn tại");
        return null;
      }
    } catch (error) {
      console.error("Error in signIn:", error);
    }
  },
};

export default AuthService;
