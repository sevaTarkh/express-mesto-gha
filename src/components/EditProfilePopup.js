import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser}){
    const [profileName, setProfileName] = React.useState('');
    const [profileDescription, setProfileDescription] = React.useState('');

    const currentUser = React.useContext(CurrentUserContext);

    
    React.useEffect(() => {
        if(isOpen){
            setProfileName(currentUser.name);
            setProfileDescription(currentUser.about);
        }
        }, [currentUser, isOpen]
    )

    function handleNameChange(e) {
        setProfileName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setProfileDescription(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
          name: profileName,
          theme: profileDescription
        });
    }
    return(
        <PopupWithForm 
            name="edit"
            title="Редактировать профиль"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input 
                type="text" 
                name='name-author' 
                className="popup__field popup__field_theme_name" 
                id="name" 
                placeholder="username" 
                required 
                minLength="2" 
                maxLength="40"
                value={profileName}
                onChange={handleNameChange}
            />
            <span 
                className="popup__input-error" 
                id="name-error"
            />
            <input 
                type="text" 
                name='about-author' 
                className="popup__field popup__field_theme_about" 
                id="theme" 
                placeholder="aboutme" 
                required 
                minLength="2" 
                maxLength="200"
                value={profileDescription}
                onChange={handleDescriptionChange}
            />
            <span 
                className="popup__input-error" 
                id="theme-error"
            />
        </PopupWithForm>
    ) 
}




export default EditProfilePopup