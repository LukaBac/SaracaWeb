import './Galerija.css';

const ImageModal = ({image, setImage}) => {

    const handleClick = (e) => {
        if(e.target.classList.contains("dismiss")){
            setImage(null);
            const body = document.getElementById('body');
            body.style.overflowY = "auto";
        }
    }

  return (
    <div className='overlay dismiss' onClick={handleClick}>
      <img src={image}></img>
      <span className='dismiss'>X</span>
    </div>
  )
}

export default ImageModal
