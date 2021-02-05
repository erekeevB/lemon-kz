import React, { useEffect } from 'react';
import Login from './Login';
import Registration from './Registration';
import { registerUserThunk, setError, setAuth } from '../../redux/authReducer';
import s from './Authentication.module.css'
import { connect } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import { LOGIN } from '../../gqlAPI/auth';



const Authorization = ({ setLogin, isLogin, setAuth, isAuth, ...props }) => {

    const [login, { loading, data, error }] = useMutation(LOGIN, {
        onCompleted: data=>{
            debugger
            if(data?.tokenAuth){
                localStorage.setItem("token", data.tokenAuth.token)
                setAuth(data.tokenAuth.user, 1)
                debugger
                console.log(localStorage.getItem("token"))
                closeAuth(0, 'unset')
            }
        },
        onError: error=>{
            console.log(error.message)
            debugger
        }
    })

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
                    setAuth={setAuth}
                    login = {login}
                    loading = {loading}
                    error = {error}
                /> :
                <Registration
                    closeAuth={closeAuth}
                    error={props.error}
                    setAuth={setAuth}
                    login = {login}
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
export default connect(mStP, { setAuth, registerUserThunk, setError })(Authorization);