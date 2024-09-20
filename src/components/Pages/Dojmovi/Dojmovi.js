import './Dojmovi.css';

import ImageSlider from '../../ImageSlider/ImageSlider';
import DojamCard from './DojamCard';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useEffect } from 'react';
import Aos from 'aos';
import { Helmet } from 'react-helmet';


import 'aos/dist/aos.css';

const Dojmovi = () => {

  const { t } = useTranslation();

  const dojmoviLeft = [
    {
      "naslov": t('testimonials.card1.naslov'),
      "tekst": t('testimonials.card1.tekst'),
      "datum": "4.9.2022",
      "ime": "Kerry"
    },
    {
      "naslov": t('testimonials.card2.naslov'),
      "tekst": t('testimonials.card2.tekst'),
      "datum": "31.12.2022",
      "ime": "Sarah"
    },
    {
      "naslov": t('testimonials.card3.naslov'),
      "tekst": t('testimonials.card3.tekst'),
      "datum": "24.10.2022",
      "ime": "Kathleen"
    },
    {
      "naslov": t('testimonials.card4.naslov'),
      "tekst": t('testimonials.card4.tekst'),
      "datum": "4.10.2022",
      "ime": "Deanna"
    },
  ]

  const dojmoviRight = [
    {
      "naslov": t('testimonials.card5.naslov'),
      "tekst": t('testimonials.card5.tekst'),
      "datum": "30.9.2022",
      "ime": "Peggy"
    },
    {
      "naslov": t('testimonials.card6.naslov'),
      "tekst": t('testimonials.card6.tekst'),
      "datum": "19.9.2022",
      "ime": "Marsyg"
    },
    {
      "naslov": t('testimonials.card7.naslov'),
      "tekst": t('testimonials.card7.tekst'),
      "datum": "7.9.2022",
      "ime": "Yuen"
    },
    {
      "naslov": t('testimonials.card8.naslov'),
      "tekst": t('testimonials.card8.tekst'),
      "datum": "10.8.2021",
      "ime": "Tatevik"
    },
  ]

  const [isAosEnabled, setIsAosEnabled] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 750) {
          setIsAosEnabled(true);
          Aos.refresh();
        } else {
          setIsAosEnabled(false);
        }
      };

      handleResize();
        window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };

      }, [])

  return (
    <div className='DojmoviSection'>
      <Helmet >
        <title>Saraca Palace Dubrovnik | Testimonials</title>
        <meta name="description" content="Read what our users said about our apartments."/>
      </Helmet>



      <ImageSlider height="75vh" currentImage={2}/>
      <p className='navLink'><Link to={"/"} className='navLinks'>{t('navbar.home')}</Link> {">"} <Link to={"/dojmovigostiju"} className='navLinks'>{t('navbar.testimonials')}</Link></p>
      <div className='DojmoviText'>
        <h1 data-aos = {isAosEnabled ? `fade-up` : ''} className='DojmoviNaslov'>{t('testimonials.h1')}</h1>
        <p id='reviewsText' data-aos = {isAosEnabled ? `fade-up` : ''} ><span className='bold'>{t('testimonials.pNaslov')}</span>{t('testimonials.p')}</p>
        <img title='Rating' width={"auto"} height={"auto"} loading='lazy' alt='Booking.com rating' data-aos = {isAosEnabled ? `fade-up` : ''} id='reviewsImage' src={require('../../../img/Reviews.png')}></img>
        <h2 data-aos = {isAosEnabled ? `fade-up` : ''} style={{marginTop: '4rem'}} className='DojmoviNaslov2'>{t('testimonials.h2')}</h2>
      </div>
      <div className='DojmoviCards'>
        <div className='lijevo'>
          {dojmoviLeft.map((data) => (
            <DojamCard data={data} side = "right" isAosEnabled = {isAosEnabled}/>
          ))}
        </div>
        <div className='desno'>
          {dojmoviRight.map((data) => (
              <DojamCard data={data} side = "left" isAosEnabled = {isAosEnabled}/>
          ))}
        </div>
        
      </div>

    </div>
  )
}

export default Dojmovi
