import React, {useState} from 'react';
import {Link} from 'react-router-dom';


const Register = ({registerUser}) =>{
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) =>{
        const input = e.target;
        setForm({
            ...form,
            [input.name]: input.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        registerUser(form)
    }
    return (
        <form className='register__form' onSubmit={handleSubmit}>
            <h2 className='register__title'>Регистрация</h2>
            <input
                className='popup__field popup__field_type_dark'
                placeholder='Email'
                id='email'
                required
                name='email'
                type='email'
                value={form.email}
                onChange={handleChange}
            />
            <input
                className='popup__field popup__field_type_dark'
                placeholder='Пароль'
                id='password'
                required
                name='password'
                type='password'
                value={form.password}
                onChange={handleChange}
            />
            <button type='submit' className='register__button'>Зарегистрироваться</button>
            <Link to='/sign-in' className='register__link'>Уже зарегистрированы? Войти</Link>
        </form>
    )
}


export default Register;