import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import image from "../assets/one.jpeg";
import image1 from "../assets/two.jpeg";
import image2 from "../assets/three.jpeg";
import { db } from "../firebase";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "../styles/slide.css";

import { EffectCoverflow, Pagination } from "swiper/modules";

const fallbackSlides = [
  { id: 1, image: image },
  { id: 2, image: image1 },
  { id: 3, image: image2 },
];

export default function SLideComp() {
  const [slides, setSlides] = useState(fallbackSlides);

  useEffect(() => {
    const fetchGallerySlides = async () => {
      try {
        const q = query(
          collection(db, "gallery"),
          orderBy("createdAt", "desc"),
        );
        const querySnapshot = await getDocs(q);
        const gallerySlides = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          image: doc.data().imageUrl,
        }));

        if (gallerySlides.length > 0) {
          setSlides(gallerySlides);
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    fetchGallerySlides();
  }, []);

  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={true}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {slides.map((sli) => (
          <SwiperSlide key={sli.id}>
            <img src={sli.image} alt="slide" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
