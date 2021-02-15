import React from 'react'
import { Link, Redirect, Route, Switch } from 'react-router-dom'
import CartPage from '../Cart/CartPage'
import ItemListRouter from '../ItemList/ItemListRouter'
import ItemPage from '../Item/ItemPage'
import Main from '../Main/Main'
import ProfileRouter from '../ProfileRouter/ProfileRouter'
import s from './RouterComponent.module.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const RouterComponent = ({isInitialized}) => {

    return (
        <>
        <Header />
            <div className={s.router}>
                {isInitialized ? 
                    <>
                        
                        <Switch>
                            <Route path='/profile' render={() => <ProfileRouter />} />
                            <Route path='/items' exact render={(props) => <ItemListRouter search = {props.location.search} />} />
                            <Route path='/item/:id' exact render={(match) => <ItemPage id = {match.match.params.id} />} />
                            <Route path='/cart' exact render={() => <CartPage />} />
                            <Route path='/' exact render={() => <Main />} />
                            <Redirect to='/404' />
                        </Switch>
                    </> :
                    <div>Loading... APP</div>
                }
            </div>
        <Footer />
        </>
    )

}

export default RouterComponent