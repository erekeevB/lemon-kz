import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import RouterComponent from './components/RouterComponent/RouterComponent';
import { GET_ME } from './GRAPHQL/auth';
import { setAuth } from './redux/authReducer';

function App({setAuth}) {

    let [isInitialized, setIsInitialized] = useState(false)

    useQuery(GET_ME, {
        onCompleted: data=>{
            if(data.user){
                setAuth(data.user, 1)
                setIsInitialized(true)
            }
        },
        onError: err=>{
            debugger
            console.log(err.message)
        }
    })

    return (
        <div className="App">
            <Header />
            <RouterComponent isInitialized={isInitialized} />
            <Footer />
        </div>
    );
}

export default connect(null, {setAuth})(App);
