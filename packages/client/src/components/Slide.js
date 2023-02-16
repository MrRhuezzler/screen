import { useEffect, useRef } from "react";

const Slide = ({ index, currentSlide, file, videoEnded }) => {
  const { mediaType, url, fileName } = file;
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.muted = false;
      videoRef.current.volume = "1.0";
    }
  }, [videoRef]);

  if (currentSlide !== index) return <></>;

  if (mediaType === "IMAGE") {
    return (
      <img
        className={`w-full h-full object-contain absolute top-0 left-0`}
        src={url}
        alt={fileName}
      />
    );
  } else {
    return (
      <video
        ref={videoRef}
        controls={true}
        autoPlay={true}
        loop={false}
        muted
        className={`w-full h-full object-contain absolute top-0 left-0`}
        onEnded={(e) => {
          videoEnded();
        }}
      >
        <source src={url} type="video/mp4" />
      </video>
    );
  }
};

export default Slide;
