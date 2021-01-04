import React, { useState } from 'react'
import { GlobeIcon } from '../../assets/Icons'
import s from './Header.module.css'
import Authentication from '../Authentification/Authentication'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutThunk } from '../../redux/authReducer'

const Header = function({isAuth, logoutThunk, ...props}){

    let [isLogin, setLogin] = useState(0)
    let [isLangWindow, setLangWindow] = useState(0)

    return (
        <>
            <header className={s.header__wrapper}>

                <div className={s.header}>
                    <Link to='/' className={s.header__header}>Lemon.kz</Link>
                    <div className={s.header__right}>
                        <button onClick={()=>setLangWindow(true)}><GlobeIcon /></button>
                        <Link to='/cart'>My Cart</Link>
                        <div>
                            {!isAuth ? 
                            <button onClick={()=>{
                                setLogin(1)
                                document.body.style.overflow = 'hidden'
                                }}>Sign In</button>
                            :
                            <div>
                                <Link to='/profile'>My Account</Link>
                                <button onClick={logoutThunk}>Sign Out</button>
                            </div>
                            }
                        </div>
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