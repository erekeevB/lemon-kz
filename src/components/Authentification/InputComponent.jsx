import { getIn } from 'formik';
import React from 'react';
import s from './Authentication.module.css'

const InputComponent = ({field, form: {errors}, ...props}) => {

    return (

        <div className={s.form__input__wrapper}>
            <input 
                className={getIn(errors, field.name) ? s.form__input + ' ' + s.input_error : s.form__input} 
                {...field}
                {...props}
                />
                <span className={s.form__input__filler}></span>
        </div>

    )

}

export default InputComponent