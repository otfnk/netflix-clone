import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.scss";
import Logo from "../media/netflix-logo.png";
import tvPNG from "../media/tv.png";
import mobileNetflix from "../media/section-three-pic1.jpg";
import strangerThingsLittle from "../media/section-three-pic2.png";
import landingPageVideo from "../media/landing-page-video1.m4v";
import downloadingGif from "../media/download-icon.gif";
import devicesImg from "../media/section-four-pic1.png";
import linkedInIcon from "../media/linkedin-icon.svg";
import sectionFourVideo from "../media/section-four-video1.m4v";
import sectionFiveImg from "../media/section-five-img1.jpg";
import { ChevronRightIcon, GlobeIcon } from "@radix-ui/react-icons";
import Questions from "../components/Questions";

const LandingPage = () => {
  const navigate = useNavigate();
  document.title = "Netflix Clone";

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <>
      <nav>
        <img src={Logo} className="nav-logo" alt="Netflix Logo" />
        <div className="navbar-wrapper">
          <div className="button-wrapper">
            <div className="select-language">
              <GlobeIcon /> <span className="lang-name">EN</span>
            </div>
            <div onClick={() => navigate("signin")} className="signin-button">
              Sign in
            </div>
          </div>
        </div>
      </nav>

      {/* Section One */}

      <section className="section-one">
        <div className="header">
          <h1 className="header-one">Unlimited movies, TV shows, and more.</h1>
          <h2 className="header-two">Watch anywhere. Cancel anytime.</h2>
          <h3 className="header-three">Ready to search and watch?</h3>
          <div className="input-wrapper">
            <form onSubmit={submitHandler} className="landing-page-form">
              <div className="email-adress-wrapper">
                <input
                  type="text"
                  className="landing-page-email-input"
                  id="landing-page-email"
                  placeholder=" "
                />
                <label
                  htmlFor="landing-page-email"
                  className="landing-page-email-label"
                >
                  Email adress
                </label>
                <button type="submit" className="get-started-btn">
                  Get Started <ChevronRightIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Section Two */}

      <section className="section-two">
        <div className="section-two-wrapper">
          <div className="headers-wrapper">
            <h1 className="section-two-header">Enjoy on your TV.</h1>
            <h2 className="section-two-subheader">
              Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </h2>
          </div>
          <div className="section-two-right">
            <img src={tvPNG} className="tv-png" alt="Netflix TV PNG" />
            <video className="landing-page-video" muted loop autoPlay>
              <source src={landingPageVideo} />
            </video>
          </div>
        </div>
      </section>

      {/* Section Three */}
      <section className="section-three">
        <div className="section-three-wrapper">
          <div className="section-three-left">
            <img src={mobileNetflix} className="mobile" alt="Netflix Mobile" />
            <div className="section-three-popup">
              <div className="pop-up-left">
                <img
                  src={strangerThingsLittle}
                  className="littleStrangerThings"
                  alt="Stranger Things"
                />
                <h3 className="downloading">Downloading...</h3>
              </div>
              <img
                src={downloadingGif}
                className="downloading-gif"
                alt="Download Icon"
              />
            </div>
          </div>
          <div className="section-three-headers">
            <h1 className="section-three-header">
              Download your shows to watch offline.
            </h1>
            <h2 className="section-three-subheader">
              Save your favorites easily and always have something to watch.
            </h2>
          </div>
        </div>
      </section>

      {/* Section Four */}
      <section className="section-four">
        <div className="section-four-wrapper">
          <div className="section-four-headers">
            <h1 className="section-four-header">Watch everywhere.</h1>
            <h2 className="section-four-subheader">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV without paying more.
            </h2>
          </div>
          <div className="section-four-right">
            <img
              src={devicesImg}
              alt="Multiple Devices"
              className="multiple-devices"
            />
            <video className="section-four-video" muted loop autoPlay>
              <source src={sectionFourVideo} />
            </video>
          </div>
        </div>
      </section>

      {/* Section Five */}
      <section className="section-five">
        <div className="section-five-wrapper">
          <div className="section-three-left">
            <img
              src={sectionFiveImg}
              alt="Netflix for Kids"
              className="netflix-kids-img"
            />
          </div>
          <section className="section-five-headers">
            <h1 className="section-five-header">Create profiles for kids.</h1>
            <h2 className="section-five-subheader">
              Send kids on adventures with their favorite characters in a space
              made just for them—free with your membership.
            </h2>
          </section>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="faq-section">
        <div className="faq-header-wrapper">
          <h1 className="faq-header">Frequently Asked Questions</h1>
        </div>
        <div className="faq-questions-answers-wrapper">
          <Questions />
        </div>
        <div className="landingpage-footer-wrapper">
          <h2 className="landingpage-footer-text">
            Ready to watch and search?
          </h2>
        </div>
        <div className="input-wrapper">
          <form onSubmit={submitHandler} className="landing-page-form">
            <div className="landing-page-faq-input-wrapper">
              <input
                type="text"
                className="landing-page-faq-input"
                id="landing-page-faq-input"
                placeholder=" "
              />
              <label
                htmlFor="landing-page-faq-input"
                className="landing-page-faq-label"
              >
                Email adress
              </label>
              <button type="submit" className="get-started-btn">
                Get Started <ChevronRightIcon />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
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

export default LandingPage;
