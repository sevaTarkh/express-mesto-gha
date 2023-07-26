import close from "../images/CloseIcon.png"
import React from 'react';

function ImagePopup({card, onClose}){
   return(
      <div className={`popup popup_type_foto ${card ? 'popup_is-opened' : ''}`}>
         <div className='popup__overlay popup__overlay_theme_foto'></div>
         <div className="popup__container-foto">
            <button className="popup__button-close popup__button-close_theme_foto" type="button">
               <img src={close} alt="фото кнопки" className="popup__close-image" onClick={onClose}/>
            </button>
            <img className="popup__foto" alt={card?.name} src={card?.link}/>
            <h3 className="popup__foto-title">{card?.name}</h3>
         </div>
      </div>
   )
}

export default ImagePopup