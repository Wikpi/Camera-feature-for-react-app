export const getImageWidth = (imgSrc) => {
  // Create new offscreen image to test
  const theImage = new Image();
  theImage.src = imgSrc;
  // Get accurate measurements from that.
  const imageWidth = theImage.width;
  // Create an object to save the image width and height
  const imgDimensions = { width: imageWidth };
  // Return the result
  return imgDimensions;
};

export const getImageHeight = (imgSrc) => {
  // Create new offscreen image to test
  const theImage = new Image();
  theImage.src = imgSrc;
  // Get accurate measurements from that.
  const imageHeight = theImage.height;
  // Create an object to save the image width and height
  const imgDimensions = { height: imageHeight };
  // Return the result
  return imgDimensions;
};
