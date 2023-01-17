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
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [currentSlides, setCurrentSlides] = useState<any>([]);
  // items.slice(-1).concat(items.slice(0, 2))
  const [autoPlay, setAutoPlay] = useState(false);
  const [items2, setItems] = useState<any>([]);

  const handleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };
  // console.log({ currentIndex });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleNext = () => {
    let nextSlides = items2.slice(
      currentIndex + 1,
      currentIndex + 1 + slidesToShow
    );

    if (currentIndex + 1 + slidesToShow > items2.length) {
      console.log({ currentIndex });
      console.log(items2.length);
      nextSlides = [];
      nextSlides.push(items2[items2.length - 2]);
      nextSlides.push(items2[0]);
      nextSlides.push(items2[1]);

      if (items.length % 3 !== 0) {
        setCurrentIndex(-1);
      } else {
        nextSlides = [];
        nextSlides.push(
          items2[currentIndex - 1 >= 0 ? currentIndex - 1 : items2.length - 1]
        );
        nextSlides.push(items2[currentIndex]);
        nextSlides.push(
          items2[currentIndex + 1 === items2.length ? 0 : currentIndex + 1]
        );
        setCurrentIndex(
          currentIndex + 1 === items2.length ? 0 : currentIndex + 1
        );
      }

      // nextSlides = items2.slice(items2.length - 2, 0);
      console.log({ nextSlides });
      setCurrentSlides(nextSlides);
      return;
    }
    setCurrentSlides(nextSlides);

    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (items2.length - (slidesToShow - 1))
    );
  };

  useEffect(() => {
    const newSlides = [];
    if (items.length % 3 !== 0) {
      console.log(`this is for lop`, items.length / 3);
      const val = parseInt((items.length / 3).toString());
      console.log(val);
      for (let i = items.length - val; i < items.length; i++) {
        console.log({ i });
        newSlides.push(items[i]);
      }
    }
    newSlides.push(...items);
    // newSlides.push(items[items.length - 1]);
    setItems(newSlides);
    console.log({ newSlides });
    console.log(newSlides.slice(0, 3));
    setCurrentSlides(newSlides.slice(0, 3));
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
  // var currentSlides;

  // if (currentIndex === 0 || 1 || 2) {
  //   currentSlides = items.slice(currentIndex, currentIndex + slidesToShow);
  // } else if (currentIndex === 3) {
  //   currentSlides = items.slice(-2).concat(items.slice(0, 1));
  // } else if (currentIndex === 4) {
  //   currentSlides = items.slice(-1).concat(items.slice(0, 2));
  // }

  // const currentSlides = items.slice(currentIndex, currentIndex + slidesToShow);
  // console.log({ currentIndex, currentSlides });

  return (
    <>
      <div>
        <div className={Styles.myswiper}>
          {currentSlides.map((item: any, index: any) => (
            <div
              key={item.id}
              className={
                index === 1
                  ? `${Styles.active}`
                  : index === 0
                  ? `${Styles.left} `
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
