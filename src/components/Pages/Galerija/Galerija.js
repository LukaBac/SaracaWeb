import './Galerija.css';
import ImageSlider from '../../ImageSlider/ImageSlider';
import ImageModal from './ImageModal';
import GalerijaImages from './GalerijaImages';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Helmet } from 'react-helmet';


const Galerija = ({currentFilter = "galerija"}) => {

  const [selected, setSelected] = useState(currentFilter);

  const handleRadioChange = (event) => {
    setSelected(event.target.value);
  };

  const [currentImg, setCurrentImg] = useState(null);

  const handleClick = (image) =>{
    const body = document.getElementById('body');
    setCurrentImg(image);
    body.style.overflowY = "hidden";
  } 

  useEffect(() => {
    if(selected === 'galerijaGarden' || selected === 'galerijaPalace'){
      const element = document.getElementById("GalerijaNaslov");
      element.scrollIntoView();
    }
  }, [])

  const { t } = useTranslation();
    
  return (
    <div className='GalerijaSection'>
        <Helmet >
          <title>Saraca Palace Dubrovnik | Gallery</title>
          <meta name="description" content="Browse through our stunning image gallery showcasing our apartments in Dubrovnik."/>
        </Helmet>


        <ImageSlider height="75vh" currentImage={3}/>
        <p className='navLink'><Link to={"/"} className='navLinks'>{t('navbar.home')}</Link> {">"} <Link to={"/galerija"} className='navLinks'>{t('navbar.gallery')}</Link></p>
        <h1 id='GalerijaNaslov'>{t('gallery.naslov')}</h1>
        <h2>{t('gallery.h2')}</h2>
      

        <div className='galleryFilters'>
        <label>
        <input
          type="radio"
          name="options"
          value="galerija"
          checked={selected === "galerija"}
          onChange={handleRadioChange}
          style={{ display: "none" }} // hide the radio button
        />
        <span
          style={{ cursor: "pointer", color: selected === "galerija" ? "rgb(100, 100, 100)" : "black" }}
          onClick={() => setSelected("galerija")}
        >
          {t('gallery.filterALL')}
        </span>
      </label>
      <label>
        <input
          type="radio"
          name="options"
          value="galerijaPalace"
          checked={selected === "galerijaPalace"}
          onChange={handleRadioChange}
          style={{ display: "none" }} // hide the radio button
        />
        <span
          style={{ cursor: "pointer", color: selected === "galerijaPalace" ? "rgb(100, 100, 100)" : "black" }}
          onClick={() => setSelected("galerijaPalace")}
        >
          CATHEDRAL VIEW
        </span>
      </label>
      <label>
        <input
          type="radio"
          name="options"
          value="galerijaGarden"
          checked={selected === "galerijaGarden"}
          onChange={handleRadioChange}
          style={{ display: "none" }} // hide the radio button
        />
        <span
          style={{ cursor: "pointer", color: selected === "galerijaGarden" ? "rgb(100, 100, 100)" : "black" }}
          onClick={() => setSelected("galerijaGarden")}
        >
          GARDEN VIEW
        </span>
      </label>
        </div>
        {selected && <GalerijaImages path={selected} handleClick = {handleClick}/>}
        {currentImg && <ImageModal image={currentImg} setImage={setCurrentImg}/>}
    </div>
  )
}

export default Galerija
