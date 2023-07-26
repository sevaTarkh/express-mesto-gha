import React, { useEffect, useState } from 'react';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import InfoTooltip from './InfoTooltip.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import auth from '../utils/Auth.js';
import '../index.css'


function App() {
   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
   const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
   const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
   const [isRegistrateSuccess, setRegistrateSuccess] = useState(false);
   const [selectedCard, setSelectedCard] = useState(null)
   const [currentUser, setCurrentUser] = useState({});
   const [cards, setCards] = useState([]);
   const [token, setToken] = useState('');
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [email, setEmail] = useState('')
   const [userData, setUserData] = useState({
      email: '',
      password: ''
   })

   const navigate = useNavigate();

   useEffect(() => {
      if(isLoggedIn){
      Promise.all([api.getUserInformationFromServer(), api.getInitialCards()])
      .then(([data, cards]) =>{
         setCurrentUser(data)
         setCards(cards)
      })
      .catch((err)=>{
         console.log(err)
      })
      }
   }, [isLoggedIn])

   useEffect(() => {
      const token = localStorage.getItem("token");
      setToken(token);
      if (token) {
         auth.checkToken(token)
         .then((data) => {
            if(isLoggedIn){
               setUserData(data)
               setEmail(data.data.email)
               setIsLoggedIn(true);
               navigate("/");
            }
         })
         .catch((err) => {
            console.log(err);
         })  
      }
   }, []);
   
   function registerUser(data) {
      auth.register(data)
      .then((data)=>{
         localStorage.setItem('token', data.token)
         setToken(data.token)
         setRegistrateSuccess(true)
         setIsInfoTooltipOpen(true)
         navigate("/sign-in", {replace: true})
      })
      .catch((err)=>{
         console.log(err)
         setRegistrateSuccess(false)
         setIsInfoTooltipOpen(true)
      })
   }
   function loginUser(data) {
      auth.login(data)
      .then((res)=>{
         setIsLoggedIn(true);
         localStorage.setItem('token', res.token)
         setToken(res.token)
         setEmail(data.email)
         navigate("/", {replace: true})
         console.log('вы успешно вошли', email)
      })
      .catch((err)=>{
         console.log(err)
      })
   }
   const logeedOut = () => {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setToken("");
      setUserData({
        username: "",
        email: "",
      });
      navigate("/sign-in");
    };

   function handleEditAvatarClick () {
      setIsEditAvatarPopupOpen(true)
   }
   function handleEditProfileClick  () { 
      setIsEditProfilePopupOpen(true)
   }
   function handleAddPlaceClick () { 
      setIsAddPlacePopupOpen(true)
   }
   function handleCardClick (card) { 
      setSelectedCard(card)
   }

   function closeAllPopups(){
      setIsEditAvatarPopupOpen(false)
      setIsEditProfilePopupOpen(false)
      setIsAddPlacePopupOpen(false)
      setIsInfoTooltipOpen(false)
      setSelectedCard(null)
   }

   function handleCardLike(card) {
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      (!isLiked ? api.handlePutLike(card._id) : api.handleRemoveLike(card._id))
      .then((newCard) => {
          setCards((state) => 
          state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err)=>{
         console.log(err);
      })
   };

   function handleDeleteCardClick(card){
      api.deleteCard(card._id)
      .then(()=>{
         setCards((state) => 
         state.filter((cards) => cards._id !== card._id))
      })
      .catch((err)=>{
         console.log(err)
      })
   };

   function handleUpdateUser(data){
      api.editProfileInformation(data)
         .then((res)=>{
            setCurrentUser(res)
            closeAllPopups()
         })
         .catch((err)=>{
            console.log(err)
         })
   };

   function handleUpdateAvatar(data){
      api.editProfileAvatar(data)
         .then((res)=>{
            setCurrentUser(res)
            closeAllPopups()
         })
         .catch((err)=>{
            console.log(err)
         })
   };
   function handleAddPlaceSubmit(data){
      api.createCardForServer(data)
         .then((newCard)=>{
            setCards([newCard, ...cards]);
            closeAllPopups()
         })
         .catch((err)=>{
            console.log(err)
         })
   }

  return (
   <CurrentUserContext.Provider value={currentUser}>
   <div className='body'>
      <div className="page">
         <Header
            loggedIn={isLoggedIn}
            loggedOut={logeedOut}
            email={email}
         />
         <Routes>
            <Route path='/sign-up' element={<Register registerUser={registerUser}/>}/>
            <Route path='/sign-in' element={<Login loginUser={loginUser}/>}/>
            <Route path='/' element={
               <ProtectedRoute
                  element={Main}
                  loggedIn={isLoggedIn}
                  onEditAvatar={handleEditAvatarClick} 
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteCardClick}
               />}
            />
            <Route element={isLoggedIn ? <Navigate to='/'/>: <Navigate to='sign-in'/>}/>
         </Routes>
         <Footer/>

         <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}
         />
         <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} 
         />
         <AddPlacePopup 
            isOpen={isAddPlacePopupOpen} 
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} 
         />
         <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
         />
         <InfoTooltip
            isOpen={isInfoTooltipOpen}
            isSuccess={isRegistrateSuccess}
            onClose={closeAllPopups}
         />
      </div>
   </div>
   </CurrentUserContext.Provider>
  );
}

export default App;
