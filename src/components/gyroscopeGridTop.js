import React, { useEffect, useState } from "react";
import "./styles.css";
import GridTop from "../img/GridTop2.svg";

const GyroscopeGridTop = () => {
  const [tilt, setTilt] = useState({ alpha: 0, beta: 90, gamma: 0 });
  console.log("tilt", tilt);

  useEffect(() => {
    const requestPermission = async () => {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        } catch (error) {
          console.error("DeviceOrientation permission denied", error);
        }
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };

    const handleOrientation = (event) => {
      const { alpha, beta, gamma } = event;
      setTilt({ alpha, beta, gamma });
    };

    requestPermission();

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const { alpha, beta, gamma } = tilt;

  return (
    <div
      className="grid-top"
      style={{
        transform: `rotateZ(${alpha}deg) rotateX(${gamma}deg) rotateY(${beta-90}deg)`,
        transition: "transform 0.2s ease-out", // Smooth transition for tilt effect
      }}
    >
      <img src={GridTop} alt="Grid Bottom" />
    </div>
  );
};

export default GyroscopeGridTop;
