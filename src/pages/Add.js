import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage, database } from "../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { set, ref as databaseRef } from "firebase/database";
import { v4 } from "uuid";
import "../styles/Add.scss";
import { useContext, AuthContext } from "../context";
import ProfileMenu from "../components/ProfileMenu";
import Logo from "../media/netflix-logo.png";
import ProfilePicture from "../media/profile-picture.jpeg";
import { ReactComponent as DownArrow } from "../media/down-arrow.svg";
import { ReactComponent as UploadIcon } from "../media/upload-icon.svg";

const Add = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [files, setFiles] = useState([]);
  const [isFile, setIsFile] = useState(false);
  const [imageUpload, setImageUpload] = useState([]);
  const [thumbnailText, setThumbnailText] = useState(
    "Click here to select a thumbnail image"
  );
  const [videoURL, setVideoURL] = useState("");
  const [thumbnailURL, setThumbnailURL] = useState("");
  const [movieData, setMovieData] = useState({
    contentName: "",
    category: "",
    rating: "",
    description: "",
    introMinute: "",
    outroMinute: "",
    director: "",
    cast: "",
    videoURL: "",
    thumbnailURL: "",
  });
  const [isNameValid, setIsNameValid] = useState(false);
  const [isCategoryValid, setIsCategoryValid] = useState(false);
  const [isDescValid, setIsDescValid] = useState(false);
  const [isIntroValid, setIsIntroValid] = useState(false);
  const [isOutroValid, setIsOutroValid] = useState(false);
  const [isRatingValid, setIsRatingValid] = useState(false);
  const [isDirectorValid, setIsDirectorValid] = useState(false);
  const [isCastValid, setIsCastValid] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState("Submit");
  document.title = "Netflix Clone - Add Movie";

  const thumbnailChangeHandler = (e) => {
    setThumbnailText("Cool, you've selected an image!");
    const files = e.target.files[0];
    setImageUpload(files[0]);
    imageUploadHandler(files);
  };

  const imageUploadHandler = (files) => {
    if (imageUpload == null) return;
    document.querySelector(".thumbnail-upload").style.border =
      "2px solid #E07806";
    const imageRef = ref(storage, `images/${files.name + v4()}`);
    uploadBytes(imageRef, files).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setThumbnailURL(url);
      });
      document.querySelector(".thumbnail-upload").style.border =
        "2px solid #00c93c";
    });
  };

  const handleVideoChange = (e) => {
    const files = e.target.files[0];
    setFiles(files[0]);
    videoUploadHandler(files);
    setIsFile(true);
  };

  const videoUploadHandler = (files) => {
    if (!files) return;
    document.querySelector(".video-upload").style.border = "2px solid #E07806";
    const videoRef = ref(storage, `videos/${files.name + v4()}`);
    uploadBytes(videoRef, files).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setVideoURL(url);
      });
      document.querySelector(".video-upload").style.border =
        "2px solid #00c93c";
    });
  };

  const handleNameChange = (e) => {
    const { value } = e?.target;
    if (value.length > 1) {
      setMovieData({ ...movieData, contentName: value });
      setIsNameValid(true);
      document.querySelector(".content-name-input").style.border =
        "1px solid #00c93c";
    } else {
      setIsNameValid(false);
      document.querySelector(".content-name-input").style.border = "none";
    }
  };

  const handleDescriptionChange = (e) => {
    const { value } = e?.target;

    if (value.length > 20) {
      setMovieData({ ...movieData, description: value });
      document.querySelector(".content-textarea").style.border =
        "1px solid #00c93c";
      setIsDescValid(true);
    } else {
      document.querySelector(".content-textarea").style.border = "none";
      setIsDescValid(false);
    }
  };

  const handleIntroMinuteChange = (e) => {
    const { value } = e?.target;
    if (value.length > 0) {
      setMovieData({ ...movieData, introMinute: value });
      setIsIntroValid(true);
      document.querySelector(".minute-intro-label").style.color = "#00c93c";
    } else {
      setIsIntroValid(false);
    }
  };

  const handleOutroMinuteChange = (e) => {
    const { value } = e?.target;
    if (value.length > 0) {
      setMovieData({ ...movieData, outroMinute: value });
      setIsOutroValid(true);
      document.querySelector(".minute-outro-label").style.color = "#00c93c";
    } else {
      setIsOutroValid(false);
    }
  };

  const handleCategoryChange = (e) => {
    const { value } = e?.target;
    if (value.length > 3) {
      setMovieData({ ...movieData, category: value });
      setIsCategoryValid(true);
      document.querySelector(".category-label").style.color = "#00c93c";
    } else {
      setIsCategoryValid(false);
    }
  };

  const handleRatingChange = (e) => {
    const { value } = e?.target;
    if (value.length > 1) {
      setMovieData({ ...movieData, rating: value });
      setIsRatingValid(true);
      document.querySelector(".rating-label").style.color = "#00c93c";
    } else {
      setIsRatingValid(false);
    }
  };

  const handleDirectorChange = (e) => {
    const { value } = e?.target;
    if (value.length > 1) {
      setMovieData({ ...movieData, director: value });
      setIsDirectorValid(true);
      document.querySelector(".director-input").style.border =
        "1px solid #00c93c";
    } else {
      setIsDirectorValid(false);
      document.querySelector(".director-input").style.border = "none";
    }
  };

  const handleCastChange = (e) => {
    const { value } = e?.target;
    if (value.length > 1) {
      setMovieData({ ...movieData, cast: value });
      setIsCastValid(true);
      document.querySelector(".cast-input").style.border = "1px solid #00c93c";
    } else {
      setIsCastValid(false);
      document.querySelector(".cast-input").style.border = "none";
    }
  };

  function writeUserData() {
    set(databaseRef(database, `movies/${v4()}`), {
      contentName: movieData.contentName,
      category: movieData.category,
      rating: movieData.rating,
      description: movieData.description,
      cast: movieData.cast,
      director: movieData.director,
      introMinute: movieData.introMinute,
      outroMinute: movieData.outroMinute,
      videoURL: videoURL,
      thumbnailURL: thumbnailURL,
    });
  }

  const contentSubmitHandler = (e) => {
    e.preventDefault();
    if (
      !isNameValid ||
      !isCategoryValid ||
      !isDescValid ||
      !isIntroValid ||
      !isOutroValid ||
      !isRatingValid ||
      !isDirectorValid ||
      !isCastValid
    ) {
      document.querySelector(".content-form-submit").style.backgroundColor =
        "#E07806";
      setSubmitButtonText("Complete the form");
      setTimeout(() => {
        document.querySelector(".content-form-submit").style.backgroundColor =
          "#e50815";
        setSubmitButtonText("Submit");
      }, 3500);
      return;
    } else {
      writeUserData();
      document.querySelector(".content-form-submit").style.backgroundColor =
        "#00c93c";
      setSubmitButtonText("Success!");
      setTimeout(() => {
        navigate("/browse");
      }, 3000);
    }
  };

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
              src={
                currentUser.photoURL === null
                  ? { ProfilePicture }
                  : currentUser.photoURL
              }
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

      <section className="add-section">
        <form className="add-form" onSubmit={contentSubmitHandler}>
          <div className="form-left-side">
            <label className="video-upload" htmlFor="input-video">
              <div className="upload-icon-wrapper">
                <UploadIcon fill="#E50815" className="upload-icon" />
                <input
                  type="file"
                  accept="video/mp4,video/x-m4v,video/*"
                  id="input-video"
                  onChange={handleVideoChange}
                />
              </div>
              <div className="upload-text-wrapper">
                <div className="upload-text">
                  {isFile ? "Nice choice!" : "Select a video"}
                </div>
              </div>
            </label>
            {/* ///// */}
            <label
              className="thumbnail-upload-label"
              htmlFor="thumbnail-upload-input"
            >
              <div className="thumbnail-upload">
                <div className="thumbnail-icon-wrapper">
                  <UploadIcon
                    fill="#E50815"
                    className="thumbnail-upload-icon"
                  />
                </div>
                <div className="thumbnail-text-wrapper">
                  <div className="thumbnail-upload-text">{thumbnailText}</div>
                </div>
                <input
                  type="file"
                  id="thumbnail-upload-input"
                  className="thumbnail-input-button"
                  accept="image/*"
                  onChange={thumbnailChangeHandler}
                />
              </div>
            </label>
          </div>
          <div className="form-right-side">
            <div className="right-form-header">
              <h2 className="right-form-header-text">Content</h2>
            </div>
            <div className="content-form-wrapper">
              <div className="movie-name-category">
                <input
                  type="text"
                  onChange={handleNameChange}
                  value={movieData.name}
                  className="content-name-input"
                  placeholder="Movie/Episode name"
                />
                <div className="category-select-wrapper">
                  <label htmlFor="category-select" className="category-label">
                    Category
                  </label>
                  <select onChange={handleCategoryChange} id="category-select">
                    <option disabled selected value="">
                      Select
                    </option>
                    <option value="Action">Action</option>
                    <option value="Sci-fi">Sci-fi</option>
                    <option value="Award-Winning">Award-Winning</option>
                    <option value="Classics">Classics</option>
                    <option value="Comedies">Comedies</option>
                  </select>
                </div>
                <div className="rating-select-wrapper">
                  <label htmlFor="rating-select" className="rating-label">
                    Rating
                  </label>
                  <select
                    onChange={handleRatingChange}
                    placeholder="Select"
                    id="rating-select"
                  >
                    <option disabled selected value="">
                      Select
                    </option>
                    <option value="General Audience">General Audience</option>
                    <option value="7+">7+</option>
                    <option value="13+">13+</option>
                    <option value="16+">16+</option>
                    <option value="18+">18+</option>
                  </select>
                </div>
              </div>
              <div className="text-area-wrapper">
                <textarea
                  placeholder="Description"
                  rows="5"
                  cols="60"
                  className="content-textarea"
                  onChange={handleDescriptionChange}
                ></textarea>
              </div>
              <div className="creator-wrapper">
                <div className="creator-form-header">
                  <div className="creator-form-header-text">
                    Director and cast
                  </div>
                </div>
                <input
                  onChange={handleDirectorChange}
                  type="text"
                  className="director-input"
                  name="directorName"
                  autoComplete="off"
                  placeholder="Director"
                />
                <input
                  type="text"
                  onChange={handleCastChange}
                  className="cast-input"
                  name="castName"
                  autoComplete="off"
                  placeholder="Cast"
                />
              </div>
              <div className="intro-and-outro-wrapper">
                <div className="intro-and-outro-header">Intro and Outro</div>
                <div className="intro-and-outro-inputs">
                  <div className="intro-minute-wrapper">
                    <label
                      htmlFor="minute-intro"
                      className="minute-intro-label"
                    >
                      Intro
                    </label>
                    <input
                      onChange={handleIntroMinuteChange}
                      type="time"
                      id="minute-intro"
                      className="intro-minute-input"
                      placeholder="Intro"
                    />
                  </div>
                  <div className="outro-minute-wrapper">
                    <label htmlFor="outro-intro" className="minute-outro-label">
                      Outro
                    </label>
                    <input
                      onChange={handleOutroMinuteChange}
                      type="time"
                      id="outro-intro"
                      name="outroMinute"
                      className="outro-minute-input"
                      placeholder="Outro"
                    />
                  </div>
                </div>
              </div>
              <div className="submit-wrapper">
                <button type="submit" className="content-form-submit">
                  {`${submitButtonText}`}
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Add;
