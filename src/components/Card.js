import React, {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({card, onCardClick, onCardLike, onCardDelete}){
   const currentUser = useContext(CurrentUserContext);
   const isOwn = card.owner._id === currentUser._id;
   const isLiked = card.likes.some(i => i._id === currentUser._id);
   const cardLikeButtonClassName = ( 
      `element__button-like ${isLiked && 'element_is-active'}` 
    );

   function handleLikeClick(){
      onCardLike(card)
   }
   function handleClick() {
      onCardClick(card);
   }
   function handleDeleteClick(){
      onCardDelete(card)
   }
   return(
      <div className="element">
         {isOwn && <button className="element__button-delete" type="button" onClick={handleDeleteClick}/>}
         <div className="element__image-container">
            <img className="element__image" alt={card.name} src={card.link} onClick={handleClick}/>
         </div>
         <div className="element__info">
            <h3 className="element__title">{card.name}</h3>
            <div>
               <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
               <p className="element-likes">{card.likes.length}</p>
            </div>
         </div>
      </div>
    )
}

export default Card