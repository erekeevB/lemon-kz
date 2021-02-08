import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import s from './Profile.module.css'
import ProfilePhoto from './../../../assets/profilePhoto.png'
import { Field, Form, Formik } from 'formik'
import InputComponent from '../../InputComponent/InputComponent';
import { editProfileThunk, setAuth } from '../../../redux/authReducer'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../../GRAPHQL/auth'

const Profile = ({ profile, isAuth, editProfileThunk, setAuth, ...props }) => {

    const [updateUser] = useMutation(UPDATE_USER, {
        onCompleted: data=>{
            debugger
            if(data?.updateUser.user){

                setAuth(data.updateUser.user, 1)
            }
        },
        onError: err=>{
            debugger
            console.log(err.message)
        }
    })

    return (
        <>
            {!isAuth && <Redirect to='/' />}
            <h2 className={s.profile__header}>My Account</h2>
            <div className={s.profile__info}>
                <div className={s.profile__photo}><img src={ProfilePhoto} alt="Profile" /></div>
                <div>
                    <div className={s.profile__name}>{profile.firstName} {profile.lastName}</div>
                    <div>Username: {profile.username}</div>
                    {profile.isStaff &&
                        <div>
                            Role: Admin
                        </div>
                    }
                </div>
            </div>
            <Formik
                initialValues={{
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    phoneNumber: profile.phoneNumber,
                    sex: profile.sex
                }}
                validate={values => {
                    const errors = {};
                    if (!values.firstName) {
                        errors.firstName = 'Required';
                    }
                    if (!values.lastName) {
                        errors.lastName = 'Required';
                    }
                    // if (!values.sex) {
                    //     errors.sex = 'Required';
                    // }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    debugger
                    setSubmitting(true);
                    updateUser({variables: {...values}})
                    setSubmitting(false);
                }}

            >
                {({ isSubmitting, values, errors, touched }) => (
                    <Form className={s.profile__form}>
                        <div className={s.profile__nameForm}>
                            <div className={s.profile__nameForm__header} >
                                <p>First Name</p>
                                <Field 
                                    name='firstName' 
                                    type='text' 
                                    placeholder='First Name' 
                                    component={InputComponent} 
                                />
                            </div>
                            <div className={s.profile__nameForm__header} >
                                <p>Last Name</p>
                                <Field 
                                    name='lastName' 
                                    type='text' 
                                    placeholder='Last Name'
                                    component={InputComponent} 
                                />
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
                                    Man
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
                                    Woman
                                </label>
                            </div>
                        </div>
                        <div className={s.profile__button}>
                            <button className={s.profile__buttonButton} type="submit">Save</button>
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

export default connect(mStP, { editProfileThunk, setAuth })(Profile)