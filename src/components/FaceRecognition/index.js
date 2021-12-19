import React from "react";
import "./styles.css";
function FaceRecognition({ imgSrc, box }) {
  return (
    <div className="center">
        <div className="absolute mt-2">
        <img id="inputimage" src={imgSrc} alt="" style={{ width: "500px", height: "auto" }} />
        <div className="bounding_box" style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}} ></div>
        </div>
      
    </div>
  );
}

export default FaceRecognition;
