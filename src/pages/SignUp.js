import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase-config";
import "../styles/SignUp.scss";
import Logo from "../media/netflix-logo.png";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import linkedInIcon from "../media/linkedin-icon.svg";
import { emailValidRegex } from "../utils";

const SignUp = () => {
  const navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isRegisterValid, setIsRegisterValid] = useState(false);
  document.title = "Sign up - Netflix";

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setIsRegisterValid(true);
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (e) {}
  };

  const isValidOnFocus = () => {
    const inputElement = document.getElementById("register-email");
    if (registerEmail.length === 0) {
      inputElement.style.border = "1px solid #B82E2C";
      setIsEmailValid(false);
      setRegisterErrorMessage("Email is required!");
    }
  };
  const isValid = (e) => {
    const inputElement = document.getElementById("register-email");

    if (registerEmail.length < 5) {
      inputElement.style.border = "1px solid #B82E2C";
      setRegisterErrorMessage("Email should be between 5 and 50 characters");
      setIsEmailValid(false);
    } else if (!registerEmail.match(emailValidRegex)) {
      inputElement.style.border = "1px solid #B82E2C";
      setRegisterErrorMessage("Please enter a valid email address");
      setIsEmailValid(false);
    } else {
      document.getElementById("register-email").style.border =
        "1px solid #5FA43F";
      setIsEmailValid(true);
    }
  };

  const isValidPasswordOnBlur = (e) => {
    const passInputElement = document.getElementById("register-password");
    if (registerPassword.length === 0) {
      passInputElement.style.border = "1px solid #B82E2C";
      setIsPasswordValid(false);
      setPasswordError("Password is required!");
    }
  };

  const isValidPassword = (e) => {
    const passInputElement = document.getElementById("register-password");
    if (registerPassword.length < 5) {
      passInputElement.style.border = "1px solid #B82E2C";
      setIsPasswordValid(false);
      setPasswordError("Password should be between 6 and 60 characters");
    } else {
      passInputElement.style.border = "1px solid #5FA43F";
      setIsPasswordValid(true);
    }
  };

  const onChangeHandler = (e) => {
    setRegisterEmail(e.target.value);
    isValid(e);
  };

  const passwordOnChangeHandler = (e) => {
    setRegisterPassword(e.target.value);
    isValidPassword(e);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      return;
    } else if (!isEmailValid) {
      return;
    } else {
      register();
    }
  };

  return (
    <>
      <nav className="signup-navigation">
        <img
          src={Logo}
          className="nav-logo"
          style={{ cursor: "pointer" }}
          alt="Netflix Logo"
          onClick={() => navigate("/")}
        />
        <div className="navbar-wrapper">
          <div className="button-wrapper">
            <div
              onClick={() => navigate("/signin")}
              className="register-section-signin-button"
            >
              Sign in
            </div>
          </div>
        </div>
      </nav>

      {/* Register Section */}

      <section className="register-page-section">
        <div className="register-wrapper">
          <div className="register-header">
            <p className="little-text">No steps in this clone</p>
            <h2 className="register-header-text">
              Create a password to start your membership
            </h2>
          </div>
          <div className="register-subheader">
            <h3 className="register-subheader-text">
              Just a step and you're done!
            </h3>
          </div>
          <div className="register-form-wrapper">
            <form onSubmit={submitHandler}>
              <div className="username-input-wrapper">
                <input
                  type="email"
                  id="register-email"
                  onChange={onChangeHandler}
                  onBlur={isValidOnFocus}
                  autoComplete="off"
                  className="register-username-input"
                  placeholder=" "
                />
                <label
                  htmlFor="register-register"
                  className="register-username-label"
                >
                  Email
                </label>
                {!isEmailValid ? (
                  <p className="email-required">{`${registerErrorMessage}`}</p>
                ) : null}
              </div>
              <div className="password-input-wrapper">
                <input
                  type="password"
                  id="register-password"
                  onChange={passwordOnChangeHandler}
                  onBlur={isValidPasswordOnBlur}
                  className="register-password-input"
                  placeholder=" "
                  autoComplete="true"
                />
                <label
                  htmlFor="register-password"
                  className="register-password-label"
                >
                  Add a password
                </label>
              </div>
              {!isPasswordValid ? (
                <p className="password-required">{`${passwordError}`}</p>
              ) : null}
              {!isRegisterValid ? (
                <button className="register-button" type="submit">
                  Sign up
                </button>
              ) : (
                <button className="register-button2" type="submit">
                  Success! Redirecting...
                </button>
              )}
            </form>
          </div>
          <div className="register-gotoback-wrapper">
            <h6 onClick={() => navigate("/")}>
              <ChevronLeftIcon /> Go to homepage
            </h6>
          </div>
        </div>
      </section>

      <footer className="footer-section" style={{ backgroundColor: "#dadada" }}>
        <div className="footer-section-wrapper">
          <div className="questions-header">
            <h2 style={{ color: "#3a3a3a" }}>
              Questions? Connect with me on
              <a
                target="_blank"
                href="https://www.linkedin.com/in/oguzhantufenk/"
                rel="noreferrer"
              >
                <img src={linkedInIcon} alt="LinkedIn Icon" />
              </a>
            </h2>
          </div>
        </div>
      </footer>
    </>
  );
};

export default SignUp;
