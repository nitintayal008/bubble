import React, { useEffect, useState } from "react";
import "./styles.css";
import GridBottom from "../img/GridBottom.svg";

const GyroscopeGridBottom = () => {
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
      className="grid-bottom"
      style={{
        transform: `rotateZ(${gamma}deg)`,
        transition: "transform 0.2s ease-out",
      }}
    >
      <img src={GridBottom} alt="Grid Bottom" />
    </div>
  );
};

export default GyroscopeGridBottom;
