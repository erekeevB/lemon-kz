import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CartPage from '../Cart/CartPage'
import ItemListRouter from '../ItemList/ItemListRouter'
import ItemPage from '../Item/ItemPage'
import Main from '../Main/Main'
import ProfileRouter from '../ProfileRouter/ProfileRouter'
import s from './RouterComponent.module.css'

const RouterComponent = ({isInitialized}) => {

    return (
        <div className={s.router}>
            {isInitialized ? 
            <Switch>
                <Route path='/profile' render={() => <ProfileRouter />} />
                <Route path='/items' render={(props) => <ItemListRouter search={props.location.search} />} />
                <Route path='/item/:id' render={(match) => <ItemPage id={match.match.params.id}/>} />
                <Route path='/cart' render={() => <CartPage />} />
                <Route path='/404' render={()=> <div>404</div>} />
                <Route path='/' render={() => <Main />} />
            </Switch> :
            <div>Loading... APP</div>
            }
        </div>
    )

}

export default RouterComponent