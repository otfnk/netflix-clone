import React, { useState, useEffect } from "react";
import "../styles/YourAccount.scss";
import Logo from "../media/netflix-logo.png";
import { ReactComponent as DownArrow } from "../media/down-arrow.svg";
import ProfilePicture from "../media/profile-picture.jpeg";
import ProfileMenu from "../components/ProfileMenu";
import { useNavigate } from "react-router-dom";
import { useContext, AuthContext } from "../context";
import linkedInIcon from "../media/linkedin-icon.svg";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase-config";
import { v4 } from "uuid";
import { updateProfile } from "firebase/auth";

const YourAccount = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);
  const [selectLabelText, setSelectLabelText] = useState("Select photo");
  const [profilePicture, setProfilePicture] = useState([]);
  const [profileURL, setProfileURL] = useState(null);
  const [profilePic, setProfilePic] = useState(ProfilePicture);
  document.title = "Netflix - Account Settings";

  const inputChangeHandler = (e) => {
    setSelectLabelText("Uploading...");
    const files = e.target.files[0];
    setProfilePicture(files);
    profileImageUpload(files);
  };

  const profileImageUpload = (files) => {
    if (!profilePicture) return;
    const profilePictureRef = ref(
      storage,
      `profilepics/${v4() + "-" + currentUser.email}`
    );
    uploadBytes(profilePictureRef, files).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setProfileURL(url);
      });
      setSelectLabelText("Success!");
      setTimeout(() => {
        setSelectLabelText("Select photo");
      }, 2000);
    });
  };

  useEffect(() => {
    updateProfile(currentUser, { photoURL: profileURL });
    if (currentUser.photoURL !== null) {
      setProfilePic(currentUser.photoURL);
    }
  }, [currentUser, profileURL]);

  const uid = currentUser.uid.replace(/[A-Z]/g, "*");
  return (
    <>
      <nav className="youraccount-navbar">
        <div className="browser-nav-left-side">
          <img
            src={Logo}
            style={{ transform: "scale(0.8)", cursor: "pointer" }}
            className="browser-nav-logo"
            alt="Netflix Logo"
            onClick={() => navigate("/browse")}
          />
        </div>
        <div className="browser-nav-right-side">
          <div
            onMouseEnter={() => setShowMenu(true)}
            className="browser-nav-profile"
          >
            <img
              src={profilePic}
              alt="Profile Pic"
              className="browser-nav-profile-picture"
            />
            <DownArrow
              fill="white"
              style={{ transform: "scale(.2)" }}
              className="browser-arrow-icon"
            />
          </div>
          {showMenu ? <ProfileMenu setShowMenu={setShowMenu} /> : null}
        </div>
      </nav>

      <div className="youraccount-wrapper">
        <div className="account-details-wrapper">
          <div className="header-wrapper">
            <h1 className="title-text">Account</h1>
          </div>
          <div className="membership-wrapper">
            <div className="membership-text-wrapper">
              <h2 className="membership-text">MEMBERSHIP</h2>
              <button className="cancel-membership">Cancel Membership</button>
            </div>
            <div className="account-details-wrapper">
              <p className="user-email">{currentUser.email}</p>
              <p className="user-id">UID: {uid}</p>
              <p className="user-phone">
                Phone: No phone number is needed in this clone 🤙🏻
              </p>
            </div>
            <div className="membership-buttons-wrapper">
              <p className="change-account">Change account email</p>
              <p className="change-password">Change password</p>
              <p className="change-phone">Change phone number</p>
            </div>
          </div>
          <div className="plan-details-wrapper">
            <div className="plan-details">
              <p className="plan-details-text">PLAN DETAILS</p>
            </div>
            <div className="plan-info">
              <p className="plan-info-text">Premium</p>
              <svg viewBox="0 0 4770 960" className="account-plan-svg">
                <g
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                  style={{ transform: "scale(0.3)" }}
                >
                  <path
                    d="M724,595 C724,642 714,672 694,684 C673,696 622,702 538,702 C460,702 412,696 393,684 C373,672 363,642 363,595 L363,247 L291,247 L291,612 C291,665 309,701 344,721 C379,739 445,749 543,749 C647,749 715,739 748,720 C780,700 796,659 796,595 L796,247 L724,247 L724,595 Z M1013,691 L1013,247 L941,247 L941,744 L1341,744 L1341,691 L1013,691 Z M1858,299 L1858,247 L1372,247 L1372,299 L1580,299 L1580,744 L1652,744 L1652,299 L1858,299 Z M2428,617 C2428,556 2394,525 2327,520 L2327,519 C2369,515 2398,503 2414,484 C2429,467 2437,434 2437,388 C2437,336 2422,300 2394,278 C2366,257 2318,247 2249,247 L1946,247 L1946,744 L2018,744 L2018,542 L2259,542 C2323,542 2356,571 2356,629 L2356,744 L2428,744 L2428,617 Z M2337,475 C2318,489 2281,495 2225,495 L2018,495 L2018,295 L2250,295 C2299,295 2331,301 2345,314 C2360,328 2368,358 2368,402 C2368,438 2358,462 2337,475 Z M3008,744 L3083,744 L2844,247 L2743,247 L2510,744 L2586,744 L2635,639 L2958,639 L3008,744 Z M2937,596 L2656,596 L2795,292 L2937,596 Z M3730,549 L3428,549 L3428,746 L3330,746 L3330,247 L3428,247 L3428,443 L3730,443 L3730,247 L3829,247 L3829,746 L3730,746 L3730,549 Z M4226,247 C4301,247 4356,260 4389,286 C4417,306 4438,335 4454,372 C4470,408 4478,449 4478,493 C4478,591 4449,661 4389,706 C4356,732 4301,746 4226,746 L3980,746 L3980,247 L4226,247 Z M4216,639 C4346,639 4373,562 4373,493 C4373,427 4359,351 4216,351 L4078,351 L4078,639 L4216,639 Z"
                    fill="currentColor"
                    className=""
                  ></path>
                  <path
                    d="M4638.00019,0 C4711.00009,0 4770,59 4770,132 L4770,827 C4770,868.423884 4751.51202,905.147426 4722.42954,929.452533 C4699.55882,948.56629 4670.13605,960 4638.00019,960 L133.999803,960 C58.9999134,960 0,901 0,827 L0,132 C0,59 58.9999134,0 133.999803,0 L4638.00019,0 Z M133.999803,80 C103.999847,80 79.9998826,103 79.9998826,132 L79.9998826,827 C79.9998826,857 103.999847,880 133.999803,880 L4638.00019,880 C4667.00015,880 4690.00012,856 4690.00012,827 L4690.00012,132 C4690.00012,103 4667.00015,80 4638.00019,80 L133.999803,80 Z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="change-plan-wrapper">
              <p className="change-plan-button">Change plan</p>
            </div>
          </div>
          <div className="change-profile-picture-wrapper">
            <div className="change-profile-picture-header">
              <h2 className="profile-picture-text">CHANGE PROFILE PICTURE</h2>
            </div>
            <div className="image-wrapper">
              <img
                src={
                  currentUser.photoURL === null
                    ? ProfilePicture
                    : currentUser.photoURL
                }
                alt={`${currentUser.email} profile pic`}
                className="account-profile-pic"
              />
            </div>

            <div className="image-upload-wrapper">
              <label
                htmlFor="image-input-youraccount"
                className="upload-image-label"
              >
                {`${selectLabelText}`}
              </label>
              <input
                type="file"
                accept="image/*"
                id="image-input-youraccount"
                onChange={inputChangeHandler}
              />
            </div>
          </div>
        </div>
      </div>

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

export default YourAccount;
