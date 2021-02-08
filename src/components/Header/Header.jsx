import React, { useState } from 'react'
import { CartIcon, GlobeIcon } from '../../assets/Icons'
import s from './Header.module.css'
import Authentication from '../Authorization/Authentication'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutThunk } from '../../redux/authReducer'

const Header = function({isAuth, logoutThunk, cartQty, cartLength}){
    let [isLogin, setLogin] = useState(0)
    let [isLangWindow, setLangWindow] = useState(0)

    return (
        <>
            <header className={s.header__wrapper}>

                <div className={s.header}>
                    <Link to='/' className={s.header__header}>Lemon.kz</Link>
                    <div className={s.header__right}>
                        <button onClick={()=>setLangWindow(true)}><GlobeIcon /></button>
                        <Link className={s.header__cart} to='/cart'>
                            <CartIcon />
                            {cartQty ? <div className={s.header__cart__length}>{cartQty}</div> : null}
                        </Link>
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
                            </div>}
                        </div>
                    </div>
                </div>
            </header>
            {isLogin!==0 && <Authentication setLogin={setLogin} isLogin={isLogin} />}
        </>
    )

}

const mStP = (state) => ({

    isAuth: state.auth.isAuth,
    cartQty: state.auth.profile.cartQty,
    cartLength: state.cart.cart.length

})

export default connect(mStP, {logoutThunk})(Header)