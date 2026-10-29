import { Carousel } from "react-bootstrap";
import ImageCarousel from "./ImageCarousel";
import image1 from "../assets/car4.jpg";
import image2 from "../assets/car2.jpg";
import image3 from "../assets/car3.jpg";
import image6 from "../assets/car5.jpg";
import image5 from "../assets/car6.jpg";
import "../styles/carousel.css";

const slides = [
  { img: image1, label: "Excellence", sub: "Shaping Champions Since 2004" },
  { img: image2, label: "Discipline", sub: "Where Strategy Meets Strength" },
  {
    img: image3,
    label: "Heritage",
    sub: "Rooted in Lagos. Built for the World.",
  },
  { img: image5, label: "Inclusion", sub: "Every Athlete. Every Ability." },
  { img: image6, label: "Legacy", sub: "Rewriting What's Possible" },
];

function CarouselComp() {
  return (
    <div className="hero-carousel-wrapper">
      <Carousel slide interval={4500} pause="hover">
        {slides.map((slide, i) => (
          <Carousel.Item key={i}>
            <div className="hero-slide">
              <img
                src={slide.img}
                alt={slide.label}
                className="hero-slide-img"
              />

              {/* Dark overlay */}
              <div className="hero-overlay" />

              {/* Text content */}
              <div className="hero-slide-content">
                <h2 className="hero-slide-label">{slide.label}</h2>
                <p className="hero-slide-sub">{slide.sub}</p>
              </div>

              {/* Bottom gradient fade */}
              <div className="hero-bottom-fade" />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Floating badge */}
      <div className="hero-badge">
        <span className="hero-badge-dot" />
        Since 2004
      </div>
    </div>
  );
}

export default CarouselComp;
