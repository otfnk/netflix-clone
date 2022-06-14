import gsap from "gsap";
import { v4 } from "uuid";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext, AuthContext } from "../../context";
import { ReactComponent as PlayIcon } from "../../media/play-icon.svg";
import { ReactComponent as LikeIcon } from "../../media/like-icon.svg";
import { ReactComponent as PlusIcon } from "../../media/plus-icon.svg";
import { ReactComponent as MoreIcon } from "../../media/down-arrow2.svg";

const AwardWinningMovies = ({ movies, setShowModal }) => {
  const navigate = useNavigate();
  const { setWhichMovie } = useContext(AuthContext);
  const awardWinningMovies = movies.filter(
    (movie) => movie.category === "Award-Winning"
  );
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
      {awardWinningMovies.map((awardWinningMovie, index) => (
        <Fragment key={v4()}>
          <div className="trending-img-wrapper">
            <img
              onMouseEnter={() => setSelectedIndex(index)}
              src={awardWinningMovie.thumbnailURL}
              alt={awardWinningMovie.contentName}
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
                    src={awardWinningMovie.thumbnailURL}
                    alt={awardWinningMovie.contentName}
                    onClick={() => playClickHandler(awardWinningMovie)}
                  />
                </div>
                <div className="buttons-wrapper">
                  <div className="left-buttons-wrapper">
                    <button onClick={() => playClickHandler(awardWinningMovie)}>
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
                    <button onClick={() => clickHandler(awardWinningMovie)}>
                      <MoreIcon fill="white" className="more-icon" />
                    </button>
                  </div>
                </div>
                <div className="info-text-wrapper">
                  <h3>{awardWinningMovie.rating}</h3>
                </div>
                <div className="category-wrapper">
                  <h3 className="category-text">
                    {awardWinningMovie.category}
                  </h3>
                </div>
              </div>
            </div>
          ) : null}
        </Fragment>
      ))}
    </>
  );
};

export default AwardWinningMovies;
