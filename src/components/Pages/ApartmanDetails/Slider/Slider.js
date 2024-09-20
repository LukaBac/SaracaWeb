import { useState } from "react";

const Slider = ({images}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevClick = () => {
    if (activeIndex === 0) return;
    setActiveIndex(activeIndex - 1);
  };

  const handleNextClick = () => {
    if (activeIndex === images.length - 1) return;
    setActiveIndex(activeIndex + 1);
  };

  const handleCarouselClick = (index) => {
    setActiveIndex(index);
  };


  return (
    <div className="image-slider">
      <div className="slider" style={{ width: '500px', overflow: 'hidden' }}>
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(-${activeIndex * 500}px)`,
            width: `${500 * images.length}px`,
            display: 'flex',
            transition: 'transform 0.5s ease',
          }}
        >
          {images.map((image, index) => (
            <div key={index} style={{ width: '500px' }}>
              <img src={image} alt={`Slide ${index}`} style={{ width: '100%' }} />
            </div>
          ))}
        </div>
        <button className="prev" onClick={handlePrevClick}>
          &#8249;
        </button>
        <button className="next" onClick={handleNextClick}>
          &#8250;
        </button>
      </div>
      <div className="carousel" style={{ display: 'flex', justifyContent: 'center' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Carousel Image ${index}`}
            className={activeIndex === index ? 'active' : ''}
            style={{ width: '100px', margin: '0 10px', cursor: 'pointer' }}
            onClick={() => handleCarouselClick(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider
