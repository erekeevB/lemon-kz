import React, { useEffect, useState } from 'react'
import { CloseIcon } from '../../assets/Icons'
import s from './SignInWarning.module.css'

const SignInWarning = ({state, setState, text}) => {

    let [timeoutID, setTimeoutID] = useState(null)

    useEffect(()=>{
        if(state){
            setTimeoutID(setTimeout(()=>{
                setState(bool=>{
                    if(bool){
                        return false
                    }
                })
            }, 3000))
        }
    }, [state])

    return (
        <>
        {state && 
            <div className={s.auth_warning}>
                <button 
                    onClick={()=>{
                        clearTimeout(timeoutID)
                        setState(false)
                    }} 
                    className={s.auth_warning__close}><CloseIcon />
                </button>
                <div>Sign In to {text}</div>
            </div>
        }
        </>
    )

}

export default SignInWarning