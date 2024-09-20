import { useEffect } from 'react';
import './ImageDiv.css';


const ImageDiv = ({image}) => {

  useEffect(() => {
    
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
    if(isSafari){
      const image = document.getElementById("ImageDiv");

      image.style.backgroundAttachment = "scroll";
      image.style.backgroundPosition = "50% 70%";
    }

  }, [])

  return (
    <div id='ImageDiv' className='ImageDiv' style={{backgroundImage: "url(" + image + ")"}}></div>
  )
}

export default ImageDiv