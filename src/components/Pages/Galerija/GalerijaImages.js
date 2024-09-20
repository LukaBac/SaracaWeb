import './Galerija.css';

import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const GalerijaImages = ({handleClick, path}) => {

    function importAll(r) {
        return r.keys().map(r);
      }
      
      var images;
      if(path === "galerijaPalace"){
        images = importAll(require.context(`../../../../public/img/galleryPalace`, false, /\.(png|jpe?g|svg)$/));
      }
      else if(path === "galerijaGarden"){
        images = importAll(require.context(`../../../../public/img/galleryGarden`, false, /\.(png|jpe?g|svg)$/));
      }
      else{
        images = importAll(require.context(`../../../../public/img/galleryAll`, false, /\.(png|jpe?g|svg)$/));
      }
      
      var column1 = [];
      var column2 = [];
    
      for (let i = 0; i < images.length; i++) {
        if(i%2===0){
          column1.push(images[i]);
        }
        else{
          column2.push(images[i]);
        }
      } 

      const handleLoad = () => {
        Aos.refresh();
      }

      useEffect(() => {
        Aos.refresh();
      }, [])
      
    return (
      <div className='galerijaImages'>
        <div className='column'>
            {column1.map((image) => (
            <img title='Apartment Image' width={"auto"} height={"auto"} alt='Apartment Image' onLoad={handleLoad} loading='lazy' data-aos="fade-up" id='gallImg' className='' data-aos-anchor-placement="top-bottom" src={image}  onClick={() => handleClick(image)}></img>
            ))}
        </div>
        <div className='column'>
            {column2.map((image) => (
            <img alt='Apartment Image' width={"auto"} height={"auto"} onLoad={handleLoad} loading='lazy' data-aos="fade-up" id='gallImg' className='' data-aos-anchor-placement="top-bottom" src={image}  onClick={() => handleClick(image)}></img>
            ))} 
        </div>
    </div>
    )
}

export default GalerijaImages
