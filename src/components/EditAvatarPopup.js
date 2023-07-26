import React from 'react'
import PopupWithForm from './PopupWithForm.js';


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}){
    const ref = React.useRef();
    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
            linkavatar: ref.current.value
        });
    }
    
    return(
        <PopupWithForm 
            name="avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input 
                name='link-avatar' 
                className="popup__field popup__field_theme_avatar-link" 
                id="linkavatar" 
                placeholder="Ссылка на картинку" 
                required 
                type="url"
                ref={ref}
            />
            <span 
                className="popup__input-error" 
                id="linkavatar-error">
            </span>
        </PopupWithForm>
    )
}


export default EditAvatarPopup;