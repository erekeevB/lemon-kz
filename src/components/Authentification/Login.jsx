import { Field, Form, Formik } from 'formik';
import React from 'react';
import { CloseIcon } from '../../assets/Icons';
import s from './Authentication.module.css';
import InputComponent from '../InputComponent/InputComponent';

const Login = ({loginUserThunk, closeAuth, error}) => {

    return (

        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Заполните это поле';
                } 
                else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Заполните это поле';
                }

                if (!values.password) {
                    errors.password = 'Заполните это поле';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                loginUserThunk(values)
                setSubmitting(false);
                closeAuth(0, 'unset')
            }}
        >
            {({ isSubmitting }) => (
                <Form className={s.authentication__form}>
                    <div className={s.form__heading}>
                        <div className={s.form__name}>Вход</div>
                        <div className={s.form__close} onClick={()=>closeAuth(0, 'unset')}><CloseIcon /></div>
                    </div>

                    <div className={s.form__body}>

                        <div className={s.form__names}>
                            <Field placeholder='E-Mail' type="email" name="email" component={InputComponent}/>
                        </div>
                        <div className={s.form__names}>
                            <Field placeholder='Пароль' type="password" name="password" component={InputComponent}/>
                        </div>

                        {error && <p className={s.error}>{error}</p>}

                    </div>

                    <div><button className={s.form__submit} type="submit" disabled={isSubmitting}>
                        Войти
                        </button></div>
                    <div className={s.form__redirect} onClick={(e)=>{
                            e.preventDefault()
                            closeAuth(2, 'hidden')
                            }}>Создать аккаунт
                    </div>
                </Form>
            )}
        </Formik>

    )

}

export default Login;