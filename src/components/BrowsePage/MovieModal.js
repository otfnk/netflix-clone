import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MovieModal.scss";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as CloseIcon } from "../../media/close-icon.svg";
import { ReactComponent as LikeIcon } from "../../media/like-icon.svg";
import { ReactComponent as PlusIcon } from "../../media/plus-icon.svg";
import { ReactComponent as PlayIcon } from "../../media/play-icon.svg";
import { ReactComponent as XIcon } from "../../media/close-icon.svg";
import gsap from "gsap";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { delay: 0.5, type: "spring", duration: 0.5 },
  },
};

const MovieModal = ({
  showModal,
  setShowModal,
  contentName,
  cast,
  category,
  description,
  director,
  rating,
  thumbnailURL,
}) => {
  const navigate = useNavigate();
  const [isAdd, setIsAdd] = useState(false);
  const tl = gsap.timeline();
  const tl2 = gsap.timeline();
  const tl3 = gsap.timeline();

  const clickAnimation = () => {
    tl.to(".add-button", {
      scale: 1.1,
      duration: 0.4,
      ease: "power4.out",
      border: "2px solid white",
    });
    tl.to(".modal-add-button", { scale: 1.1 });
    tl.to(".modal-add-button", { scale: 1 });
    tl.to(".add-button", {
      scale: 1,
      ease: "power4.out",
      border: "2px solid #919191",
    });
  };

  const likeAnimation = () => {
    tl2.to(".like-button", {
      scale: 1.1,
      duration: 0.4,
      ease: "power4.out",
      border: "2px solid white",
    });
    tl2.to(".modal-like-icon", { scale: 1.1, transform: "rotate(35deg)" });
    tl2.to(".modal-like-icon", { scale: 1.3, transform: "rotate(-20deg)" });
    tl2.to(".modal-like-icon", { scale: 1.1, transform: "rotate(0deg)" });
    tl2.to(".modal-like-icon", { scale: 1, transform: "rotate(0deg)" }, "<");
    tl2.to(
      ".like-button",
      {
        scale: 1,
        ease: "power4.out",
        border: "2px solid #919191",
      },
      "<"
    );
  };

  const playHandler = () => {
    tl3.to(".play-button", { scale: 0.5, ease: "back.out(4)" });
    tl3.to(".play-button", { scale: 1 });
    setTimeout(() => {
      navigate(`${contentName}`);
    }, 1000);
  };

  const addClickHandler = () => {
    setIsAdd(!isAdd);
    clickAnimation();
  };

  return (
    <AnimatePresence exitBeforeEnter onExitComplete={() => setShowModal(false)}>
      {showModal && (
        <>
          <motion.div
            className="backdrop"
            onClick={() => setShowModal(false)}
          />
          <motion.div
            variants={backdrop}
            animate="visible"
            initial="hidden"
            exit="hidden"
            className="modal"
          >
            <motion.div className="modal-header">
              <motion.div className="modal-close-button-wrapper">
                <motion.div
                  className="modal-close-button"
                  onClick={() => setShowModal(false)}
                >
                  <CloseIcon fill="white" className="close-svg" />
                </motion.div>
              </motion.div>
              <motion.div className="modal-header-image">
                <motion.img
                  src={thumbnailURL}
                  alt={contentName}
                  className="modal-image"
                ></motion.img>
              </motion.div>
              <motion.div className="modal-header-text-wrapper">
                <motion.h2 className="modal-text">{contentName}</motion.h2>
              </motion.div>
              <motion.div className="modal-buttons-wrapper">
                <motion.button className="play-button" onClick={playHandler}>
                  <PlayIcon className="modal-play-icon" fill="black" /> Play
                </motion.button>
                <motion.button className="like-button" onClick={likeAnimation}>
                  <LikeIcon className="modal-like-icon" />
                </motion.button>
                <motion.button className="add-button" onClick={addClickHandler}>
                  {!isAdd ? (
                    <PlusIcon className="modal-add-button" />
                  ) : (
                    <XIcon className="modal-add-button" />
                  )}
                </motion.button>
              </motion.div>
              <motion.div className="modal-gradient" />
            </motion.div>

            <motion.div className="modal-footer">
              <motion.div className="modal-movie-desc-wrapper">
                <motion.p className="modal-movie-desc">{description}</motion.p>
              </motion.div>
              <motion.div className="modal-cast-wrapper">
                <motion.p className="modal-cast-text">
                  <motion.span className="span-cast">Cast:</motion.span>
                  {cast}
                </motion.p>
                <motion.div className="modal-category-text">
                  <motion.span className="span-category">Category:</motion.span>
                  {category}
                </motion.div>
                <motion.p className="modal-cast-text">
                  <motion.span className="span-cast">Director:</motion.span>
                  {director}
                </motion.p>
                <motion.div className="modal-rating-wrapper">
                  <motion.h4 className="rating-text">{rating}</motion.h4>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MovieModal;
