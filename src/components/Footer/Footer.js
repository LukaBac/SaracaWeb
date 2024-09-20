import './Footer.css';
import Line from '../Misc/Line/Line';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

const Footer = () => {

  const { t } = useTranslation();

  const openBooking = () => {
    window.open("https://saraca-palace.book.rentl.io/", "_blank")
  }

  return (
    <div className='Footer'>
        <div className='FooterContent'>
          <h2>Saraca Palace Dubrovnik</h2>
          <Line height="2px" width="100%" color="#fff"/>
          <p className='FooterText'>{t('footer.apartments')} <br/><a className='FooterContactLink' target='_blank' href='https://goo.gl/maps/KgrcGsKiqZJt71z36'>Stari grad, Pobijana ul. 1, 20000, Dubrovnik</a><br/>{t('footer.phone')} <a className='FooterContactLink' href='tel: +971547111642'>+971 54 711 1642</a> <br/> Email: <a className='FooterContactLink' href = "mailto: booking@saraca-palace.com">booking@saraca-palace.com</a></p>
          <Line height="2px" width="100%" color="#fff"/>
          <div className='FooterIcons'>
            <a href = "mailto: booking@saraca-palace.com" target='_blank'><FontAwesomeIcon icon="envelope" className='FooterIcon'/></a>
            <a href='https://www.facebook.com/SaracaPalaceDubrovnikApartments' target='_blank'><FontAwesomeIcon icon={['fab', 'facebook']} className='FooterIcon'/></a>
            <a href='https://www.instagram.com/saracapalacedubrovnik/' target='_blank'><FontAwesomeIcon icon={['fab', 'instagram']} className='FooterIcon'/></a>
          </div>
          <p className='FooterCopyright'>&copy; {new Date().getFullYear()} | Saraca Palace Dubrovnik</p>
        </div>   
    </div>
  )
}

export default Footer
