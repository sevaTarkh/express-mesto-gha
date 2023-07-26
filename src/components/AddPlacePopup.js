import React from 'react'
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}){
    const [foroName, setFotoName] = React.useState('');
    const [fotoLink, setFotoLink] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            fotoname: foroName,
            link: fotoLink
        });
    }
    function handleFotoAdd(e) {
        setFotoName(e.target.value);
    }

    function handleLinkAdd(e) {
        setFotoLink(e.target.value);
    }

    return(
        <PopupWithForm 
            name="add"
            title="Новое место"
            buttonText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input 
                type="text" 
                name='name-foto' 
                className="popup__field popup__field_theme_name-foto" 
                id="fotoname" 
                placeholder="Название" 
                required 
                minLength="2" 
                maxLength="30"
                value={foroName}
                onChange={handleFotoAdd}
            />
            <span 
                className="popup__input-error" 
                id="name-foto-error"
            />
            <input 
                name='link' 
                className="popup__field popup__field_theme_link" 
                id="link" 
                placeholder="Ссылка на картинку" 
                required 
                type="url"
                value={fotoLink}
                onChange={handleLinkAdd}
            />
            <span 
                className="popup__input-error" 
                id="link-error"
            />
        </PopupWithForm>
    )
}


export default AddPlacePopup;