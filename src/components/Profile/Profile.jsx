import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import s from './Profile.module.css'
import ProfilePhoto from './../../assets/profilePhoto.png'
import { Field, Form, Formik } from 'formik'
import InputComponent from '../Authentification/InputComponent'

const Profile = ({ profile, isAuth, ...props }) => {
    debugger
    return (
        <>
            {!isAuth && <Redirect to='/' />}
            <h2 className={s.profile__header}>Мои Данные</h2>
            <div className={s.profile__info}>
                <div className={s.profile__photo}><img src={ProfilePhoto} alt="Profile" /></div>
                <div>
                    <div>{profile.name} {profile.surname} {profile.thirdname && profile.thirdname}</div>
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
                    email: profile.email,
                    phoneNumber: profile.phoneNumber,
                    sex: profile.sex
                }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }}

            >
                {({ isSubmitting }) => (
                    <Form className={s.profile__form}>
                        <div className={s.profile__nameForm}>
                            <div className={s.profile__name} >
                                <p>Имя</p>
                                <Field name='name' type='text' placeholder='Имя' component={InputComponent} />
                            </div>
                            <div className={s.profile__name} >
                                <p>Фамилия</p>
                                <Field name='surname' type='text' placeholder='Фамилия' component={InputComponent} />
                            </div>
                            <div className={s.profile__name} >
                                <p>Отчество</p>
                                <Field name='thirdname' type='text' placeholder='Отчество' component={InputComponent} />
                            </div>
                        </div>
                        <label>
                            <Field type="radio" name="sex" value="m" />
                            Мужской
                            <Field type="radio" name="sex" value="j" />
                            Женский
                        </label>
                        <button>Сохранить</button>
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

export default connect(mStP, {})(Profile)