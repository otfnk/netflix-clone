import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { v4 } from "uuid";
import { useContext, AuthContext } from "../../context";
import { ReactComponent as PlayIcon } from "../../media/play-icon.svg";
import { ReactComponent as LikeIcon } from "../../media/like-icon.svg";
import { ReactComponent as PlusIcon } from "../../media/plus-icon.svg";
import { ReactComponent as MoreIcon } from "../../media/down-arrow2.svg";

const SciFiMovies = ({ movies, setShowModal }) => {
  const navigate = useNavigate();
  const { setWhichMovie } = useContext(AuthContext);
  const scifiMovies = movies.filter((movie) => movie.category === "Sci-fi");
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
      {scifiMovies.map((scifiMovie, index) => (
        <Fragment key={v4()}>
          <div className="trending-img-wrapper">
            <img
              onMouseEnter={() => setSelectedIndex(index)}
              src={scifiMovie.thumbnailURL}
              alt={scifiMovie.contentName}
              className="thumbnail-image"
            />
          </div>
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
                    src={scifiMovie.thumbnailURL}
                    alt={scifiMovie.contentName}
                    onClick={() => playClickHandler(scifiMovie)}
                  />
                </div>
                <div className="buttons-wrapper">
                  <div className="left-buttons-wrapper">
                    <button onClick={() => playClickHandler(scifiMovie)}>
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
                    <button onClick={() => clickHandler(scifiMovie)}>
                      <MoreIcon fill="white" className="more-icon" />
                    </button>
                  </div>
                </div>
                <div className="info-text-wrapper">
                  <h3>{scifiMovie.rating}</h3>
                </div>
                <div className="category-wrapper">
                  <h3 className="category-text">{scifiMovie.category}</h3>
                </div>
              </div>
            </div>
          ) : null}
        </Fragment>
      ))}
    </>
  );
};

export default SciFiMovies;
