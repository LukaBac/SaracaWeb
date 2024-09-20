import { useTranslation } from 'react-i18next';
import './Cards.css';

import { Link } from 'react-router-dom';

import Aos from 'aos';
import 'aos/dist/aos.css';
import BookingBtn from '../BookingButton/BookingBtn';

const Card = ({data, width}) => {

  const { t } = useTranslation();

  return (
    <div className='CardDiv' style={{width: width}} data-aos="fade-up" data-aos-delay = {data.delay}>
        <Link to={"/gallery/" + data.apartmanID} className='cardImageLink'><div className='CardImage' style={{backgroundImage: "url(" + data.slika + ")"}}></div></Link>
        <h2>{data.naslov}</h2>
        <p>{data.tekst}</p>
        <Link className='cardLink' to={"/apartments/" + data.apartmanID}><span>{t('readMore')}</span></Link>
        <BookingBtn />
    </div>  
    )
}

export default Card