import React, { useState, useEffect, useCallback } from "react";
import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import { data } from "./data";
import "./styles.css";
import ChildComponent from "./childComponent";
import GyroscopeGridTop from "./gyroscopeGridTop";
import GyroscopeGridBottom from "./gyroscopeGridBottom";

export default function BubbleEffect() {
  const [centerBubble, setCenterBubble] = useState(null);

  const options = {
    size: 100,
    minSize: 30,
    gutter: 8,
    provideProps: true,
    numCols: 6,
    fringeWidth: 100,
    yRadius: 100,
    xRadius: 100,
    cornerRadius: 150,
    showGuides: false,
    compact: false,
    gravitation: 5,
  };

  const handleZoomOrScroll = () => {
    const bubbles = document.querySelectorAll(".bubble-container");
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    let closestBubble = null;
    let closestDistance = Infinity;

    bubbles.forEach((bubble, index) => {
      const rect = bubble.getBoundingClientRect();
      const bubbleCenterX = rect.left + rect.width / 2;
      const bubbleCenterY = rect.top + rect.height / 2;

      const distanceToCenter = Math.hypot(
        bubbleCenterX - centerX,
        bubbleCenterY - centerY
      );

      if (distanceToCenter < closestDistance) {
        closestDistance = distanceToCenter;
        closestBubble = index;
      }
    });

    setCenterBubble(closestBubble);
  };

  useEffect(() => {
    window.addEventListener("resize", handleZoomOrScroll);
    window.addEventListener("scroll", handleZoomOrScroll);
    window.addEventListener("wheel", handleZoomOrScroll);
    window.addEventListener("touchmove", handleZoomOrScroll);
    window.addEventListener("gesturechange", handleZoomOrScroll);

    handleZoomOrScroll();

    return () => {
      window.removeEventListener("resize", handleZoomOrScroll);
      window.removeEventListener("scroll", handleZoomOrScroll);
      window.removeEventListener("wheel", handleZoomOrScroll);
      window.removeEventListener("touchmove", handleZoomOrScroll);
      window.removeEventListener("gesturechange", handleZoomOrScroll);
    };
  }, []);

  const handleClick = useCallback((bubble) => {
    console.log(`Clicked on bubble: ${bubble}`);
  }, []);

  const children = data?.map((data, i) => {
    return (
      <div className="bubble-container" key={i}>
        <ChildComponent
          data={data}
          setClick={handleClick}
          isCenter={i === centerBubble}
        />
      </div>
    );
  });

  return (
    <div className ="mainDiv">
      <GyroscopeGridTop /> 
      <BubbleUI key={1} options={options} className="myBubbleUI">
        {children}
      </BubbleUI>
      <GyroscopeGridBottom/>
    </div>
  );
}
