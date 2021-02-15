import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'
import Profile from './Profile/Profile'
import ProfileFavourites from './ProfileFavourites/ProfileFavourites'
import s from './ProfileRouter.module.css'

const ProfileRouter = ({isAuth}) => {
    return (
        <>
        {!isAuth && <Redirect to='/' />}
        <div className={s.profile__wrapper}>
            <nav className={s.profile__nav}>
                <div>
                    <NavLink activeClassName={s.profile__nav__active} exact to='/profile'>Profile</NavLink>
                    <NavLink activeClassName={s.profile__nav__active} to='/profile/favorites'>Favourites</NavLink>
                </div>
            </nav>
            <div className={s.profile__container}>
                <Switch>
                    <Route path='/profile' exact render={()=><Profile />} />
                    <Route path='/profile/favorites' exact render={()=><ProfileFavourites />} />
                    <Redirect to='/404' />
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