import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CategoryList from '../CategoryList/CategoryList'
import Main from '../Main/Main'
import ProfileRouter from '../ProfileRouter/ProfileRouter'
import s from './RouterComponent.module.css'

const RouterComponent = () => {

    return (
        <div className={s.router}>
            <Switch>
                <Route path='/profile' render={() => <ProfileRouter />} />
                <Route path='/category/all' render={() => <CategoryList isAll/>} />
                <Route path='/category/:name' render={(match) => <CategoryList param={match.match.params} />} />
                <Route path='/404' render={()=> <div>404</div>} />
                <Route path='/' render={() => <Main />} />
            </Switch>
        </div>
    )

}

export default RouterComponent