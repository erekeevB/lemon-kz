import React, { useEffect } from 'react';
import Login from './Login';
import Registration from './Registration';
import { registerUserThunk, loginUserThunk, setError } from '../../redux/authReducer';
import s from './Authentication.module.css'
import { connect } from 'react-redux';

const Authentication = ({ setLogin, isLogin, isAuth, ...props }) => {

    const closeAuth = (num, string) => {

        document.body.style.overflow = string;
        setLogin(num);
        props.setError('');

    }

    useEffect(() => {

        if (isAuth) {

            closeAuth(0, 'unset')

        }

    }, [isAuth])

    return (

        <div className={s.authentication}>

            {isLogin === 1 ?

                <Login
                    closeAuth={closeAuth}
                    error={props.error}
                    loginUserThunk={props.loginUserThunk}
                /> :
                <Registration
                    closeAuth={closeAuth}
                    error={props.error}
                    registerUserThunk={props.registerUserThunk}
                />

            }

        </div>

    )

}

const mStP = (state) => {

    return {

        error: state.auth.error,
        isAuth: state.auth.isAuth

    }

}

export default connect(mStP, { loginUserThunk, registerUserThunk, setError })(Authentication);