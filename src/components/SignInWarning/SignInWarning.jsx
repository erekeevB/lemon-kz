import React, { useEffect } from 'react'
import { CloseIcon } from '../../assets/Icons'
import s from './SignInWarning.module.css'

const SignInWarning = ({state, setState, text}) => {

    useEffect(()=>{
        if(state){
            setTimeout(()=>{
                setState(bool=>{
                    if(bool){
                        return false
                    }
                })
            }, 1000)
        }
    }, [state])

    return (
        <>
        {state && 
            <div className={s.auth_warning}>
                <button 
                    onClick={()=>setState(false)} 
                    className={s.auth_warning__close}><CloseIcon />
                </button>
                <div>Sign In to {text}</div>
            </div>
        }
        </>
    )

}

export default SignInWarning