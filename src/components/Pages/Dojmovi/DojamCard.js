import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Aos from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css';


const DojamCard = ({data, side, isAosEnabled}) => {


    useEffect(() => {
        const item = document.getElementById("aosRemoveItem");
        item.classList.remove("aos-animate");
      }, [])

  return (
    <div className='DojamCard' id='aosRemoveItem' data-aos = {isAosEnabled ? `zoom-in-${side}` : ''} data-aos-duration="800" data-aos-anchor-placement="bottom-bottom">
        <FontAwesomeIcon icon={"quote-left"} size="2x"/>
        <h3 className='red'>{data.naslov}</h3>
        <p className='DojamText'>{data.tekst}</p>
        <p className='date'>{data.datum}</p>
        <p className='DojamName'>{data.ime}</p>
    </div>
  )
}

export default DojamCard
