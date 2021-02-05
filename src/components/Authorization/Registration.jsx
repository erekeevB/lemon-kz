import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { CloseIcon } from '../../assets/Icons';
import s from './Authentication.module.css';
import InputComponent from '../InputComponent/InputComponent';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../gqlAPI/auth';

const Registration = ({closeAuth, login}) => {

    let [error, setError] = useState()

    const [register, {loading}] = useMutation(REGISTER, {
        onError: errors=>{
            setError(errors.message)
        },
        onCompleted: data=>{
            if(data.errors){
                setError(data.errors)
            }
        }
    })

    return (

        <Formik
            initialValues={{ username: '', email: '', password1: '', password2: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Wrong format for E-Mail!';
                }

                if(!values.username){
                    errors.username = "Required!"
                }

                if (!values.password1 || values.password1.length < 8) {
                    errors.password1 = 'Password must contain at least 8 characters!';
                }

                if (values.password1 !== values.password2 || !values.password2){
                    errors.password2 = 'Passwords do not match!';
                }
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) =>  {
                setSubmitting(true);
                await register({variables: {...values}})
                await login({variables: {username: values.username, password: values.password2}})
                setSubmitting(false)
            }}
        >
            {({ isSubmitting }) => (
                <Form className={s.authentication__form}>
                    <div className={s.form__heading}>
                        <div className={s.form__name}>Регистрация</div>
                        <div className={s.form__close} onClick={()=>closeAuth(0, 'unset')}><CloseIcon /></div>
                    </div>

                    <div className={s.form__body}>
                        <div className={s.form__names}>
                            <Field type="email" name="email" placeholder='Email' component={InputComponent}/>
                        </div>
                        <div className={s.form__names}>
                            <Field type="text" name="username" placeholder='Username' component={InputComponent}/>
                        </div>
                        <div className={s.form__names}>
                            <Field type="password" name="password1" placeholder='Password' component={InputComponent}/>
                        </div>
                        <div className={s.form__names}>
                            <Field type="password" name="password2" placeholder='Password' 
                                component={InputComponent}/>
                        </div>
                        <ErrorMessage name='password2' component='div' />
                        {error && <div>{error}</div>}
                    </div>

                    <div><button className={s.form__submit} type="submit" disabled={isSubmitting}>
                        Создать Аккаунт
                        </button></div>
                    <div className={s.form__redirect} onClick={(e)=>{
                            e.preventDefault()
                            }}>Войти
                    </div>
                </Form>
            )}
        </Formik>

    )

}

export default Registration;