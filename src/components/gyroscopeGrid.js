import React, { useEffect, useState } from "react";
import "./styles.css";
import GridBottom from "../img/GridBottom.svg";

const GyroscopeGrid = () => {
  const [tilt, setTilt] = useState({ alpha: 0, beta: 90, gamma: 0 }); // Initialize with default values

  useEffect(() => {
    // Request permission for device orientation on iOS 13+ and modern mobile browsers
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
        window.addEventListener("deviceorientation", handleOrientation); // For Android and browsers where permission is not required
      }
    };

    const handleOrientation = (event) => {
      const { alpha, beta, gamma } = event;
      setTilt({ alpha, beta, gamma });
    };

    requestPermission(); // Call permission request on mount

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation); // Clean up event listener on unmount
    };
  }, []);

  const { alpha, beta, gamma } = tilt; // Destructure tilt state

  return (
    <div
      className="grid"
      style={{
        transform: `rotateX(${beta}deg) rotateY(${gamma}deg) rotateZ(${alpha}deg)`, // Proper syntax for applying multiple transforms
        transition: 'transform 0.2s ease-out' // Smooth transition for tilt effect
      }}
    >
      <img src={GridBottom} alt="Grid Bottom" />
    </div>
  );
};

export default GyroscopeGrid;
