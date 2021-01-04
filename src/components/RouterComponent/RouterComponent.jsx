import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CartPage from '../Cart/CartPage'
import CategoryListRouter from '../CategoryList/CategoryListRouter'
import ItemPage from '../Item/ItemPage'
import Main from '../Main/Main'
import ProfileRouter from '../ProfileRouter/ProfileRouter'
import s from './RouterComponent.module.css'

const RouterComponent = () => {

    return (
        <div className={s.router}>
            <Switch>
                <Route path='/profile' render={() => <ProfileRouter />} />
                <Route path='/category/all' render={() => <CategoryListRouter isAll/>} />
                <Route 
                    path='/category/:name' 
                    render={(match) => <CategoryListRouter param={match.match.params.name} />} 
                />
                <Route path='/item/:id' render={(match) => <ItemPage id={match.match.params.id}/>} />
                <Route path='/cart' render={() => <CartPage />} />
                <Route path='/404' render={()=> <div>404</div>} />
                <Route path='/' render={() => <Main />} />
            </Switch>
        </div>
    )

}

export default RouterComponent