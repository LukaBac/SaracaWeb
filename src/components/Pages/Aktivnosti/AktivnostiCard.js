import React, { useEffect } from 'react'

import Aos, { refresh } from 'aos';
import 'aos/dist/aos.css';

const AktivnostiCard = ({naslov, text, image}) => {

  // useEffect(() => {
  //   Aos.refresh();
  //   const item = document.getElementById("aosRemove");
  //   item.classList.remove("aos-animate");
  // }, [])

  const refreshAos = () => {
    Aos.refresh();
  }

  return (
    <div onLoad={refreshAos} className='aktivnostiCard' data-aos="fade-up" data-aos-anchor-placement="top-bottom"  id='aosRemove'>
        <h2>{naslov}</h2>
        <p>{text}</p>
        <img alt='Activity Image' title='Activity Image' loading='lazy' width={"auto"} height={"auto"} src={image}></img>
    </div>
  )
}

export default AktivnostiCard
