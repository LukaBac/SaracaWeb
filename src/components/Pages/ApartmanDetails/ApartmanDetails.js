import './ApartmanDetails.css';
import { Link } from 'react-router-dom';
import gardenImage from '../../../img/Apartment2.jpg';
import cathedralImage from '../../../img/Ap51-9-min.jpg';

import Data from './Data.js';
import { useTranslation } from 'react-i18next';


const ApartmanDetails = () => {

  const { t } = useTranslation();

  var id=window.location.hash.split("/");
  var naslov = "";
  var mainImage;
  if(id[2] === "garden-view"){
    naslov = "Garden View";
    mainImage = gardenImage;
  }
  else if(id[2] === "cathedral-view"){
    naslov="Cathedral View";
    mainImage = cathedralImage;
  }

  
  return (
    <div className='ApartmanDetailsSection'>
      <div className='DetailsSection'>
      <p className='navLinks' style={{margin: '0'}}><Link to={"/"} className='navLinks'>{t('navbar.home')}</Link> {">"} <Link to={"/apartments"} className='navLinks'>{t('navbar.apartments')}</Link> {">"} <Link to={"/apartmani"} className='navLinks'>{id[2]}</Link></p>
        <h1 className='red'>{naslov}</h1>
        <div className='Details'>
        <Link className='DetailsImage' to={"/gallery/" + id[2]}><div className='DetailsImage' style={{backgroundImage: "url(" + mainImage + ")"}}></div></Link>
          <Data ApartmanID={id[2]}/>
        </div>
      </div>

    </div>
  )
}

export default ApartmanDetails
