import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/ProfileMenu.scss";
import profilePic from "../media/profile-picture.jpeg";
import { AuthContext, useContext } from "../context";
import { ReactComponent as AccountIcon } from "../media/account-icon.svg";
import { ReactComponent as PlusIcon } from "../media/plus-icon.svg";
import { auth } from "../firebase-config";

const ProfileMenu = ({ setShowMenu }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const emailName = currentUser.email.split("@").shift();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (currentUser.email === "admin@netflixclone.com") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [currentUser]);

  const signOutHandler = () => {
    auth.signOut().then(() => {
      navigate("/");
    });
  };
  return (
    <div
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
      className="dropdown-menu-wrapper"
    >
      <div className="profile-list">
        <img
          src={
            currentUser.photoURL === null ? profilePic : currentUser.photoURL
          }
          className="menu-profile-img"
          alt="Netflix Profile Img"
        />
        <p className="profile-email">{emailName}</p>
      </div>
      <div className="button-list">
        {isAdmin ? (
          <div onClick={() => navigate("/add")} className="add-movie-wrapper">
            <PlusIcon className="add-movie-icon" fill="#b3b3b3" />
            <p className="add-movie-text">Add content</p>
          </div>
        ) : null}
        <div
          onClick={() => navigate("/youraccount")}
          className="account-wrapper"
        >
          <AccountIcon className="account-icon" fill="#b3b3b3" />
          <p className="account-button-text">Account</p>
        </div>
        <div onClick={signOutHandler} className="signout-wrapper">
          <p className="signout-button-text">Sign out</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
