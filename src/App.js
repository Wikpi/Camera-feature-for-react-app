import React, { useState, Fragment, useRef } from "react";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import FolderIcon from "@material-ui/icons/Folder";
import { Camera } from "react-cam";
import * as watermark from "watermarkjs";

// Styling
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  imgBox: {
    maxWidth: "80%",
    maxHeight: "80%",
    margin: "10px",
  },
  img: {
    height: "inherit",
    maxWidth: "inherit",
  },
  input: {
    display: "none",
  },
}));

// Main Function
function App() {
  const classes = useStyles();

  const [inputSource, setinputSource] = useState("");

  const handleInput = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setinputSource(newUrl);
      }
    }
  };

  var CompanyName = "CompanyName";

  var waterMarkedCamera = document.getElementById("waterMarkedCamera");
  var waterMarkedImage = document.getElementById("waterMarkedImage");

  const [capturedPhoto, setcapturedPhoto] = useState("");

  const [inputResults, setInputResults] = useState(false);
  const [cameraResults, setcameraResults] = useState(false);

  const [CameraON, setCameraON] = useState(false);
  const cam = useRef(null);

  // Makes watermarking buttons appear
  const AppearForINput = () => {
    return setInputResults(true);
  };

  // Makes watermarking buttons appear
  const AppearForCamera = () => {
    return setcameraResults(true);
  };

  // Capturing (setting captured pic to a variable)
  const capture = (imgSrc) => {
    console.log(imgSrc);
    setcapturedPhoto(imgSrc);
  };

  // Function for turning on the camera
  const CameraTurnOn = () => {
    setcameraResults(false);
    return setCameraON(true);
  };

  // Function for turning off the camera
  const CameraTurnOff = () => {
    AppearForCamera();
    return setCameraON(false);
  };

  // Get current date
  var myCurrentDate = new Date();
  var date =
    myCurrentDate.getFullYear() +
    "-" +
    (myCurrentDate.getMonth() + 1) +
    "-" +
    myCurrentDate.getDate() +
    " " +
    myCurrentDate.getHours() +
    ":" +
    myCurrentDate.getMinutes() +
    ":" +
    myCurrentDate.getSeconds() +
    " ";

  // Put watermark on camera picture top right
  const cameraWatermarkTopRight = (cp, d, cn, wmc) => {
    watermark([cp])
      .image(watermark.text.upperRight(d + cn, "10px Arial", "#fff", 0.5))
      .then(function (img) {
        wmc.replaceChild(wmc.appendChild(img), wmc.childNodes[0]);
      });
  };

  // Put watermark on camera picture top left
  const cameraWatermarkTopLeft = (cp, d, cn, wmc) => {
    watermark([cp])
      .image(watermark.text.upperLeft(d + cn, "10px Arial", "#fff", 0.5))
      .then(function (img) {
        wmc.replaceChild(wmc.appendChild(img), wmc.childNodes[0]);
      });
  };

  // Put watermark on camera picture bottom right
  const cameraWatermarkBottomRight = (cp, d, cn, wmc) => {
    watermark([cp])
      .image(watermark.text.lowerRight(d + cn, "10px Arial", "#fff", 0.5))
      .then(function (img) {
        wmc.replaceChild(wmc.appendChild(img), wmc.childNodes[0]);
      });
  };

  // Put watermark on camera picture bottom left
  const cameraWatermarkBottomLeft = (cp, d, cn, wmc) => {
    watermark([cp])
      .image(watermark.text.lowerLeft(d + cn, "10px Arial", "#fff", 0.5))
      .then(function (img) {
        wmc.replaceChild(wmc.appendChild(img), wmc.childNodes[0]);
      });
  };

  // Put watermark on input picture top right
  const imageWatermarkTopRight = (is, d, cn, wmi) => {
    watermark([is])
      .image(watermark.text.upperRight(d + cn, "10px Arial", "#fff", 0.5))
      .then(function (img) {
        wmi.replaceChild(wmi.appendChild(img), wmi.childNodes[0]);
      });
  };

  // Put watermark on input picture top left
  const imageWatermarkTopLeft = (is, d, cn, wmi) => {
    watermark([is])
      .image(watermark.text.upperLeft(d + cn, "10px Arial", "#fff", 0.5))
      .then(function (img) {
        wmi.replaceChild(wmi.appendChild(img), wmi.childNodes[0]);
      });
  };

  // Put watermark on input picture bottom right
  const imageWatermarkBottomRight = (is, d, cn, wmi) => {
    watermark([is])
      .image(watermark.text.lowerRight(d + cn, "10px Arial", "#fff", 0.5))
      .then(function (img) {
        wmi.replaceChild(wmi.appendChild(img), wmi.childNodes[0]);
      });
  };

  // Put watermark on input picture bottom left
  const imageWatermarkBottomLeft = (is, d, cn, wmi) => {
    watermark([is])
      .image(watermark.text.lowerLeft(d + cn, "10px Arial", "#fff", 0.5))
      .then(function (img) {
        wmi.replaceChild(wmi.appendChild(img), wmi.childNodes[0]);
      });
  };

  return (
    <div className={classes.root}>
      <div>
        <h5>Captured image</h5>
        <img src={capturedPhoto} alt={""} className={classes.img}></img>
        <br />
        <label htmlFor="camera">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={CameraTurnOn}
          >
            <PhotoCameraRoundedIcon fontSize="large" color="primary" />
          </IconButton>
          <div>
            {CameraON ? (
              <Fragment>
                <Camera
                  showFocus={true}
                  front={false}
                  capture={capture}
                  ref={cam}
                  width="auto"
                  height="auto"
                  focusWidth="auto"
                  focusHeight="auto"
                  btnColor="white"
                />
                <button onClick={(img) => cam.current.capture(img)}>
                  Take image
                </button>
                <button onClick={CameraTurnOff}>Turn off camera</button>
              </Fragment>
            ) : null}
          </div>
          {cameraResults ? (
            <div>
              <button
                onClick={() =>
                  cameraWatermarkTopRight(
                    capturedPhoto,
                    date,
                    CompanyName,
                    waterMarkedCamera
                  )
                }
              >
                Watermark top right
              </button>
              <button
                onClick={() =>
                  cameraWatermarkTopLeft(
                    capturedPhoto,
                    date,
                    CompanyName,
                    waterMarkedCamera
                  )
                }
              >
                Watermark top left
              </button>
              <br />
              <button
                onClick={() =>
                  cameraWatermarkBottomRight(
                    capturedPhoto,
                    date,
                    CompanyName,
                    waterMarkedCamera
                  )
                }
              >
                Watermark bottom right
              </button>
              <button
                onClick={() =>
                  cameraWatermarkBottomLeft(
                    capturedPhoto,
                    date,
                    CompanyName,
                    waterMarkedCamera
                  )
                }
              >
                Watermark bottom left
              </button>
            </div>
          ) : null}
        </label>
        <div id="waterMarkedCamera" />
      </div>
      <div>
        <h5>Inputted image</h5>
        <img src={inputSource} alt={""} className={classes.img}></img>
        <br />
        <input
          accept="image/*"
          className={classes.input}
          id="pictureInput"
          type="file"
          onChange={(e) => handleInput(e.target)}
        />
        <label htmlFor="pictureInput">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={AppearForINput}
          >
            <FolderIcon fontSize="large" color="primary" />
          </IconButton>
          {inputResults ? (
            <div>
              <button
                onClick={() =>
                  imageWatermarkTopRight(
                    inputSource,
                    date,
                    CompanyName,
                    waterMarkedImage
                  )
                }
              >
                Watermark top right
              </button>
              <button
                onClick={() =>
                  imageWatermarkTopLeft(
                    inputSource,
                    date,
                    CompanyName,
                    waterMarkedImage
                  )
                }
              >
                Watermark top left
              </button>
              <br />
              <button
                onClick={() =>
                  imageWatermarkBottomRight(
                    inputSource,
                    date,
                    CompanyName,
                    waterMarkedImage
                  )
                }
              >
                Watermark bottom right
              </button>
              <button
                onClick={() =>
                  imageWatermarkBottomLeft(
                    inputSource,
                    date,
                    CompanyName,
                    waterMarkedImage
                  )
                }
              >
                Watermark bottom left
              </button>
            </div>
          ) : null}
        </label>
        <div id="waterMarkedImage" />
      </div>
    </div>
  );
}
export default App;
