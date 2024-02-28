import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
import "./carousel.css";

type CarouselProps = {
  images: string[];
};

function CarouselSlider({ images }: CarouselProps) {
  const [displayImage, setDisplayImage] = useState(0);

  const handleNext = () => {
    setDisplayImage((prev) => {
      if (prev === images.length - 1) return 0;
      return prev + 1;
    });
  };

  const handlePrev = () => {
    setDisplayImage((prev) => {
      if (prev === 0) return images.length - 1;
      return prev - 1;
    });
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
