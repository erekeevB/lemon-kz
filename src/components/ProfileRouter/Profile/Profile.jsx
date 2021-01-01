import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import s from './Profile.module.css'
import ProfilePhoto from './../../../assets/profilePhoto.png'
import { Field, Form, Formik } from 'formik'
import InputComponent from '../../InputComponent/InputComponent';
import { editProfileThunk } from '../../../redux/authReducer'

const Profile = ({ profile, isAuth, editProfileThunk, ...props }) => {
    return (
        <>
            {!isAuth && <Redirect to='/' />}
            <h2 className={s.profile__header}>Мои Данные</h2>
            <div className={s.profile__info}>
                <div className={s.profile__photo}><img src={ProfilePhoto} alt="Profile" /></div>
                <div>
                    <div className={s.profile__name}>{profile.name} {profile.surname} {profile.thirdname && profile.thirdname}</div>
                    <div>Email: {profile.email}</div>
                    {profile.role !== 'user' &&
                        <div>
                            Роль: {profile.role}
                        </div>
                    }
                </div>
            </div>
            <Formik
                initialValues={{
                    name: profile.name,
                    surname: profile.surname,
                    thirdname: profile.thirdname,
                    phoneNumber: profile.phoneNumber,
                    sex: profile.sex
                }}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Required';
                    }
                    if (!values.surname) {
                        errors.surname = 'Required';
                    }
                    if (!values.thirdname) {
                        errors.thirdname = 'Required';
                    }
                    if (!values.name) {
                        errors.name = 'Required';
                    }
                    if (!values.sex) {
                        errors.sex = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    debugger
                    setSubmitting(true);
                    editProfileThunk(values);
                    setSubmitting(false);
                }}

            >
                {({ isSubmitting, values, errors, touched }) => (
                    <Form className={s.profile__form}>
                        <div className={s.profile__nameForm}>
                            <div className={s.profile__nameForm__header} >
                                <p>Имя</p>
                                <Field name='name' type='text' placeholder='Имя' component={InputComponent} />
                            </div>
                            <div className={s.profile__nameForm__header} >
                                <p>Фамилия</p>
                                <Field name='surname' type='text' placeholder='Фамилия' component={InputComponent} />
                            </div>
                            <div className={s.profile__nameForm__header} >
                                <p>Отчество</p>
                                <Field name='thirdname' type='text' placeholder='Отчество' component={InputComponent} />
                            </div>
                        </div>
                        <div className={s.profile__radioWrapper__parent}>
                            <div className={s.profile__radioWrapper}>
                                <span 
                                    className={touched.sex && errors.sex ? 
                                        s.profile__radioFiller + ' ' + s.profile__radioFiller_error : 
                                        s.profile__radioFiller}
                                > </span>
                                <Field
                                    id='m'
                                    className={s.profile__radio}
                                    type="radio"
                                    name="sex"
                                    value="m"
                                    checked={values.sex === 'm'}
                                />
                                <label 
                                    className={s.profile__radioLabel + ' ' + s.profile__radioLabel_first} 
                                    htmlFor='m'
                                >
                                    Мужской
                                </label>
                                <Field
                                    id='j'
                                    className={s.profile__radio}
                                    type="radio"
                                    name="sex"
                                    value="j"
                                    checked={values.sex === 'j'}
                                />
                                <label className={s.profile__radioLabel} htmlFor='j'>
                                    Женский
                                </label>
                            </div>
                        </div>
                        <div className={s.profile__button}>
                            <button className={s.profile__buttonButton} type="submit">Сохранить</button>
                            <span className={s.profile__buttonFiller}></span>
                        </div>

                    </Form>
                )}
            </Formik>
        </>
    )

}

const mStP = (state) => ({

    isAuth: state.auth.isAuth,
    profile: state.auth.profile

})
export default connect(mStP, { editProfileThunk })(Profile)