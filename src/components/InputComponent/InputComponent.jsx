import { getIn } from 'formik';
import React from 'react';
import s from './InputComponent.module.css'

const InputComponent = ({field, form: {errors, touched}, ...props}) => {
    return (

        <div className={s.input__wrapper}>
            <input 
                className={s.input__body} 
                {...field}
                {...props}
            />
            <span 
                className={
                    getIn(errors, field.name) && getIn(touched, field.name) ? 
                    s.input__filler + ' ' + s.input__error : 
                    s.input__filler}
            ></span>
        </div>

    )

}

export default InputComponent