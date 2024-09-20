import './Aktivnosti.css';
import ImageSlider from "../../ImageSlider/ImageSlider"
import { Link } from "react-router-dom"
import AktivnostiCard from './AktivnostiCard';

import imageSailing from '../../../img/Aktivnosti/Sailing.jpg';
import imageIzleti from '../../../img/Aktivnosti/Izleti.jpg';
import image1 from '../../../img/Aktivnosti/beach.jpg';
import imageBeaches from '../../../img/Aktivnosti/beaches.jpg';
import imageWines from '../../../img/Aktivnosti/Wine.jpg';
import imageDiving from '../../../img/Aktivnosti/diving.jpg';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

import 'aos/dist/aos.css';


const Aktivnosti = () => {

    const { t } = useTranslation();

    const activities = [
        {
            "naslov": t('activities.cards.naslov1'),
            "tekst": t('activities.cards.text1'),
            "slika": imageSailing
        },
        {
            "naslov": t('activities.cards.naslov2'),
            "tekst": t('activities.cards.text2'),
            "slika": imageIzleti
        },
        {
            "naslov": t('activities.cards.naslov3'),
            "tekst": t('activities.cards.text3'),
            "slika": image1
        },
        {
          "naslov": t('activities.cards.naslov4'),
          "tekst": t('activities.cards.text4'),
          "slika": imageBeaches
        },

        {
          "naslov": t('activities.cards.naslov5'),
          "tekst": t('activities.cards.text5'),
          "slika": imageWines
        },

        {
          "naslov": t('activities.cards.naslov6'),
          "tekst": t('activities.cards.text6'),
          "slika": imageDiving
        }
    ]


  return (
    <div className='AktivnostiPage'>
      <Helmet >
          <title>Saraca Palace Dubrovnik | Activities</title>
          <meta name="description" content="Take a look at some of the activities you can do while staying at Saraca Palace Dubrovnik"/>
      </Helmet>


      <ImageSlider height={"75vh"} currentImage={1}/>

        <p className='navLink'><Link to={"/"} className='navLinks'>{t('navbar.home')}</Link> {">"} <Link to={"/aktivnosti"} className='navLinks'>{t('navbar.activities')}</Link></p>

        <div className='AktivnostiMainInfo'>
          <h1 data-Aos="fade-up">{t('activities.h1')}</h1>
          <h2 data-Aos="fade-up">{t('activities.h2')}</h2>
          <p data-Aos="fade-up">{t('activities.text')}</p>
        </div>

        <div className='aktivnostiCards'>
            {activities.map((data) =>(
                <AktivnostiCard naslov={data.naslov} text={data.tekst} image={data.slika}/>
            ))}
        </div>
    </div>
  )
}

export default Aktivnosti
