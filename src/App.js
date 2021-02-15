import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import RouterComponent from './components/RouterComponent/RouterComponent';
import { GET_ME } from './GRAPHQL/auth';
import { setAuth } from './redux/authReducer';

function App({setAuth}) {

    let [isInitialized, setIsInitialized] = useState(false)

    useQuery(GET_ME, {
        onCompleted: data=>{
            if(data.user){
                setAuth(data.user, 1)
            }
            setIsInitialized(true)
        },
        onError: err=>{
            setIsInitialized(true)
        }
    })

    return (
        <div className="App">
            <Switch>
                <Route path='/404' exact render={()=><div><Link to='/' >Go to main</Link> 404</div>} />
                <Route path='/' render={()=><RouterComponent isInitialized={isInitialized} />} />
            </Switch>
        </div>
    );
}

export default connect(null, {setAuth})(App);
