import React, { useState } from 'react'
import { UserIcon } from '../../assets/Icons'
import s from './Header.module.css'
import Authentication from '../Authentification/Authentication'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutThunk } from '../../redux/authReducer'

const Header = function({isAuth, logoutThunk, ...props}){

    let [isLogin, setLogin] = useState(0)

    return (
        <>
            <header className={s.preHeader}>
                <button>Регион</button>
                <button>Язык</button>
            </header>
            <header className={s.header__wrapper}>

                <div className={s.header}>
                    <div>Lemon.kz</div>
                    <div>
                        {!isAuth ? 
                        <button onClick={()=>{
                            setLogin(1)
                            document.body.style.overflow = 'hidden'
                            }}>Войти</button>
                        :
                        <div>
                            <Link to='/profile'>Мой Аккаунт</Link>
                            <button onClick={logoutThunk}>Выйти</button>
                        </div>
                        }
                    </div>
                </div>
            </header>
            {isLogin!==0 && <Authentication setLogin={setLogin} isLogin={isLogin} />}
        </>
    )

}

const mStP = (state) => ({

    isAuth: state.auth.isAuth

})

export default connect(mStP, {logoutThunk})(Header)