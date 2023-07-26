import React, {useState} from 'react';


const Login = ({loginUser}) =>{
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
        loginUser(form)
    }
    return (
        <form className='login__form' onSubmit={handleSubmit}>
            <h2 className='login__title'>Вход</h2>
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
            <button type='submit' className='login__button'>Войти</button>
        </form>
    )
}


export default Login;