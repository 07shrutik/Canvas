import { useEffect, useRef, useState } from "react";
import "./Canvas.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Canvas = () => {
  const canvasRef = useRef(null);
  const [pixelData, setPixelData] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext("2d");

    const canvasWidth = 16; // this is to declare the height and width of Canvas
    const canvasHeight = 34;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvasContext.fillRect(0, 0, canvasWidth, canvasHeight);
    canvasContext.fillStyle = "black"; // this is to set the Canvas background-color

    canvasContext.font = "24px Arial";
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "middle";
    canvasContext.fillStyle = "white"; // this is to set the text-color
    canvasContext.fillText("S", centerX, centerY);

    const image = canvasContext.getImageData(0, 0, canvasWidth, canvasHeight);
    const canvaspixels = image.data;

    let canvasColorData = "";
    for (let i = 0; i < canvaspixels.length; i += 4) {
      const r = canvaspixels[i].toString(16).padStart(2, "0");
      const g = canvaspixels[i + 1].toString(16).padStart(2, "0");
      const b = canvaspixels[i + 2].toString(16).padStart(2, "0");
      canvasColorData += `#${r}${g}${b}\n`;
    }
    setPixelData(canvasColorData);
  }, []);

  const handleDownload = () => {
    const blob = new Blob([pixelData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "CanvasPixelData.txt";
    link.click();
    toast.success("File Downloaded");
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1>Canvas Pixel Colors Data - Download File and Explore</h1>
      <canvas ref={canvasRef} />
      <button onClick={handleDownload}>Download Canvas Data</button>
    </div>
  );
};

export default Canvas;
