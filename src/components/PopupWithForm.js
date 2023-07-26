import React from 'react'
import close from "../images/CloseIcon.png"


function PopupWithForm(props){
   return(      
      <div className ={`popup popup_type_${props.name} ${props.isOpen ? "popup_is-opened" : ""}`}>
         <div className='popup__overlay'></div>
         <div className="popup__container">
            <button className={`popup__button-close popup__button-close_theme_${props.name}`} type="button" onClick={props.onClose}>
               <img src={close} alt="фото кнопки" className="popup__close-image"/>
            </button>
            <form className={`popup__form popup__form_theme_${props.name} `} name={`form-${props.name}`} onSubmit={props.onSubmit}>
               <h2 className="popup__title">{props.title}</h2>
               <div className="popup__edit">
                  {props.children}
               </div>
               <button className={`popup__button-submit popup__button-submit_theme_${props.name}`} type="submit" >{props.buttonText}</button>
            </form>
         </div>
      </div>        
    )
}

export default PopupWithForm;