import React, { useState, Fragment, useRef } from "react";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import FolderIcon from "@material-ui/icons/Folder";
import { Camera } from "react-cam";
import * as watermark from "watermarkjs";
import { dimensions } from "./dimensions";

// Styling
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "table",
    justifyContent: "center",
    marginTop: "5%",
    marginRight: "auto",
    marginLeft: "10%",
  },
  cameraDiv: {
    width: "100%",
  },
  inputDiv: {
    width: "100%",
  },
  imgBox: {
    maxWidth: "80%",
    maxHeight: "80%",
    margin: "10px",
  },
  img: {
    width: "100%",
    height: "auto",
  },
  input: {
    display: "none",
  },
}));

// Main Function
function App() {
  const classes = useStyles();

  var companyName = "CompanyName";

  // var waterMarkedCamera = document.getElementById("waterMarkedCamera");
  // var waterMarkedImage = document.getElementById("waterMarkedImage");

  const emptyImg = "data:image/jpg;base64";

  const [inputDisabled, setInputDisabled] = useState(false);
  const [selectedImage, setSelectedImage] = useState(emptyImg);
  const [selectedWatermarkedImage, setSelectedWatermarkedImage] = useState(
    emptyImg
  );

  const handleInput = (target) => {
    console.log("~~~ handleInput");
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSelectedImage(newUrl);
        setInputResults(true);
      }
    }
  };

  const [capturedPhoto, setCapturedPhoto] = useState(emptyImg);
  const [capturedWatermarkedPhoto, setCapturedWatermarkedPhoto] = useState(
    emptyImg
  );

  const [inputResults, setInputResults] = useState(false);
  const [cameraResults, setCameraResults] = useState(false);

  const [cameraON, setCameraON] = useState(false);
  const cam = useRef(null);

  const [colour, setColour] = useState("#FFF");

  // Capturing (setting captured pic to a variable)
  const capture = (imgSrc) => {
    console.log(imgSrc);
    setCameraResults(true);
    setCapturedPhoto(imgSrc);
  };

  const clearCapturedImg = () => {
    console.log(emptyImg);
    setCapturedPhoto(emptyImg);
    setCapturedWatermarkedPhoto(emptyImg);
    setCameraResults(false);
  };

  const clearSelectedImg = () => {
    console.log(emptyImg);
    setInputDisabled(true);
    setSelectedImage(emptyImg);
    setSelectedWatermarkedImage(emptyImg);
    setInputResults(false);
    setTimeout(() => {
      setInputDisabled(false);
    }, 5);
  };

  // Function for turning on the camera
  const cameraTurnOn = () => {
    setCameraResults(false);
    return setCameraON(true);
  };

  // Function for turning off the camera
  const cameraTurnOff = () => {
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

  //Change colour
  const changeColour = (givenColour) => {
    setColour(givenColour);
  };

  // Function for adding watermarks to images
  const addWatermark = (image, pos, d, cn, callbackfn, textColour) => {
    var watermarkText;
    var imageWidth = dimensions(image).width;
    // console.log(imageWidth);
    var size = (3 / 100) * imageWidth;
    //console.log(size);
    var numb = size.toString() + "px";
    var textSize = numb + " Arial";
    // console.log(textSize);

    switch (pos) {
      default:
      case topLeft:
        watermarkText = watermark.text.upperLeft(
          d + cn,
          textSize,
          textColour,
          0.5
        );
        break;
      case topRight:
        watermarkText = watermark.text.upperRight(
          d + cn,
          textSize,
          textColour,
          0.5
        );
        break;
      case bottomLeft:
        watermarkText = watermark.text.lowerLeft(
          d + cn,
          textSize,
          textColour,
          0.5
        );
        break;
      case bottomRight:
        watermarkText = watermark.text.lowerRight(
          d + cn,
          textSize,
          textColour,
          0.5
        );
        break;
    }
    //console.log("~~~ addWatermark: "+watermarkText);
    watermark([image]).image(watermarkText).then(callbackfn);
  };

  const watermarkCallback = (img) => {
    console.log("~~~ watermarkCallback");
    setCapturedWatermarkedPhoto(img.src);
  };

  const watermarkCallback2 = (img) => {
    console.log("~~~ watermarkCallback2");
    setSelectedWatermarkedImage(img.src);
  };

  return (
    <div className={classes.root}>
      <div className={classes.cameraDiv}>
        <label htmlFor="camera">
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
                <button onClick={clearCapturedImg}>Clear</button>
              </Fragment>
            ) : (
              <>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  onClick={cameraTurnOn}
                >
                  <PhotoCameraRoundedIcon fontSize="large" color="primary" />
                </IconButton>
                click to turn camera on
              </>
            )}
          </div>
          <h5>Captured image</h5>
          <img src={capturedPhoto} alt={""} className={classes.img}></img>
          <br />
          {cameraResults ? (
            <div>
              <button
                onClick={() =>
                  addWatermark(
                    capturedPhoto,
                    topRight,
                    date,
                    companyName,
                    watermarkCallback,
                    colour
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
                    watermarkCallback,
                    colour
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
                    watermarkCallback,
                    colour
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
                    watermarkCallback,
                    colour
                  )
                }
              >
                Watermark bottom left
              </button>
              <button onClick={() => changeColour("#FFF")}>Light colour</button>
              <button onClick={() => changeColour("#000")}>Dark colour</button>
            </div>
          ) : null}
        </label>
        <div>
          <img
            src={capturedWatermarkedPhoto}
            alt={""}
            className={classes.img}
          ></img>
        </div>
      </div>

      {/* image input/upload */}

      <div className={classes.inputDiv}>
        <input
          accept="image/*"
          className={classes.input}
          id="pictureInput"
          type="file"
          disabled={inputDisabled}
          onChange={(e) => handleInput(e.target)}
        />

        <label htmlFor="pictureInput">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <FolderIcon fontSize="large" color="primary" />
          </IconButton>
          click to select image from storage
          <h5>Selected image</h5>
          <img src={selectedImage} alt={""} className={classes.img}></img>
          <br />
          {inputResults ? (
            <div>
              <button
                onClick={() =>
                  addWatermark(
                    selectedImage,
                    topRight,
                    date,
                    companyName,
                    watermarkCallback2,
                    colour
                  )
                }
              >
                Watermark top right
              </button>
              <button
                onClick={() =>
                  addWatermark(
                    selectedImage,
                    topLeft,
                    date,
                    companyName,
                    watermarkCallback2,
                    colour
                  )
                }
              >
                Watermark top left
              </button>
              <br />
              <button
                onClick={() =>
                  addWatermark(
                    selectedImage,
                    bottomRight,
                    date,
                    companyName,
                    watermarkCallback2,
                    colour
                  )
                }
              >
                Watermark bottom right
              </button>
              <button
                onClick={() =>
                  addWatermark(
                    selectedImage,
                    bottomLeft,
                    date,
                    companyName,
                    watermarkCallback2,
                    colour
                  )
                }
              >
                Watermark bottom left
              </button>
              <br />
              <button onClick={clearSelectedImg}>Clear</button>
              <button onClick={() => changeColour("#FFF")}>Light colour</button>
              <button onClick={() => changeColour("#000")}>Dark colour</button>
            </div>
          ) : null}
        </label>
        <div>
          <img
            src={selectedWatermarkedImage}
            alt={""}
            className={classes.img}
          ></img>
        </div>
      </div>
    </div>
  );
}
export default App;
