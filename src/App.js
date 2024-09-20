import './index.css';
import { Link } from 'react-router-dom';

import ImageSlider from './components/ImageSlider/ImageSlider';
import ImageDiv from './components/ImageDiv/ImageDiv';

import apartman1 from './img/Ap51-9-min.jpg';
import apartman2 from './img/Apartment2.jpg';
import imageDivSlika from './img/Apartment1.png';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight, faBars, faEnvelope, faLocationDot, faPhone, faQuoteLeft, faBook } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

import { Helmet } from 'react-helmet';

import 'aos/dist/aos.css';

import { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import Card from './components/Cards/Card';


library.add(faPhone, faEnvelope, faInstagram, faFacebook, faTwitter, faLocationDot, faQuoteLeft, faBars, faChevronRight, faChevronLeft, faBook)

function App() {
  const { t } = useTranslation();
  const kartice = [
    {
      "slika": apartman1,
      "naslov": "Cathedral View",
      "apartmanID": "cathedral-view",
      "tekst": t('apartmentCards.kartica1-Text'),
      "delay": 0,
    },
    {
      "slika": apartman2,
      "naslov": "Garden View",
      "apartmanID": "garden-view",
      "tekst": t('apartmentCards.kartica2-Text'),
      "delay": 200,
    }
  ]

  // const [direction, setDirection] = useState('row');


  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 1200) {
  //       setDirection('column');
  //     } 

  //     else {
  //       setDirection('row');
  //     }
  //   };
  //   window.addEventListener('resize', handleResize);
  //   handleResize();
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

    return (
      <>      
        <Helmet >
          <title>Saraca Palace Dubrovnik</title>
          <meta name="description" content="The official website of Saraca Palace apartments in Dubrovnik"/>
        </Helmet>
        <ImageSlider height="calc(100vh - 150px)"/>
        <div className='MainInfo'>
          <h1 data-aos="fade-up" data-aos-anchor-placement="top-bottom" className='Naslov highlight'>{t('home.firstH1')}</h1>
          <h2 data-aos="fade-up">{t('home.h2')}</h2>
          <p data-aos="fade-up" >{t('home.text1')}</p>
          <p data-aos="fade-up" >{t('home.text2')}</p>
          <Link to={"/apartments"}><button data-aos="fade-up" className='ViewApartmentsBtn'>{t('home.buttonText')}</button></Link>
        </div>

        <ImageDiv image={apartman1}/>

        <div className='ApartmaniInfo'>
          <h2 className='highlight' data-aos="fade-up">{t('home.secondH1')}</h2>
          <p data-aos="fade-up">{t('home.text3')}</p>
        </div>

        <div className='MainApartmentCards'>
          {kartice.map((data) => (
            <Card data={data}/>
          ))}
        </div>
      </>

    );
}



export default App;
