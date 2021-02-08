import { Field, Form, Formik } from 'formik';
import React from 'react';
import { CloseIcon } from '../../assets/Icons';
import s from './Authentication.module.css';
import InputComponent from '../InputComponent/InputComponent';



const Login = ({ closeAuth, loading, error, login }) => {

    if(loading){
        return <div>Loading...</div>
    } 

    return (

        <Formik
            initialValues={{ username: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.username) {
                    errors.username = 'Required!';
                }

                if (!values.password) {
                    errors.password = 'Required!';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                login({variables: {...values}})
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className={s.authentication__form}>
                    <div className={s.form__heading}>
                        <div className={s.form__name}>Login</div>
                        <div className={s.form__close} onClick={() => closeAuth(0, 'unset')}><CloseIcon /></div>
                    </div>

                    <div className={s.form__body}>

                        <div className={s.form__names}>
                            <Field placeholder='Username' type="text" name="username" component={InputComponent} />
                        </div>
                        <div className={s.form__names}>
                            <Field placeholder='Пароль' type="password" name="password" component={InputComponent} />
                        </div>

                    </div>

                    <div><button className={s.form__submit} type="submit" disabled={isSubmitting}>
                        Login
                        </button></div>
                    <div className={s.form__redirect} onClick={(e) => {
                        e.preventDefault()
                        closeAuth(2, 'hidden')
                    }}>Don't have an account? Register
                    </div>
                </Form>
            )}
        </Formik>

    )

}

export default Login;