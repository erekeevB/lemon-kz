import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'
import Profile from './Profile'
import s from './Profile.module.css'

const ProfileRouter = ({isAuth, ...props}) => {
    debugger
    return (
        <>
        {!isAuth && <Redirect to='/' />}
        <div className={s.profile__wrapper}>
            <nav className={s.profile__nav}>
                <NavLink to='/profile'>Мои данные</NavLink>
                <NavLink to='/profile/favorites'>Избранные</NavLink>
            </nav>
            <div className={s.profile__container}>
                <Switch>
                    <Route path='/profile' exact render={()=><Profile />} />
                    <Route path='/profile/favorites' render={()=><div>A</div>} />
                </Switch>
            </div>
        </div>
        </>
    )

}

const mStP = (state) => ({

    isAuth: state.auth.isAuth

})

export default connect(mStP, {})(ProfileRouter)