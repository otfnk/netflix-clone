import "../styles/SignIn.scss";
import Logo from "../media/netflix-logo.png";
import linkedInIcon from "../media/linkedin-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import { emailValidRegex } from "../utils";
import { AuthContext, useContext } from "../context";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showInputButton, setShowInputButton] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [isSignEmailValid, setIsSignEmailValid] = useState(false);
  const [isSignPasswordValid, setIsSignPasswordValid] = useState(false);
  const [signInPasswordError, setSignInPasswordError] = useState("");
  const [signInEmailError, setSignInEmailError] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInError, setSignInError] = useState(false);
  const { currentUser } = useContext(AuthContext);
  document.title = "Sign in - Netflix";

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, signInEmail, signInPassword);
      navigate("/browse");
    } catch (error) {
      setSignInError(true);
    }
  };

  useEffect(() => {
    if (currentUser !== null) {
      navigate("/browse");
    }
  }, [currentUser, navigate]);

  // Email Validation
  const isValidEmailOnBlur = (e) => {
    const signInEmailElement = document.getElementById("signin-email");
    if (e.target.value.length === 0) {
      signInEmailElement.style.borderBottom = "3px solid #E87C03";
      setIsSignEmailValid(false);
      setSignInEmailError("Please enter a valid email.");
    }
  };

  const signInEmailValid = (e) => {
    const signInEmailElement = document.getElementById("signin-email");
    if (!e.target.value.match(emailValidRegex)) {
      signInEmailElement.style.borderBottom = "3px solid #E87C03";
      setIsSignEmailValid(false);
      setSignInEmailError("Please enter a valid email.");
    } else {
      signInEmailElement.style.borderBottom = "none";
      setIsSignEmailValid(true);
    }
  };

  // Password Validation

  const signInPasswordValidOnBlur = (e) => {
    const signInPasswordElement = document.getElementById(
      "signin-password-input"
    );
    if (e.target.value.length === 0) {
      signInPasswordElement.style.borderBottom = "3px solid #E87C03";
      setIsSignPasswordValid(false);
      setSignInPasswordError(
        "Your password must contain between 4 and 60 characters."
      );
    }
  };

  const signInPasswordValid = (e) => {
    const signInPasswordElement = document.getElementById(
      "signin-password-input"
    );
    if (e.target.value.length < 4) {
      signInPasswordElement.style.borderBottom = "3px solid #E87C03";
      setIsSignPasswordValid(false);
      setSignInPasswordError(
        "Your password must contain between 4 and 60 characters."
      );
    } else {
      signInPasswordElement.style.borderBottom = "none";
      setIsSignPasswordValid(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isSignEmailValid || !isSignPasswordValid) {
      const signInEmailElement = document.getElementById("signin-email");
      signInEmailElement.style.borderBottom = "2px solid #E87C03";
      const signInPasswordElement = document.getElementById(
        "signin-password-input"
      );
      signInPasswordElement.style.borderBottom = "2px solid #E87C03";

      return;
    } else {
      login();
    }
  };

  const emailOnChangeHandler = (e) => {
    setSignInEmail(e.target.value);
    signInEmailValid(e);
  };

  const passwordOnChangeHandler = (e) => {
    setSignInPassword(e.target.value);
    signInPasswordValid(e);
  };

  return (
    <>
      <nav>
        <img
          src={Logo}
          className="nav-logo"
          style={{ cursor: "pointer" }}
          alt="Netflix Logo"
          onClick={() => navigate("/")}
        />
      </nav>
      <section className="signin-section">
        <div className="signin-wrapper">
          <h1 className="signin-text">Sign In</h1>
          {signInError ? (
            <div className="error-modal">
              <p className="error-text">
                <b>Incorrect password.</b> Please try again or you can{" "}
                <u>create a new account.</u>
              </p>
            </div>
          ) : null}
          <div className="input-wrapper">
            <form className="signin-form" onSubmit={submitHandler}>
              <div className="form-input-wrapper">
                <div className="email-login-input-wrapper">
                  <input
                    type="email"
                    id="signin-email"
                    onBlur={isValidEmailOnBlur}
                    className="signin-email-input"
                    onChange={emailOnChangeHandler}
                    autoComplete="off"
                    placeholder=" "
                  />
                  <label htmlFor="signin-email" className="email-input-label">
                    Email
                  </label>
                  {!isSignEmailValid ? (
                    <p className="signin-email-error">{`${signInEmailError}`}</p>
                  ) : null}
                </div>
                <div className="signin-password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="on"
                    className="signin-password-input"
                    onChange={passwordOnChangeHandler}
                    onBlur={signInPasswordValidOnBlur}
                    placeholder=" "
                    id="signin-password-input"
                    onFocus={() => setShowInputButton(true)}
                  />
                  <label
                    htmlFor="signin-password-input"
                    className="password-input-label"
                  >
                    Password
                  </label>
                  {showInputButton && (
                    <div
                      className="show-hide-password"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      {showPassword ? "HIDE" : "SHOW"}
                    </div>
                  )}
                  {!isSignPasswordValid ? (
                    <p className="signin-password-error">{`${signInPasswordError}`}</p>
                  ) : null}
                </div>
              </div>
              <div className="button-wrapper">
                <button className="signin-button" type="submit">
                  Sign In
                </button>
              </div>
            </form>
            <div className="signin-footer-wrapper">
              <div className="remember-me">
                <input
                  id="remembermecheck"
                  type="checkbox"
                  className="remember-me-checkbox"
                />
                <label htmlFor="remembermecheck" className="remember-me-text">
                  Remember Me
                </label>
              </div>
              <div className="need-help">
                <button className="need-help-button">Need help?</button>
              </div>
            </div>
          </div>
          <div className="register-section">
            <span className="new-to-here">New to Netflix?</span>
            <span
              className="signup-now-button"
              onClick={() => navigate("/signup")}
            >
              Sign up now.
            </span>
          </div>
          <div className="go-to-homepage">
            <Link className="go-back" to="/">
              Go to homepage
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <div className="footer-section-wrapper">
          <div className="questions-header">
            <h2>
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

export default SignIn;
