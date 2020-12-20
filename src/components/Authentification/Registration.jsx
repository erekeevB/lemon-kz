import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { CloseIcon } from '../../assets/Icons';
import s from './Authentication.module.css';
import InputComponent from '../InputComponent/InputComponent';

const Registration = ({registerUserThunk, closeAuth, error}) => {

    return (

        <Formik
            initialValues={{ name: '', surname: '', email: '', password: '', password2: '' }}
            validate={values => {
                const errors = {};if (!values.email) {
                    errors.email = 'Заполните поле';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Неправильный формат E-Mail!';
                }

                if (!values.password) {
                    errors.password = 'Заполните поле';
                }

                if (values.password !== values.password2 || !values.password2){
                    errors.password2 = 'Пароли не совпадают';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                registerUserThunk(values)
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
                            <Field type="surname" name="surname" placeholder='Фамилия' component={InputComponent}/>
                            <Field type="name" name="name" placeholder='Имя' component={InputComponent}/>
                        </div>
                        <div className={s.form__names}>
                            <Field type="email" name="email" placeholder='Email' component={InputComponent}/>
                        </div>
                        <div className={s.form__names}>
                            <Field type="password" name="password" placeholder='Пароль' component={InputComponent}/>
                        </div>
                        <div className={s.form__names}>
                            <Field type="password" name="password2" placeholder='Подтвердите Пароль' 
                                component={InputComponent}/>
                        </div>
                        <ErrorMessage name='password2' component='div' />

                        {error && <p className={s.error}>{error}</p>}

                    </div>

                    <div><button className={s.form__submit} type="submit" disabled={isSubmitting}>
                        Создать Аккаунт
                        </button></div>
                    <div className={s.form__redirect} onClick={(e)=>{
                            e.preventDefault()
                            closeAuth(1, 'hidden')
                            }}>Войти
                    </div>
                </Form>
            )}
        </Formik>

    )

}

export default Registration;