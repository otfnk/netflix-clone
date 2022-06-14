import gsap from "gsap";
import { v4 } from "uuid";
import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useContext, AuthContext } from "../../context";
import { ReactComponent as PlayIcon } from "../../media/play-icon.svg";
import { ReactComponent as LikeIcon } from "../../media/like-icon.svg";
import { ReactComponent as PlusIcon } from "../../media/plus-icon.svg";
import { ReactComponent as MoreIcon } from "../../media/down-arrow2.svg";

const ComedyMovies = ({ movies, setShowModal }) => {
  const navigate = useNavigate();
  const { setWhichMovie } = useContext(AuthContext);
  const comedyMovies = movies.filter((movie) => movie.category === "Comedies");
  const [selectedIndex, setSelectedIndex] = useState("");

  const expandMovie = () => {
    gsap.to(".movie", { scale: 1.1, y: 20, opacity: 1, ease: "back.out(2)" });
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
      {comedyMovies.map((comedyMovie, index) => (
        <Fragment key={v4()}>
          <img
            onMouseEnter={() => setSelectedIndex(index)}
            src={comedyMovie.thumbnailURL}
            alt={comedyMovie.contentName}
            className="thumbnail-image"
          />
          {index === selectedIndex ? (
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
                    src={comedyMovie.thumbnailURL}
                    alt={comedyMovie.contentName}
                    onClick={() => playClickHandler(comedyMovie)}
                  />
                </div>
                <div className="buttons-wrapper">
                  <div className="left-buttons-wrapper">
                    <button onClick={() => playClickHandler(comedyMovie)}>
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
                    <button onClick={() => clickHandler(comedyMovie)}>
                      <MoreIcon fill="white" className="more-icon" />
                    </button>
                  </div>
                </div>
                <div className="info-text-wrapper">
                  <h3>{comedyMovie.rating}</h3>
                </div>
                <div className="category-wrapper">
                  <h3 className="category-text">{comedyMovie.category}</h3>
                </div>
              </div>
            </div>
          ) : null}
        </Fragment>
      ))}
    </>
  );
};

export default ComedyMovies;
