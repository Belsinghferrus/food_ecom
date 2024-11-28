import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const Loginpopup = ({ setShowlogin }) => {
  const [currentState, setCurrentState] = useState("Signup");

  function closeLoginPop() {
    setShowlogin(false);
  }

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={closeLoginPop} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Your Name" required />
          )}

          <input type="email" placeholder="Your email" required />
          <input type="password" placeholder="Password" required />
        </div>
        <button>
          {currentState === "Signup" ? "Create account" : " Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms and condition</p>
        </div>
        {currentState === "Login"
        ? (<p>Create a new account? <span onClick={()=>setCurrentState("Signup")}>Click here</span> </p>) 
        : (<p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login</span> </p>
        )}
      </form>
    </div>
  );
};

export default Loginpopup;
