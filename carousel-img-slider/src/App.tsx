import CarouselSlider from "./CarouselSlider";
import image1 from "./assets/car-1.jpg";
import image2 from "./assets/car-2.jpg";
import image3 from "./assets/car-3.jpg";
import image4 from "./assets/car-4.jpg";
import image5 from "./assets/car-5.jpg";

const images = [image1, image2, image3, image4, image5];

function App() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        width: "100%",
        height: "500px",
        margin: "0 auto",
        aspectRatio: 10 / 6,
        placeItems: "center",
      }}
    >
      <CarouselSlider images={images} />
    </div>
  );
}

export default App;
