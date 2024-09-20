import React from 'react'
import { useTranslation } from 'react-i18next'
import BookingBtn from '../../BookingButton/BookingBtn';
import { Helmet } from 'react-helmet';

const Data = ({ApartmanID}) => {

  const { t } = useTranslation();

  if(ApartmanID === "cathedral-view"){
    return (
      <div className='ApartmanData'>
        <Helmet >
          <title>Saraca Palace Dubrovnik | Cathedral View Apartment</title>
          <meta name="description" content="Cathedral View Dubrovnik - a stunning apartment with a view of the local cathedral"/>
        </Helmet>


        <p style={{marginBottom: '0.5rem'}}><span className='bold'>{t('CathedralView.opis')}</span></p>
        <p id='opis'>{t('CathedralView.opisText')}</p>

        <p><span className='bold'>{t('CathedralView.velicina')}</span> 75m2</p>
        <p><span className='bold'>{t('CathedralView.kreveti')}</span>{t('CathedralView.krevetiText')}</p>
        <p><span className='bold'>{t('CathedralView.dodatno')}</span>{t('CathedralView.dodatnoText')}</p>
        <p><span className='bold'>{t('CathedralView.sadrzaji')}</span>{t('CathedralView.sadrzajiText')}</p>

        <p className='bold'>{t('CathedralView.informacije')}</p>
        <ul>
          <li>{t('CathedralView.checkIn')}</li>
          <li>{t('CathedralView.checkOut')}</li>
          <li>{t('CathedralView.nocenja')}</li>
        </ul>
        <p className='ApartmanPrice'>{t('CathedralView.cijena')}</p>
        <BookingBtn />
      </div>
    )
  }
  else if(ApartmanID === "garden-view"){
    return (
      <div className='ApartmanData'>
        <Helmet >
          <title>Saraca Palace Dubrovnik | Garden View Apartment</title>
          <meta name="description" content="Garden View Dubrovnik - a stunning apartment with a view of a colorful garden"/>
        </Helmet>


        <p style={{marginBottom: '0.5rem'}}><span className='bold'>{t('GardenView.opis')}</span></p>
        <p id='opis'>{t('GardenView.opisText')}</p>

        <p><span className='bold'>{t('GardenView.velicina')}</span> 33m2</p>
        <p><span className='bold'>{t('GardenView.kreveti')}</span>{t('GardenView.krevetiText')}</p>
        <p><span className='bold'>{t('GardenView.dodatno')}</span>{t('GardenView.dodatnoText')}</p>
        <p><span className='bold'>{t('GardenView.sadrzaji')}</span>{t('GardenView.sadrzajiText')}</p>
  
        <p className='bold'>{t('GardenView.informacije')}</p>
        <ul>
          <li>{t('GardenView.checkIn')}</li>
          <li>{t('GardenView.checkOut')}</li>
          <li>{t('GardenView.nocenja')}</li>
        </ul>
        <p className='ApartmanPrice'>{t('GardenView.cijena')}</p>
        <BookingBtn />
      </div>
    )
  }
}

export default Data
