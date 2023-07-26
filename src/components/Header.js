import logo from '../images/logo.svg'
import React from 'react';
import {Link, useLocation} from 'react-router-dom';



function Header({loggedIn, loggedOut, email}){
    const location = useLocation();
    return(
        <header className="header">
            <img className="header__logo" alt="фото логотипа" src={logo}/>
            {loggedIn &&
                (
                    <div className='header__nav'>
                        <div className='header__email'>{email}</div>
                        <button className='header__button' onClick={loggedOut}>Выйти</button>
                    </div>
                )
            }
            {!loggedIn &&
                (
                    <nav>
                        {location.pathname === '/sign-in' &&
                            (
                                <Link to='/sign-up' className='header__link'>Регистрация</Link>
                            )
                        }
                        {location.pathname === '/sign-up' &&
                            (
                                <Link to='/sign-in' className='header__link'>Войти</Link>
                            )                                                    
                        }
                    </nav>
                )
            }
        </header>
    )
}

export default Header;