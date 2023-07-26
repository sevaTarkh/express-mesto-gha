import close from "../images/CloseIcon.png"
import accept from '../images/accept.svg'
import wrong from '../images/wrong.svg'

function InfoTooltip(props){
    return(
        <div className ={`popup ${props.isOpen ? "popup_is-opened" : ""}`}>
         <div className="popup__container">
            <button className='popup__button-close' type="button" onClick={props.onClose}>
               <img src={close} alt="фото кнопки" className="popup__close-image"/>
            </button>
            <div className='popup__block'>
                <img className="popup__image" src={props.isSuccess ? accept : wrong}/>
                <h2 className="popup__tool-title">
                    {props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h2>
            </div>
         </div>
        </div>
    )
}

export default InfoTooltip;