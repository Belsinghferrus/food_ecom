import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Loginpopup = ({ setShowlogin }) => {
  const [currentState, setCurrentState] = useState("Signup");
  const { url, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function onChangeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  }

  // LOGIN LOGIC
  async function onLogin(event) {
    event.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "api/user/login";
    } else {
      newUrl += "api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowlogin(false);
    } else {
      alert(response.data.message);
    }
  }

  function closeLoginPop() {
    setShowlogin(false);
  }

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={closeLoginPop} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              placeholder="Your Name"
              required
            />
          )}

          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currentState === "Signup" ? "Create account" : " Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms and condition</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Signup")}>Click here</span>{" "}
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login</span>{" "}
          </p>
        )}
      </form>
    </div>
  );
};

export default Loginpopup;
