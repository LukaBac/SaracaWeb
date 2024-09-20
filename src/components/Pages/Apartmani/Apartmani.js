import './Apartmani.css';
import ImageSlider from '../../ImageSlider/ImageSlider';
import { Link} from 'react-router-dom';

import apartman1 from '../../../img/Ap51-9-min.jpg';
import apartman2 from '../../../img/Apartment2.jpg';

import { useTranslation } from 'react-i18next';

import 'aos/dist/aos.css';
import Card from '../../Cards/Card';
import { Helmet } from 'react-helmet';

const Apartmani = () => {

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
      "delay": 300,
    }
  ]



  return (
    <div className='ApartmaniSection'>
      <Helmet >
        <title>Saraca Palace Dubrovnik | Apartments</title>
        <meta name="description" content="Browse through our selection of stunning apartments in Dubrovnik."/>
      </Helmet>

        <ImageSlider height={"75vh"} currentImage={5}/>
        <p className='navLink'><Link to={"/"} className='navLinks'>{t('navbar.home')}</Link> {">"} <Link to={"/apartments"} className='navLinks'>{t('navbar.apartments')}</Link></p>

        <div className='ApartmaniMainInfo'>
          <h1 data-aos-anchor-placement="top-bottom" data-aos="fade-up">{t('apartmaniPage.h1')}</h1>
          <h2 data-aos-anchor-placement="top-bottom" data-aos="fade-up">{t('apartmaniPage.h2')}</h2>
          <p data-aos-anchor-placement="top-bottom" data-aos="fade-up">{t('apartmaniPage.text')}</p>
        </div>

        <div className='ApartmentCards'>
          {kartice.map((data) => (
            <Card data={data}/>
          ))}
        </div>

    </div>
  )
}

export default Apartmani
