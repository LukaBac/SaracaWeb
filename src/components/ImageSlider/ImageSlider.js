import Image1 from '../../img/Image1-2.jpg';
// import Image2 from '../../img/Image2.png';
import Image2 from '../../img/Landing/Ap51-43-min.jpg';
import Image3 from '../../img/Image3.jpg';
import Image4 from '../../img/Image4-2.jpg';
import Image5 from '../../img/Apartment2.jpg';
import Image6 from '../../img/Ap51-9-min.jpg';


import './ImageSlider.css';

import React, { useEffect, useState, useRef } from 'react';

const ImageSlider = ({height, images = [Image1, Image2, Image3, Image4, Image5, Image6], currentImage=0}) => {


    const [currentIndex, setCurrentIndex] = useState(currentImage);
    const timer = useRef(null);

    const NextImage  = () => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === images.length - 1) {
          return 0;
        } else {
          return prevIndex + 1;
        }
      });
    };
  
    const PreviousImage  = () => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === 0) {
          return images.length - 1;
        } else {
          return prevIndex - 1;
        }
      });
    };
  

  useEffect(() => {
    if(timer.current){
        clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
        NextImage()
    }, 10000);

    return () => clearTimeout(timer.current);
}, [NextImage])
  
    return (
      <div className="slider" style={{height: height}}>
        {images.map((image, index) => (
          <div
            key={index}
            id="imageSliderImage"
            className={`slide ${index === currentIndex ? 'activeImage' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <button className="prev" onClick={NextImage}>
          &#10094;
        </button>
        <button className="next" onClick={PreviousImage}>
          &#10095;
        </button>
      </div>
    );
  };

export default ImageSlider
