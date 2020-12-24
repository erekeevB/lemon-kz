import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Main from '../Main/Main'
import ProfileRouter from '../ProfileRouter/ProfileRouter'
import s from './RouterComponent.module.css'

const RouterComponent = () => {

    return (
        <div className={s.router}>
            <Switch>
                <Route path='/profile' render={() => <ProfileRouter />} />
                <Route path='/' render={() => <Main />} />
            </Switch>
        </div>
    )

}

export default RouterComponent