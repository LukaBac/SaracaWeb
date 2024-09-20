import Image1 from '../../img/Image1.png';
import Image2 from '../../img/Image2.png';
import Image3 from '../../img/Image3.jpg';
import Image4 from '../../img/Image4.png';
import Image5 from '../../img/Apartment2.jpg';
import Image6 from '../../img/Apartment1.png';


import './Test.css';

import React, { useEffect, useState, useRef } from 'react';

const Test = ({height, images = [Image1, Image2, Image3, Image4], currentImage=0}) => {


    const [currentIndex, setCurrentIndex] = useState(currentImage);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const touchStartX = useRef(null);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const touchEndX = e.touches[0].clientX;
    const touchDiff = touchStartX.current - touchEndX;

    if (Math.abs(touchDiff) > 50) {
      touchDiff > 0 ? handleNext() : handlePrev();
    }
  };

  useEffect(() => {
    setIsAnimating(false);
  }, [currentIndex]);
  
    return (
      <div className="slider" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} ref={containerRef} style={{height: height}}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'activeImage' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <button className="prev" onClick={handlePrev}>
          &#10094;
        </button>
        <button className="next" onClick={handleNext}>
          &#10095;
        </button>
      </div>
    );
  };

export default Test
