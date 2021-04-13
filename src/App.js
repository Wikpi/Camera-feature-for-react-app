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

  const [inputSource, setInputSource] = useState("");

  const handleInput = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setInputSource(newUrl);
      }
    }
  };

  var companyName = "CompanyName";

  var waterMarkedCamera = document.getElementById("waterMarkedCamera");
  var waterMarkedImage = document.getElementById("waterMarkedImage");

  const [capturedPhoto, setCapturedPhoto] = useState("");

  const [inputResults, setInputResults] = useState(false);
  const [cameraResults, setCameraResults] = useState(false);

  const [cameraON, setCameraON] = useState(false);
  const cam = useRef(null);

  // Makes watermarking buttons appear
  const appearForInput = () => {
    return setInputResults(true);
  };

  // Makes watermarking buttons appear
  const appearForCamera = () => {
    return setCameraResults(true);
  };

  // Capturing (setting captured pic to a variable)
  const capture = (imgSrc) => {
    console.log(imgSrc);
    setCapturedPhoto(imgSrc);
  };

  // Function for turning on the camera
  const cameraTurnOn = () => {
    setCameraResults(false);
    return setCameraON(true);
  };

  // Function for turning off the camera
  const cameraTurnOff = () => {
    appearForCamera();
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

  const topLeft = 1;
  const topRight = 2;
  const bottomLeft = 3;
  const bottomRight = 4;

  // Function for adding watermarks to images
  const addWatermark = (image, pos, d, cn, callbackfn) => {
    var watermarkText;
    switch (pos) {
      default:
      case topLeft:
        watermarkText = watermark.text.upperLeft(
          d + cn,
          "10px Arial",
          "#fff",
          0.5
        );
        break;
      case topRight:
        watermarkText = watermark.text.upperRight(
          d + cn,
          "10px Arial",
          "#fff",
          0.5
        );
        break;
      case bottomLeft:
        watermarkText = watermark.text.lowerLeft(
          d + cn,
          "10px Arial",
          "#fff",
          0.5
        );
        break;
      case bottomRight:
        watermarkText = watermark.text.lowerRight(
          d + cn,
          "10px Arial",
          "#fff",
          0.5
        );
        break;
    }
    watermark([image]).image(watermarkText).then(callbackfn);
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
            onClick={cameraTurnOn}
          >
            <PhotoCameraRoundedIcon fontSize="large" color="primary" />
          </IconButton>
          <div>
            {cameraON ? (
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
                <button onClick={cameraTurnOff}>Turn off camera</button>
              </Fragment>
            ) : null}
          </div>
          {cameraResults ? (
            <div>
              <button
                onClick={() =>
                  addWatermark(
                    capturedPhoto,
                    topRight,
                    date,
                    companyName,
                    (img) => {
                      waterMarkedCamera.replaceChild(
                        waterMarkedCamera.appendChild(img),
                        waterMarkedCamera.childNodes[0]
                      );
                    }
                  )
                }
              >
                Watermark top right
              </button>
              <button
                onClick={() =>
                  addWatermark(
                    capturedPhoto,
                    topLeft,
                    date,
                    companyName,
                    (img) => {
                      waterMarkedCamera.replaceChild(
                        waterMarkedCamera.appendChild(img),
                        waterMarkedCamera.childNodes[0]
                      );
                    }
                  )
                }
              >
                Watermark top left
              </button>
              <br />
              <button
                onClick={() =>
                  addWatermark(
                    capturedPhoto,
                    bottomRight,
                    date,
                    companyName,
                    (img) => {
                      waterMarkedCamera.replaceChild(
                        waterMarkedCamera.appendChild(img),
                        waterMarkedCamera.childNodes[0]
                      );
                    }
                  )
                }
              >
                Watermark bottom right
              </button>
              <button
                onClick={() =>
                  addWatermark(
                    capturedPhoto,
                    bottomLeft,
                    date,
                    companyName,
                    (img) => {
                      waterMarkedCamera.replaceChild(
                        waterMarkedCamera.appendChild(img),
                        waterMarkedCamera.childNodes[0]
                      );
                    }
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
            onClick={appearForInput}
          >
            <FolderIcon fontSize="large" color="primary" />
          </IconButton>
          {inputResults ? (
            <div>
              <button
                onClick={() =>
                  addWatermark(
                    inputSource,
                    topRight,
                    date,
                    companyName,
                    (img) => {
                      waterMarkedImage.replaceChild(
                        waterMarkedImage.appendChild(img),
                        waterMarkedImage.childNodes[0]
                      );
                    }
                  )
                }
              >
                Watermark top right
              </button>
              <button
                onClick={() =>
                  addWatermark(
                    inputSource,
                    topLeft,
                    date,
                    companyName,
                    (img) => {
                      waterMarkedImage.replaceChild(
                        waterMarkedImage.appendChild(img),
                        waterMarkedImage.childNodes[0]
                      );
                    }
                  )
                }
              >
                Watermark top left
              </button>
              <br />
              <button
                onClick={() =>
                  addWatermark(
                    inputSource,
                    bottomRight,
                    date,
                    companyName,
                    (img) => {
                      waterMarkedImage.replaceChild(
                        waterMarkedImage.appendChild(img),
                        waterMarkedImage.childNodes[0]
                      );
                    }
                  )
                }
              >
                Watermark bottom right
              </button>
              <button
                onClick={() =>
                  addWatermark(
                    inputSource,
                    bottomLeft,
                    date,
                    companyName,
                    (img) => {
                      waterMarkedImage.replaceChild(
                        waterMarkedImage.appendChild(img),
                        waterMarkedImage.childNodes[0]
                      );
                    }
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
