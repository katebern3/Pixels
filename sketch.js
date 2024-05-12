let capture;

function setup() {
  createCanvas(640, 886);
  capture = createCapture(VIDEO);
  capture.size(640, 886);
  capture.hide(); // Hide the video element
}

function draw() {
  background(255);
  capture.loadPixels(); // Load the pixels from the video capture
  let stepSize = 5; // Pixel size

  // Nested loops to iterate through each pixel and draw rectangles
  for (let y = 0; y < capture.height; y += stepSize) {
    for (let x = 0; x < capture.width; x += stepSize) {
      let index = (x + y * capture.width) * 4;
      let r = capture.pixels[index];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];
      
      // Round each color value to the nearest specified color
      r = roundToColor(r, [255, 0, 255, 128, 255]);
      g = roundToColor(g, [0, 0, 192, 0, 255]);
      b = roundToColor(b, [0, 255, 203, 128, 0]);
      
      fill(r, g, b);
      rect(x, y, stepSize, stepSize);
    }
  }
}

// Function to round a color value to the nearest specified color
function roundToColor(value, colors) {
  let minDistance = Infinity;
  let closestColor = 0;

  for (let i = 0; i < colors.length; i++) {
    let distance = Math.abs(value - colors[i]);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = colors[i];
    }
  }
  
  return closestColor;
}
