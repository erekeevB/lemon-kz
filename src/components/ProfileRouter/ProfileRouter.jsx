import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'
import Profile from './Profile/Profile'
import ProfileFavourites from './ProfileFavourites/ProfileFavourites'
import s from './ProfileRouter.module.css'

const ProfileRouter = ({isAuth, ...props}) => {
    return (
        <>
        {!isAuth && <Redirect to='/' />}
        <div className={s.profile__wrapper}>
            <nav className={s.profile__nav}>
                <div>
                    <NavLink activeClassName={s.profile__nav__active} exact to='/profile'>Мои данные</NavLink>
                    <NavLink activeClassName={s.profile__nav__active} to='/profile/favorites'>Избранные</NavLink>
                </div>
            </nav>
            <div className={s.profile__container}>
                <Switch>
                    <Route path='/profile' exact render={()=><Profile />} />
                    <Route path='/profile/favorites' render={()=><ProfileFavourites />} />
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