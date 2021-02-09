import React, { useEffect } from 'react';
import Login from './Login';
import Registration from './Registration';
import { setAuth } from '../../redux/authReducer';
import s from './Authentication.module.css'
import { connect } from 'react-redux';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../GRAPHQL/auth';



const Authorization = ({ setLogin, isLogin, setAuth, isAuth, ...props }) => {

    const [login, { loading, error }] = useMutation(LOGIN, {
        onCompleted: data=>{
            if(data?.tokenAuth){
                localStorage.setItem("token", data.tokenAuth.token)
                setAuth(data.tokenAuth.user, 1)
                closeAuth(0, 'unset')
            }
        }
    })

    const closeAuth = (num, string) => {

        document.body.style.overflow = string;
        setLogin(num);

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
export default connect(mStP, { setAuth })(Authorization);