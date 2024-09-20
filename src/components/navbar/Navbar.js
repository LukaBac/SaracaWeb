import './Navbar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState} from 'react';
import { LanguageContext } from '../../index';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const { language, setLanguage } = useContext(LanguageContext);
    const menuSocials = document.getElementById('socialsDropdown');
    const menuSocialsActive = document.getElementById('socialsDropdown2');

    var scrollDistance = 40;

    const handleScroll = () => {
      const navbarElement = document.getElementById('Navbar');
      const wrapper = document.getElementById('wrapper');
      const menuLinks = document.getElementById('NavbarLinks');

      if(window.scrollY <= scrollDistance){
        navbarElement.classList.add('active');
        if(menuLinks.classList.contains('is-active')){
          wrapper.classList.add('activeWrapper');
        }
        else if(menuSocials != null){
          menuSocials.classList.remove('menuSocialActive');
        }
      }
      else{
        navbarElement.classList.remove('active');
        if(wrapper.classList.contains('activeWrapper')){
          wrapper.classList.remove('activeWrapper');
        }
        else if(menuSocialsActive != null){
          menuSocialsActive.classList.remove('menuSocialActive');
        }
      }

      if(navbarElement.classList.contains('active')){
        document.body.classList.add('activeBody')
      }
      else if(!navbarElement.classList.contains('active') && document.body.classList.contains('activeBody')){
        document.body.classList.remove('activeBody')
      }

    }

    const handleResize = () => {
      const width = window.innerWidth;
      const menuSocials = document.getElementById('socialsDropdown');
      const menuSocialsActive = document.getElementById('socialsDropdown2');
      const wrapper = document.getElementById('wrapper');
      const menuLinks = document.getElementById('NavbarLinks');

      if(window.innerWidth < 650 || scrollDistance === 40){
        scrollDistance = 10;
      }

      else if(window.innerWidth > 650 || scrollDistance === 10){
        scrollDistance = 40;
      }

      /**PROVJERA ZA SOCIALS DROPDOWN AKTIVNI**/
      if(menuSocialsActive.classList.contains('menuSocialActive') && width > 1060){
        menuSocialsActive.classList.remove('menuSocialActive');
      }

      /**PROVJERA ZA NAVBAR DROPDOWN AKTIVNI**/
      else if(wrapper.classList.contains('activeWrapper') && width > 650 ){
        wrapper.classList.remove('activeWrapper');
        menuLinks.classList.remove('is-active');
      }


      /**PROVJERA ZA SOCIALS DROPDOWN NEAKTIVNI**/
      else if(menuSocials.classList.contains('menuSocialActive') && width > 1060){
        menuSocials.classList.remove('menuSocialActive');
      }

      /**PROVJERA ZA NAVBAR DROPDOWN NE AKTIVNI**/
      else if(menuLinks.classList.contains('is-active') && width > 840){
        menuLinks.classList.remove('is-active');
      }
    }

    const hideNavbar = () => {
      const menuLinks = document.getElementById('NavbarLinks');
      const wrapper = document.getElementById('wrapper');

      if(menuLinks.classList.contains('is-active')){
        menuLinks.classList.remove('is-active');
      }

      if(wrapper.classList.contains('activeWrapper')){
        wrapper.classList.remove('activeWrapper');
      }
    }

    useEffect(() => {
      if(window.innerWidth < 650){
        scrollDistance = 10;
      }
      else if(window.innerWidth > 650){
        scrollDistance = 40;
      }
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
    }, []);

    const handleLanguageChange = (event) => {
      const newLanguage = event.target.value;
      setLanguage(newLanguage);
      i18n.changeLanguage(newLanguage);
    };     

    const navbarShow = () =>{
      const navbarElement = document.getElementById('Navbar');
      const windowWidth = window.innerWidth; 

      const menuSocialsActive = document.getElementById('socialsDropdown2');
      const menuSocials = document.getElementById('socialsDropdown');
      const menuLinks = document.getElementById('NavbarLinks');
      const wrapper = document.getElementById('wrapper');

      if(navbarElement.classList.contains('active') && windowWidth > 650){
        menuSocialsActive.classList.toggle('menuSocialActive');
      }
      else if(!navbarElement.classList.contains('active') && windowWidth > 840){
        menuSocials.classList.toggle('menuSocialActive');
      }

      else if(navbarElement.classList.contains('active') && windowWidth < 650){
        wrapper.classList.toggle('activeWrapper');
        menuLinks.classList.toggle('is-active');
      }
      else{
        menuLinks.classList.toggle('is-active');
      }
    }

    const openBooking = () => {
      window.open("https://saraca-palace.book.rentl.io/", "_blank")
    }

    return (
        <div className='Navbar active' id='Navbar'>
            <div className='NavbarAddon'>
    
              <div className='LanguageSelector1'>
                <select className="selectBox" value={language} onChange={handleLanguageChange}>
                    <option className="optionsMenu" value="en">
                        Eng
                    </option>
                    <option className="optionsMenu" value="hr">
                        Hrv
                    </option>
                </select>
              </div>
    
              <div className='NavbarLogo1'>
                    <Link className='LinkNoColor' to={""}><p>SARACA<br></br>PALACE<br></br>DUBROVNIK</p></Link>
              </div>
              
              
              <div className='NavbarContact'>
                <div className='NavbarContactItem'>
                  <a href='tel: +971547111642' className='NavbarContactIconLinks'><FontAwesomeIcon icon="phone"/></a>
                  <a href='tel: +971547111642' className='NavbarContactLinks'><p>+971 54 711 1642</p></a>
                </div>
                <div className='NavbarContactItem'>
                  <a href='mailto: booking@saraca-palace.com' className='NavbarContactIconLinks'><FontAwesomeIcon icon="envelope"/></a>
                  <a href='mailto: booking@saraca-palace.com' className='NavbarContactLinks'><p>booking@saraca-palace.com</p></a>
                </div>
              </div>
            </div>

            <FontAwesomeIcon icon="bars" className='bar2' onClick={navbarShow}/>
            <div className='' id='socialsDropdown2'>
                <div>
                <div className='NavbarContactItem'>
                  <a href='tel: +971547111642' className='NavbarContactIconLinks'><FontAwesomeIcon icon="phone"/></a>
                  <a href='tel: +971547111642' className='NavbarContactLinks'><p>+971 54 711 1642</p></a>
                </div>
                <div className='NavbarContactItem'>
                  <a href='mailto: booking@saraca-palace.com' className='NavbarContactIconLinks'><FontAwesomeIcon icon="envelope"/></a>
                  <a href='mailto: booking@saraca-palace.com' className='NavbarContactLinks'><p>booking@saraca-palace.com</p></a>
                </div>
                </div>
                <div id='ingFejs'>
                  <a href='https://www.facebook.com/SaracaPalaceDubrovnikApartments' target='_blank' className="NavbarMediaLink"><FontAwesomeIcon icon={['fab', 'facebook']} className='NavbarSocialMediaIcons'/></a>
                  <a href='https://www.instagram.com/saracapalacedubrovnik/' target='_blank' className="NavbarMediaLink"><FontAwesomeIcon icon={['fab', 'instagram']} className='NavbarSocialMediaIcons'/></a>
                </div>
            </div>
            
            <div className='NavbarWrapper' id='wrapper'>
              <div className='NavbarLogo'>
                <Link className='LinkNoColor' to={""}><p>SARACA<br></br>PALACE<br></br>DUBROVNIK</p></Link>
              </div>
              <div className='NavbarLinksWrapper' id='NavbarLinks'>
                  <Link onClick={hideNavbar} className='NavbarLink' to={"/"} ><p>{t('navbar.home')}</p></Link>
                  <Link onClick={hideNavbar} className='NavbarLink' to={"/apartments"}><p>{t('navbar.apartments')}</p></Link>
                  <Link onClick={hideNavbar} className='NavbarLink' to={"/gallery"}><p>{t('navbar.gallery')}</p></Link>
                  <Link onClick={hideNavbar} className='NavbarLink' to={"/activities"}><p>{t('navbar.activities')}</p></Link>
                  <Link onClick={hideNavbar} className='NavbarLink' to={"/testimonials"}><p>{t('navbar.testimonials')}</p></Link>
                  <Link onClick={hideNavbar} className='NavbarLink' to={"/contact"}><p>{t('navbar.contact')}</p></Link>

                  <div className='activeSocials'>
                    <a href='https://www.facebook.com/SaracaPalaceDubrovnikApartments' target='_blank' className="NavbarMediaLink"><FontAwesomeIcon icon={['fab', 'facebook']} className='NavbarSocialMediaIcons'/></a>
                    <a href='https://www.instagram.com/saracapalacedubrovnik/' target='_blank' className="NavbarMediaLink"><FontAwesomeIcon icon={['fab', 'instagram']} className='NavbarSocialMediaIcons'/></a>
                  </div>
              </div>
    
              <div id='navbarSocials'>
                <a href='https://www.facebook.com/SaracaPalaceDubrovnikApartments' target='_blank' className="NavbarMediaLink"><FontAwesomeIcon icon={['fab', 'facebook']} className='NavbarSocialMediaIcons'/></a>
                <a href='https://www.instagram.com/saracapalacedubrovnik/' target='_blank' className="NavbarMediaLink"><FontAwesomeIcon icon={['fab', 'instagram']} className='NavbarSocialMediaIcons'/></a>
              </div>
    
              <button onClick={openBooking} className='ReservationBtn'>{t('reservationBTN')}</button>

    
              <div className='LanguageSelector'>
                <select className="selectBox" value={language} onChange={handleLanguageChange}>
                    <option className="optionsMenu" value="en">
                        Eng
                    </option>
                    <option className="optionsMenu" value="hr">
                        Hrv
                    </option>
                </select>
              </div>

              <FontAwesomeIcon icon="bars" className='bar' onClick={navbarShow}/>
              <div className='' id='socialsDropdown'>
                <div>
                <div className='NavbarContactItem'>
                  <a href='tel: +971547111642' className='NavbarContactIconLinks'><FontAwesomeIcon icon="phone"/></a>
                  <a href='tel: +971547111642' className='NavbarContactLinks'><p>+971 54 711 1642</p></a>
                </div>
                <div className='NavbarContactItem'>
                  <a href='mailto: booking@saraca-palace.com' className='NavbarContactIconLinks'><FontAwesomeIcon icon="envelope"/></a>
                  <a href='mailto: booking@saraca-palace.com' className='NavbarContactLinks'><p>booking@saraca-palace.com</p></a>
                </div>
                </div>
                <div id='ingFejs'>
                  <a href='https://www.facebook.com/SaracaPalaceDubrovnikApartments' target='_blank' className="NavbarMediaLink"><FontAwesomeIcon icon={['fab', 'facebook']} className='NavbarSocialMediaIcons'/></a>
                  <a href='https://www.instagram.com/saracapalacedubrovnik/' target='_blank' className="NavbarMediaLink"><FontAwesomeIcon icon={['fab', 'instagram']} className='NavbarSocialMediaIcons'/></a>
                </div>
              </div>
    
            </div>
        </div>
      )
}

export default Navbar
