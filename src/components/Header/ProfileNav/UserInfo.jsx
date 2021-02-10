import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import s from './ProfileNav.module.css';
import {client} from '../../../index';
import { setAuth } from '../../../redux/authReducer';

let UserInfo = ({setProfileNav, setLogin, isAuth, profile, setAuth}) => {

    const logout = () => {

        localStorage.removeItem('token')
        client.clearStore()
        setAuth({}, 0)

    }

    return (

        <div className={s.profileNav__userInfo} >
            {!isAuth ?
                <>
                    <button onClick={() => {
                        setLogin(1)
                        setProfileNav(false)
                        document.body.style.overflow = 'hidden'
                    }}>Sign in</button>
                    <button onClick={() => {
                        setLogin(2)
                        setProfileNav(false)
                        document.body.style.overflow = 'hidden'
                    }}>Sign up</button>
                </> :
                <>
                    <Link onClick={()=>{setProfileNav(false)}} to='/admin'>Admin Page</Link>
                    <Link onClick={()=>{setProfileNav(false)}} to='/profile'>My Profile</Link>
                    <button
                        onClick={() => {
                            logout()
                            setProfileNav(false)
                    }}>Logout</button>
                </>}
        </div>
    )
}
const mStP = (state) => {

    return {
        isAuth: state.auth.isAuth,
        profile: state.auth.profile,
    }

}

export default connect(mStP, {setAuth})(UserInfo)