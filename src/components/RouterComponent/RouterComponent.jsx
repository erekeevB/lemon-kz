import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Main from '../Main/Main'
import ProfileRouter from '../Profile/ProfileRouter'
import s from './RouterComponent.module.css'

const RouterComponent = () => {

    return (
        <div className={s.router}>
            <Switch>
                <Route path='/' exact render={() => <Main />} />
                <Route path='/profile' render={() => <ProfileRouter />} />
            </Switch>
        </div>
    )

}

export default RouterComponent