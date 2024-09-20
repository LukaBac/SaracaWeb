import './Kontakt.css';
import ImageSlider from '../../ImageSlider/ImageSlider';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Line from '../../Misc/Line/Line';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

import emailjs from '@emailjs/browser';

import 'aos/dist/aos.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Kontakt = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');

  const { t } = useTranslation();

  const runToast = (text) => {
    toast.success(text);
  }

  const runToastError = (text) => {
    toast.error(text);
  }

  const sendEmail = (event) => {
    event.preventDefault();

    var templateParams = {
      "from_name": name,
      "message": subject,
      "to_name": "Saraca Palace",
      "reply_to": email,
    }
    emailjs.send('service_8pmj4ei', 'template_p1xnzdf', templateParams, process.env.REACT_APP_MAIL_APIKEY)
      .then((result) => {
          runToast("Message Sent.");
      }, (error) => {
          runToast("Error sending message.");
      });
  };

  const openBooking = () => {
    window.open("https://saraca-palace.book.rentl.io/", "_blank");
  }

  const openMaps = () => {
    window.open("https://goo.gl/maps/zfcUNKZZEpStFXxb7", "_blank");
  }

  return (
    <div className='KontaktSection'>
      <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="colored"
      />
        <Helmet >
          <title>Saraca Palace Dubrovnik | Contact</title>
          <meta name="description" content="Contact Us or book one of our apartments in old town Dubrovnik, Croatia"/>
        </Helmet>


        <ImageSlider height="75vh"/>
        <p className='navLink'><Link to={"/"} className='navLinks'>{t('navbar.home')}</Link> {">"} <Link to={"/kontakt"} className='navLinks'>{t('navbar.contact')}</Link></p>
        
        <h1 data-aos="fade-up" className='Naslov'>{t('contact.naslov')}</h1>
        <h2 data-aos="fade-up" className='Naslov2'>{t('contact.naslov2')} </h2>


        <div className='Location' data-aos="fade-up">
          <div className='LocationInfo'>
            <h2 className='red'>{t('contact.lokacija')}</h2>
            <p id='locationText'>{t('contact.lokacijaTekst')}</p>
            <div className='LocationInfoItem'>
              <FontAwesomeIcon icon={"location-dot"} size="2x" className='LocationIcon'/>
              <Line height={"50px"} width="2px" color={"#595959"}/>
              <p>Stari grad, Pobijana ul. 1, 20000, Dubrovnik</p>
            </div>
          </div>

          <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11405.676421816072!2d18.11077005131553!3d42.640752641193124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134c0b33b6cc93b1%3A0xa05bd011a9a6d8e7!2sSaraca%20Palace!5e0!3m2!1sen!2shr!4v1679829005132!5m2!1sen!2shr"
                width="800"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
          />
        </div>



        <div className='ContactSection' id='ContactGOTO'>
        <div className="contact__section">
          <div className="contact__info">
          <h2>{t('contact.kontaktNaslov')}</h2>
        <p className='HeadlineP'>{t('contact.kontaktP')}</p>

            <a className='Contact__Info__Item__Link' href='mailto: booking@saraca-palace.com'>
              <div className="contact__info__item">
                <FontAwesomeIcon icon={"envelope"} className="ContactIcon"/>
                <p>booking@saraca-palace.com</p>
              </div>
            </a>

            <span className='Contact__Info__Item__Link' onClick={openBooking}>
              <div className="contact__info__item">
                <FontAwesomeIcon icon="book" className="ContactIcon"/>
                <p>saraca-palace.book.rentl.io</p>
              </div>
            </span>

            <a className='Contact__Info__Item__Link' href='tel: +971547111642'>
              <div className="contact__info__item">
                <FontAwesomeIcon icon="phone" className="ContactIcon"/>
                <p>+971 54 711 1642</p>
              </div>
            </a>

            <span className='Contact__Info__Item__Link' onClick={openMaps}>
              <div className="contact__info__item">
                <FontAwesomeIcon icon="location-dot" className="ContactIcon"/>
                <p>Stari grad, Pobijana ul. 1, 20000, Dubrovnik</p>
              </div>
            </span>
          </div>   


          <form className="contact__form" onSubmit={sendEmail}>
                <div className="form_group">
                    <input type="text" id="name" name="name" onChange={event => setName(event.target.value)} required/>
                    <label htmlFor="name" className='label'>{t('contact.name')}</label>
                </div>

                <div className="form_group">
                    <input type="mail" id="mail" name="mail" onChange={event => setEmail(event.target.value)} required/>
                    <label htmlFor="mail" className='label'>E-Mail</label>
                </div>
                
                <div className="form_group" id="message_group">
                    <textarea name="subject" id="subject" onChange={event => setSubject(event.target.value)} style={{width: "600px"}} required/>
                    <label htmlFor="subject" id='messageLabel'>{t('contact.message')}</label>
                </div>
            <input type="submit" value={t('contact.send')} id="Send__Btn"/>
          </form>   
        </div>
    </div>


    </div>
  )
}

export default Kontakt
