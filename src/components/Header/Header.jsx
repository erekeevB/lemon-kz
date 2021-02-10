import React, { useEffect, useState } from 'react'
import { CartIcon, GlobeIcon, UserIcon } from '../../assets/Icons'
import s from './Header.module.css'
import Authentication from '../Authorization/Authentication'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import SignInWarning from '../SignInWarning/SignInWarning'
import ProfileNav from './ProfileNav/ProfileNav'

const Header = function({isAuth, cartQty}){
    let [isLangWindow, setLangWindow] = useState(0)

    const [isCartAndNotAuth, setIsCartAndNotAuth] = useState(false)

    let history = useHistory()

    const handleCartButton = () => {

        if(isAuth){
            history.push('/cart')
        }else{
            setIsCartAndNotAuth(true)
        }

    }

    return (
        <>
            <SignInWarning
                state={isCartAndNotAuth}
                setState={setIsCartAndNotAuth}
                text={'access the Cart!'}
            />
            <header className={s.header__wrapper}>

                <div className={s.header}>
                    <Link to='/' className={s.header__header}>Lemon.kz</Link>
                    <div className={s.header__right}>
                        <button onClick={()=>setLangWindow(true)}><GlobeIcon /></button>
                        <button className={s.header__cart} onClick={handleCartButton}>
                            <CartIcon />
                            {cartQty ? <div className={s.header__cart__length}>{cartQty}</div> : null}
                        </button>
                        <ProfileNav />
                    </div>
                </div>
            </header>
        </>
    )

}

const mStP = (state) => ({

    isAuth: state.auth.isAuth,
    cartQty: state.auth.profile.cartQty

})

export default connect(mStP, {})(Header)