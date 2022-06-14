import React, { Fragment, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./TrendingNow.scss";
import { ReactComponent as PlayIcon } from "../../media/play-icon.svg";
import { ReactComponent as LikeIcon } from "../../media/like-icon.svg";
import { ReactComponent as PlusIcon } from "../../media/plus-icon.svg";
import { ReactComponent as MoreIcon } from "../../media/down-arrow2.svg";
import gsap from "gsap";
import { v4 } from "uuid";
import { useContext, AuthContext } from "../../context";

const TrendingNow = ({ movies, setShowModal }) => {
  const navigate = useNavigate();
  const { setWhichMovie } = useContext(AuthContext);
  const videoMovies = movies.filter((movie) => movie.videoURL.length > 2);
  const [selectedIndex, setSelectedIndex] = useState("");
  const trendingComponent = useRef();

  const expandMovie = () => {
    gsap.to(".movie", {
      scale: 1.1,
      y: 20,
      opacity: 1,
      ease: "back.out(2)",
    });
  };

  const clickHandler = (movie) => {
    setShowModal(true);
    setWhichMovie(movie);
  };

  const playClickHandler = (movie) => {
    setWhichMovie(movie);
    navigate(movie.contentName);
  };

  return (
    <>
      {videoMovies.map((movie, index) => (
        <Fragment key={v4()}>
          <div className="trending-img-wrapper" ref={trendingComponent}>
            <img
              onMouseEnter={() => setSelectedIndex(index)}
              className="thumbnail-image"
              src={movie.thumbnailURL}
              alt={movie.contentName}
            />
          </div>
          {index === selectedIndex ? (
            <>
              <div
                className="movie"
                onMouseEnter={expandMovie}
                onMouseLeave={() => {
                  setSelectedIndex(null);
                }}
              >
                <div className="movie-wrapper">
                  <div className="image-wrapper">
                    <img
                      className="expanded-image"
                      src={movie.thumbnailURL}
                      alt={movie.contentName}
                      onClick={() => playClickHandler(movie)}
                    />
                  </div>
                  <div className="buttons-wrapper">
                    <div className="left-buttons-wrapper">
                      <button onClick={() => playClickHandler(movie)}>
                        <PlayIcon fill="white" className="play-icon" />
                      </button>
                      <button>
                        <LikeIcon fill="white" className="like-icon" />
                      </button>
                      <button>
                        <PlusIcon fill="white" className="plus-icon" />
                      </button>
                    </div>
                    <div className="right-button-wrapper">
                      <button onClick={() => clickHandler(movie)}>
                        <MoreIcon fill="white" className="more-icon" />
                      </button>
                    </div>
                  </div>
                  <div className="info-text-wrapper">
                    <h3>{movie.rating}</h3>
                  </div>
                  <div className="category-wrapper">
                    <h3 className="category-text">{movie.category}</h3>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </Fragment>
      ))}
    </>
  );
};

export default TrendingNow;
