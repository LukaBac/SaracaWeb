import { useTranslation } from 'react-i18next';
import './BookingBtn.css';

const BookingBtn = () => {

    const onClick = () => {
        window.open("https://saraca-palace.book.rentl.io", "_blank");
    }

    const { t }= useTranslation();

  return (
    <button onClick={onClick} className='CardReservationBtn'>{t('reservationBTN')}</button>
  )
}

export default BookingBtn
