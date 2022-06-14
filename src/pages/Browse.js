import { auth } from "../firebase-config";
import { database } from "../firebase-config";
import { useScrollHandler } from "../useScroll";
import { useNavigate } from "react-router-dom";
import { ref, child, get } from "firebase/database";
import { useEffect, useState, useRef } from "react";
import { useContext, AuthContext } from "../context";
import SelectProfile from "../components/SelectProfile";
import TrendingNow from "../components/BrowsePage/TrendingNow";
import ProfileMenu from "../components/ProfileMenu";
import ActionMovies from "../components/BrowsePage/ActionMovies";
import SciFiMovies from "../components/BrowsePage/SciFiMovies";
import ComedyMovies from "../components/BrowsePage/ComedyMovies";
import AwardWinningMovies from "../components/BrowsePage/AwardWinningMovies";
import ClassicMovies from "../components/BrowsePage/ClassicMovies";
import MovieModal from "../components/BrowsePage/MovieModal";
import "../styles/Browse.scss";
import Logo from "../media/netflix-logo.png";
import ProfilePicture from "../media/profile-picture.jpeg";
import linkedInIcon from "../media/linkedin-icon.svg";

import { ReactComponent as SearchIcon } from "../media/search-icon.svg";
import { ReactComponent as BellIcon } from "../media/bell-icon.svg";
import { ReactComponent as DownArrow } from "../media/down-arrow.svg";
import { ReactComponent as RightArrow } from "../media/arrow-right.svg";
import { ReactComponent as PlayIcon } from "../media/play-icon.svg";
import { ReactComponent as InfoIcon } from "../media/info-icon.svg";
import { ReactComponent as MuteIcon } from "../media/volume-off.svg";
import { ReactComponent as VolumeIcon } from "../media/volume-on.svg";
import { ReactComponent as Cadet } from "../media/right-cadet.svg";
import { ReactComponent as TheGodfather } from "../media/the-godfather.svg";

const Browse = () => {
  const user = auth.currentUser;
  const [isSelected, setIsSelected] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isMute, setIsMute] = useState(true);
  const scroll = useScrollHandler();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { whichMovie, setWhichMovie } = useContext(AuthContext);
  const navigate = useNavigate();

  const trendingComponent = useRef();
  const actionComponent = useRef();
  const scifiComponent = useRef();
  const comedyComponent = useRef();
  const awardComponent = useRef();
  const classicComponent = useRef();
  const [hideCadet, setHideCadet] = useState(false);
  const [hideActionCadet, setHideActionCadet] = useState(false);
  const [hideScifiCadet, setHideScifiCadet] = useState(false);
  const [hideComedyCadet, setHideComedyCadet] = useState(false);
  const [hideAwardCadet, setHideAwardCadet] = useState(false);
  const [hideClassicCadet, setHideClassicCadet] = useState(false);
  document.title = "Home Page - Netflix";

  useEffect(() => {
    const dbRef = ref(database);

    setIsLoading(true);
    get(child(dbRef, "movies/")).then((snapshot) => {
      if (snapshot.exists()) {
        setMovies(Object.values(snapshot.val()));
      }
      setIsLoading(false);
    });
  }, []);

  const toggleMute = () => {
    const video = document.getElementById("landing-page-video");

    video.muted = !video.muted;
    setIsMute(!isMute);
  };

  const moreInfoClickHandler = () => {
    if (whichMovie) {
      setWhichMovie(movies[3]);
      setShowModal(true);
    }
  };

  const scrollHandler = (scrollOffset) => {
    trendingComponent.current.scrollLeft += scrollOffset;
  };

  const scrollHandlerAction = (scrollOffset) => {
    actionComponent.current.scrollLeft += scrollOffset;
  };

  const scrollHandlerScifi = (scrollOffset) => {
    scifiComponent.current.scrollLeft += scrollOffset;
  };

  const scrollHandlerComedy = (scrollOffset) => {
    comedyComponent.current.scrollLeft += scrollOffset;
  };

  const scrollHandlerAward = (scrollOffset) => {
    awardComponent.current.scrollLeft += scrollOffset;
  };

  const scrollHandlerClassic = (scrollOffset) => {
    classicComponent.current.scrollLeft += scrollOffset;
  };

  if (!isSelected || isLoading) {
    return (
      <SelectProfile
        displayName={user.displayName}
        email={user.email}
        setIsSelected={setIsSelected}
      />
    );
  }

  return (
    <>
      <nav className={`browse-navbar ${!scroll ? "scrolling-active" : null}`}>
        <div className="browser-nav-left-side">
          <img
            src={Logo}
            style={{ transform: "scale(0.6)" }}
            className="browser-nav-logo"
            alt="Netflix Logo"
          />
          <div className="browser-nav-buttons">
            <div className="nav-buttons-wrapper">
              <h4>Homepage</h4>
              <h4>Series</h4>
              <h4>Movies</h4>
              <h4>New and Popular</h4>
              <h4>My List</h4>
              <div className="browse-navbar-responsive-button">
                Browse
                <DownArrow className="browse-button" />
              </div>
            </div>
          </div>
        </div>
        <div className="browser-nav-right-side">
          <div className="browser-nav-icons-wrapper">
            <SearchIcon fill="white" className="search-icon" />
            <BellIcon fill="white" className="bell-icon" />
          </div>
          <div
            onMouseEnter={() => setShowMenu(true)}
            className="browser-nav-profile"
          >
            <img
              src={user.photoURL === null ? ProfilePicture : user.photoURL}
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

      {/* Browse SECTION ONE */}
      <div className="browse-section-one">
        <video autoPlay muted loop id="landing-page-video">
          <source src={movies[3].videoURL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-info">
          <div className="movie-name">
            <TheGodfather fill="white" className="thegodfather-logo" />
            <p className="movie-desc">{movies[3].description}</p>
          </div>
          <div className="landing-page-video-buttons">
            <div className="left-side-buttons">
              <div
                className="play-button"
                onClick={() => navigate(`${movies[3].contentName}`)}
              >
                <PlayIcon className="play-icon-svg" /> Play
              </div>
              <div className="info-button" onClick={moreInfoClickHandler}>
                <InfoIcon className="info-icon-svg" fill="white" /> More info
              </div>
            </div>
            <div className="right-side-buttons">
              <div className="volume-button" onClick={toggleMute}>
                {isMute ? (
                  <MuteIcon className="mute-icon-svg" fill="white" />
                ) : (
                  <VolumeIcon className="volume-icon-svg" fill="white" />
                )}
              </div>
              <div className="rating-block">{movies[3].rating}</div>
            </div>
          </div>
        </div>
        <div className="gradient" />
      </div>

      {/* MOVIE LISTS */}
      <div className="browse-section-two">
        <MovieModal
          {...whichMovie}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <div className="categories-wrapper">
          <div
            className="trending-category-wrapper"
            onMouseEnter={() => setHideCadet(false)}
            onMouseLeave={() => setHideCadet(true)}
          >
            <div
              className="scroll-left-button"
              onClick={() => scrollHandler(-500)}
              style={{ opacity: !hideCadet ? "1" : "0" }}
              onMouseEnter={() => setHideCadet(false)}
            >
              <Cadet className="left-cadet" />
            </div>
            <div
              className="scroll-right-button"
              onClick={() => scrollHandler(500)}
              style={{ opacity: !hideCadet ? "1" : "0" }}
              onMouseEnter={() => setHideCadet(false)}
            >
              <Cadet className="right-cadet" />
            </div>
            <div className="trending-title-wrapper">
              <h2 className="list-title-trendingnow">
                Trending Now
                <RightArrow className="right-arrow-svg" />
              </h2>
            </div>
            <div
              className="trending-movie-list-wrapper"
              ref={trendingComponent}
            >
              <TrendingNow
                movies={movies}
                setShowModal={setShowModal}
                showModal={showModal}
                {...whichMovie}
              />
            </div>
          </div>
          <div
            className="action-category-wrapper"
            onMouseEnter={() => setHideActionCadet(false)}
            onMouseLeave={() => setHideActionCadet(true)}
          >
            <div
              className="scroll-left-button"
              onClick={() => scrollHandlerAction(-500)}
              style={{ opacity: !hideActionCadet ? "1" : "0" }}
              onMouseEnter={() => setHideActionCadet(false)}
            >
              <Cadet
                className="left-cadet"
                onClick={() => scrollHandlerAction(-500)}
              />
            </div>
            <div
              className="scroll-right-button"
              onClick={() => scrollHandlerAction(500)}
              style={{ opacity: !hideActionCadet ? "1" : "0" }}
              onMouseEnter={() => setHideActionCadet(false)}
            >
              <Cadet className="right-cadet" />
            </div>
            <div className="action-title-wrapper">
              <h2 className="list-title-action">
                Action
                <RightArrow className="right-arrow-svg" />
              </h2>
            </div>
            <div className="action-movie-list-wrapper" ref={actionComponent}>
              <ActionMovies movies={movies} setShowModal={setShowModal} />
            </div>
          </div>
          <div
            className="scifi-category-wrapper"
            onMouseEnter={() => setHideScifiCadet(false)}
            onMouseLeave={() => setHideScifiCadet(true)}
          >
            <div
              className="scroll-left-button"
              onClick={() => scrollHandlerScifi(-500)}
              style={{ opacity: !hideScifiCadet ? "1" : "0" }}
              onMouseEnter={() => setHideScifiCadet(false)}
            >
              <Cadet className="left-cadet" />
            </div>
            <div
              className="scroll-right-button"
              onClick={() => scrollHandlerScifi(500)}
              style={{ opacity: !hideScifiCadet ? "1" : "0" }}
              onMouseEnter={() => setHideScifiCadet(false)}
            >
              <Cadet className="right-cadet" />
            </div>
            <div className="scifi-title-wrapper">
              <h2 className="list-title-scifi">
                Sci-Fi
                <RightArrow className="right-arrow-svg" />
              </h2>
            </div>
            <div className="scifi-movie-list-wrapper" ref={scifiComponent}>
              <SciFiMovies movies={movies} setShowModal={setShowModal} />
            </div>
          </div>
          <div
            className="comedy-category-wrapper"
            onMouseEnter={() => setHideComedyCadet(false)}
            onMouseLeave={() => setHideComedyCadet(true)}
          >
            <div className="comedy-title-wrapper">
              <div
                className="scroll-left-button"
                onClick={() => scrollHandlerComedy(-500)}
                style={{ opacity: !hideComedyCadet ? "1" : "0" }}
                onMouseEnter={() => setHideComedyCadet(false)}
              >
                <Cadet className="left-cadet" />
              </div>
              <div
                className="scroll-right-button"
                onClick={() => scrollHandlerComedy(500)}
                style={{ opacity: !hideComedyCadet ? "1" : "0" }}
                onMouseEnter={() => setHideComedyCadet(false)}
              >
                <Cadet className="right-cadet" />
              </div>
              <h2 className="list-title-comedy">
                Comedy
                <RightArrow className="right-arrow-svg" />
              </h2>
            </div>
            <div className="comedy-movie-list-wrapper" ref={comedyComponent}>
              <ComedyMovies movies={movies} setShowModal={setShowModal} />
            </div>
          </div>
          <div
            className="award-category-wrapper"
            onMouseEnter={() => setHideAwardCadet(false)}
            onMouseLeave={() => setHideAwardCadet(true)}
          >
            <div
              className="scroll-left-button"
              onClick={() => scrollHandlerAward(-500)}
              style={{ opacity: !hideAwardCadet ? "1" : "0" }}
              onMouseEnter={() => setHideAwardCadet(false)}
            >
              <Cadet className="left-cadet" />
            </div>
            <div
              className="scroll-right-button"
              onClick={() => scrollHandlerAward(500)}
              style={{ opacity: !hideAwardCadet ? "1" : "0" }}
              onMouseEnter={() => setHideAwardCadet(false)}
            >
              <Cadet className="right-cadet" />
            </div>
            <div className="award-title-wrapper">
              <h2 className="list-title-award">
                Award-Winning
                <RightArrow className="right-arrow-svg" />
              </h2>
            </div>
            <div className="award-movie-list-wrapper" ref={awardComponent}>
              <AwardWinningMovies movies={movies} setShowModal={setShowModal} />
            </div>
          </div>
          <div
            className="classic-category-wrapper"
            onMouseEnter={() => setHideClassicCadet(false)}
            onMouseLeave={() => setHideClassicCadet(true)}
          >
            <div
              className="scroll-left-button"
              onClick={() => scrollHandlerClassic(-500)}
              style={{ opacity: !hideClassicCadet ? "1" : "0" }}
              onMouseEnter={() => setHideClassicCadet(false)}
            >
              <Cadet className="left-cadet" />
            </div>
            <div
              className="scroll-right-button"
              onClick={() => scrollHandlerClassic(500)}
              style={{ opacity: !hideClassicCadet ? "1" : "0" }}
              onMouseEnter={() => setHideClassicCadet(false)}
            >
              <Cadet className="right-cadet" />
            </div>
            <div className="classic-title-wrapper">
              <h2 className="list-title-classic">
                Classic
                <RightArrow className="right-arrow-svg" />
              </h2>
            </div>
            <div className="classic-movie-list-wrapper" ref={classicComponent}>
              <ClassicMovies movies={movies} setShowModal={setShowModal} />
            </div>
          </div>
        </div>
      </div>

      <footer
        className="footer-section-browse"
        style={{ backgroundColor: "#121212" }}
      >
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

export default Browse;
