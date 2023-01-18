import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Styles from "@/styles/Home.module.scss";
import React, { useState, useEffect } from "react";

const items = [
  { id: 1, title: "Slide 1", src: "/food-1.png" },
  { id: 2, title: "Slide 2", src: "/food-2.png" },
  { id: 3, title: "Slide 3", src: "/food-3.png" },
  { id: 4, title: "Slide 4", src: "/food-4.png" },
  { id: 5, title: "Slide 5", src: "/food-5.png" },
  { id: 6, title: "Slide 3", src: "/food-3.png" },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [currentSlides, setCurrentSlides] = useState<any>([]);
  const [autoPlay, setAutoPlay] = useState(false);
  const [items2, setItems] = useState<any>([]);

  const handleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleNext = () => {
    const nextSlides = []
    let ci = currentIndex === items.length ? 0 : currentIndex

    if(ci <= items.length-4){
      setCurrentSlides(items.slice(ci, ci+4))
      setCurrentIndex(ci+1)
      return 
    }

    for(let i=ci; i<items.length; i++){
      nextSlides.push(items[i])

    }
    const to = 4-nextSlides.length

    for(let i=0; i<to; i++){
      nextSlides.push(items[i])


    }
    setCurrentSlides(nextSlides)
    setCurrentIndex(ci+1)
  };

  useEffect(() => {

    setCurrentSlides(items.slice(0, 4))
    setCurrentIndex(1)

  }, []);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(handleNext, 2000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, handleNext]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return items.length - 1;
      }
      return prevIndex - 1;
    });
  };

  return (
    <>
      <div>
        <div className={Styles.myswiper}>
          {currentSlides.map((item: any, index: any) => (
            <div
              key={item.id}
              className={
                index === 2
                  ? `${Styles.active}`
                  : index === 1
                  ? `${Styles.left} `
                  : index == 0
                  ? `${Styles.left_out}`
                  : `${Styles.right}`
              }
            >
              <Image src={item.src} alt={item.title} fill />
            </div>
          ))}
        </div>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={handleAutoPlay}>
          {autoPlay ? "Stop Autoplay" : "Start Autoplay"}
        </button>
      </div>
    </>
  );
}
