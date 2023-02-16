import { useEffect, useRef, useState } from "react";
import Slide from "../components/Slide";
import api from "../utils/api";

const Slideshow = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intr = useRef(null);

  const fetchSlides = async () => {
    const response = await api.get("/slide");
    setSlides(response.data);
  };

  const removeInterval = () => {
    if (intr.current) {
      clearInterval(intr.current);
      intr.current = null;
    }
  };

  const videoEnded = () => {
    if (slides[currentSlide]?.file.mediaType === "VIDEO") {
      setCurrentSlide((currentSlide + 1) % slides.length);
    }
  };

  useEffect(() => {
    removeInterval();
    if (slides[currentSlide]?.file.mediaType === "IMAGE") {
      intr.current = setInterval(() => {
        setCurrentSlide((currentSlide + 1) % slides.length);
      }, 7000);
    }
    return () => {
      removeInterval();
    };
  }, [currentSlide, slides.length]);

  useEffect(() => {
    fetchSlides();
  }, []);

  return (
    <div className="flex-1 relative bg-black">
      {slides.map((v, index) => (
        <Slide
          key={index}
          index={index}
          currentSlide={currentSlide}
          videoEnded={videoEnded}
          {...v}
        />
      ))}
    </div>
  );
};

export default Slideshow;
