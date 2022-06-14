import React, { useEffect, useRef, useState } from "react";
import "../styles/VideoPlayer.scss";
import Logo from "../media/netflix-logo.png";
import { useNavigate } from "react-router-dom";
import { ReactComponent as VideoBackIcon } from "../media/back-arrow.svg";
import { ReactComponent as FlagIcon } from "../media/report-flag.svg";
import { ReactComponent as PlayButton } from "../media/play-icon.svg";
import { ReactComponent as PauseButton } from "../media/pause-icon.svg";
import { ReactComponent as BackwardButton } from "../media/backward-ten.svg";
import { ReactComponent as ForwardButton } from "../media/forward-ten.svg";
import { ReactComponent as VolumeIcon } from "../media/video-volume-icon.svg";
import { ReactComponent as VolumeLevel2 } from "../media/volume-level2.svg";
import { ReactComponent as VolumeLevel1 } from "../media/volume-level1.svg";
import { ReactComponent as VolumeLevel0 } from "../media/volume-level0.svg";
import { ReactComponent as NextIcon } from "../media/next-icon.svg";
import { ReactComponent as SubtitleIcon } from "../media/subtitle-icon.svg";
import { ReactComponent as SpeedIcon } from "../media/speed-icon.svg";
import { ReactComponent as SeriesIcon } from "../media/series-icon.svg";
import { ReactComponent as FullscreenIcon } from "../media/fullscreen-icon.svg";

const VideoPlayer = ({ contentName, videoURL }) => {
  const navigate = useNavigate();
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volumeHover, isVolumeHover] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState("1.0");
  document.title = `${contentName} - Netflix Clone`;

  useEffect(() => {
    window.setInterval(function () {
      setCurrentTime(videoRef.current?.currentTime);
      setProgress((videoRef.current?.currentTime / videoTime) * 100);
    }, 20);
  }, [videoTime]);

  const fullscreenHandler = () => {
    const vid = document.getElementById("video");
    if (vid.requestFullscreen) {
      vid.requestFullscreen();
    } else if (vid.webkitRequestFullscreen) {
      /* Safari */
      vid.webkitRequestFullscreen();
    } else if (vid.msRequestFullscreen) {
      vid.msRequestFullscreen();
    }
  };

  const volChangeHandler = (e) => {
    const vid = document.getElementById("video");
    const val = e.target.value;

    vid.volume = val;
    setVolumeLevel(val);
  };

  const videoHandler = () => {
    if (!isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
      const vid = document.getElementById("video");
      setVideoTime(vid.duration);
    } else if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const fastForward = () => {
    videoRef.current.currentTime += 10;
  };

  const revert = () => {
    videoRef.current.currentTime -= 10;
  };

  const volumeLevelHandler = () => {
    if (volumeLevel >= 0.8) {
      return <VolumeIcon className="video-volume-icon" />;
    } else if (volumeLevel <= 0.7 && volumeLevel >= 0.5) {
      return <VolumeLevel2 className="video-volume-icon" />;
    } else if (volumeLevel <= 0.4 && volumeLevel >= 0.1) {
      return <VolumeLevel1 className="video-volume-icon" />;
    } else {
      return <VolumeLevel0 className="video-volume-icon" />;
    }
  };

  if (videoURL === "" || videoURL === "empty") {
    setTimeout(() => {
      navigate("/browse");
    }, 5000);
    return (
      <>
        <nav className="browse-navbar">
          <div className="browser-nav-left-side">
            <img
              src={Logo}
              onClick={() => navigate("/browse")}
              style={{ transform: "scale(0.6)", cursor: "pointer" }}
              className="browser-nav-logo"
              alt="Netflix Logo"
            />
          </div>
        </nav>

        <div className="error-page">
          <div className="error-modal">
            <div className="error-header-wrapper">
              <h2>Oops. What is this?</h2>
            </div>
            <div className="error-subheader-wrapper">
              <h3>
                Due to some bandwitdh limitations, videos could not be uploaded
                to every movie.
              </h3>
            </div>
            <div className="error-redirecting-wrapper">
              <h3>Redirecting...</h3>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="video-page">
        <video
          id="video"
          ref={videoRef}
          className="videoInsert"
          onClick={videoHandler}
        >
          <source src={videoURL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="top-buttons-wrapper">
          <div className="back-button" onClick={() => navigate("/browse")}>
            <VideoBackIcon className="video-back-icon" />
          </div>
          <div className="flag-button">
            <FlagIcon className="video-flag-icon" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="video-time-controls">
          <div className="video-time-progressbar-container">
            <div
              className="progressbar-thumb"
              style={{ left: `${progress}%` }}
            />
            <div
              style={{
                width: `${progress}%`,
              }}
              className="time-progressbar"
            ></div>
          </div>
          <p className="remaining-time">
            {Math.floor(currentTime / 60) +
              ":" +
              ("0" + Math.floor(currentTime % 60)).slice(-2)}
          </p>
        </div>
        {/* Progress Bar */}
        <div
          className="bottom-buttons-wrapper"
          onMouseEnter={() => isVolumeHover(false)}
        >
          <div className="left-buttons-wrapper">
            <div className="video-play-button" onClick={videoHandler}>
              {!isPlaying ? (
                <PlayButton className="video-play-icon" />
              ) : (
                <PauseButton className="video-play-icon" />
              )}
            </div>
            <div className="video-backward-button" onClick={revert}>
              <BackwardButton className="video-backward-icon" />
            </div>
            <div className="video-forward-button" onClick={fastForward}>
              <ForwardButton className="video-forward-icon" />
            </div>
            {volumeHover ? (
              <div
                className="volume-input-wrapper"
                onChange={(e) => volChangeHandler(e)}
                onMouseLeave={() => isVolumeHover(false)}
              >
                <input
                  id="volume-input"
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.1"
                  defaultValue={1.0}
                />
              </div>
            ) : null}
            <div
              className="video-volume-button"
              onMouseEnter={() => isVolumeHover(true)}
            >
              {volumeLevelHandler()}
            </div>
          </div>
          <div className="video-movie-name">
            <h2>{contentName}</h2>
          </div>
          <div className="right-buttons-wrapper">
            <div className="video-next-button">
              <NextIcon />
            </div>
            <div className="video-series-button">
              <SeriesIcon className="video-series-icon" />
            </div>
            <div className="video-subtitle-button">
              <SubtitleIcon className="video-subtitle-icon" />
            </div>
            <div className="video-speed-button">
              <SpeedIcon className="video-speed-icon" />
            </div>
            <div
              className="video-fullscreen-button"
              onClick={fullscreenHandler}
            >
              <FullscreenIcon className="video-fullscreen-icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
