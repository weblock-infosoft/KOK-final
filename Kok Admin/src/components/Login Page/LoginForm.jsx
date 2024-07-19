import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEyeSharp } from "react-icons/io5";
import { PiEyeSlashFill } from "react-icons/pi";
import axios from "axios";
import { message } from "antd";
import "./LoginForm.css";

const LoginForm = ({ setAuthToken }) => {
  const navigate = useNavigate();
  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [showUserPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/Admin/login`,
        {
          user_email,
          user_password,
        }
      );
      if (response.data.status === 1) {
        const authToken = response.data.data.auth_token;
        const userId = response.data.data.user_id;
        localStorage.setItem("auth_token", authToken);
        localStorage.setItem("user_id", userId);
        setAuthToken(authToken);
        message.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast.error(response.data.message || response.data.m);
      }
      setUserEmail("");
      setUserPassword("");
    } catch (error) {
      console.error("Login failed:", error.message);
      message.error("Login failed");
    }
  };

  return (
    <>
      <div className="background">
        <div className="Login_From">
          <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-header">Sign in</div>
              <div className="form-group">
                <p>Email </p>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Email or mobile phone number"
                  value={user_email}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <p>Password</p>
                <div className="pass-wrapper">
                  <input
                    type={showUserPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="Your password"
                    value={user_password}
                    onChange={(e) => setUserPassword(e.target.value)}
                    required
                  />
                  <span
                    className="show-password"
                    onClick={togglePasswordVisibility}
                  >
                    {showUserPassword ? (
                      <PiEyeSlashFill style={{ fontSize: "28px" }} />
                    ) : (
                      <IoEyeSharp style={{ fontSize: "28px" }} />
                    )}
                  </span>
                </div>
              </div>
              <button type="submit" className="login-button">
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
