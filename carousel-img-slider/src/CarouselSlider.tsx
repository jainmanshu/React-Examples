import { useEffect, useState } from "react";
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
import "./carousel.css";

type CarouselProps = {
  images: string[];
  timeout: number;
};

function CarouselSlider({ images, timeout }: CarouselProps) {
  const [displayImage, setDisplayImage] = useState(0);
  const [timer, setTimer] = useState<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayImage((prev) => {
        if (prev === images.length - 1) return 0;
        return prev + 1;
      });
    }, timeout);

    setTimer(interval);

    return () => clearInterval(interval);
  }, [timeout, images]);

  const handleNext = () => {
    setDisplayImage((prev) => {
      if (prev === images.length - 1) return 0;
      return prev + 1;
    });
    resetInterval();
  };

  const handlePrev = () => {
    setDisplayImage((prev) => {
      if (prev === 0) return images.length - 1;
      return prev - 1;
    });
    resetInterval();
  };

  const resetInterval = () => {
    clearInterval(timer);
    const newTimer = setInterval(() => {
      setDisplayImage((prev) => {
        if (prev === images.length - 1) return 0;
        return prev + 1;
      });
    }, timeout);
    setTimer(newTimer);
  };

  return (
    <div className="carousel-container">
      <div className="img-container">
        {images.map((image) => (
          <img
            key={image}
            src={image}
            className="img-slider"
            style={{
              translate: `${-100 * displayImage}%`,
            }}
          />
        ))}
      </div>
      <button onClick={handlePrev} className="img-button" style={{ left: 0 }}>
        <ArrowBigLeft />
      </button>
      <button onClick={handleNext} className="img-button" style={{ right: 0 }}>
        <ArrowBigRight />
      </button>
      <div className="image-selector">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setDisplayImage(index)}
            className="img-slider-dot"
          >
            {index === displayImage ? <CircleDot /> : <Circle />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CarouselSlider;
