import plus from '../images/add-button.svg';
import edit from '../images/edit-button.svg';
import React, {useContext} from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}){
   
   const currentUser = useContext(CurrentUserContext);

   return(
      <main className="content">
         <section className="profile">
            <button className="profile__button-avatar" type="button" onClick={onEditAvatar}>
               <img alt="фото портрет" src={currentUser.avatar} className="profile__avatar"/>
            </button>
            <div className="profile__info">
               <h1 className="profile__title">{currentUser.name}</h1>
               <button className="profile__button profile__button-edit"  type="button" onClick={onEditProfile}>
                  <img className="profile__edit-image" alt="фото карандаша" src={edit}/>
               </button>
               <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button className="profile__button profile__button-add" type="button" onClick={onAddPlace}>
               <img className="profile__add-image" alt="фото плюса" src={plus}/>
            </button>
         </section>
         <section className="elements">
            {
               cards.map((card)=>{
                  return(
                     <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
                  );
               })
            }
         </section>
      </main>
   )
}

export default Main; 