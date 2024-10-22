import React, { forwardRef } from "react";

const ChildComponent = forwardRef(({ data, setClick, isCenter }, ref) => {
  return (
    <div ref={ref} className="childComponent" onClick={() => setClick(data)}>
      {isCenter ? (
        <video
          src="https://www.shutterstock.com/shutterstock/videos/3443839767/preview/stock-footage-motion-timelapse-pov-shot-from-modern-dubai-metro-running-alongside-the-sheikh-zayed-road-at-night.webm"
          autoPlay
          loop
          muted
          className="media"
          playsInline // Ensure video plays inline without full-screen behavior
        />
      ) : (
        <img src={data.props.src} width={data.props.width} alt="Profile" className="media" />
      )}
    </div>
  );
});

export default ChildComponent;
