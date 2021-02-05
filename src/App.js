import { useQuery } from '@apollo/client';
import { connect } from 'react-redux';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import RouterComponent from './components/RouterComponent/RouterComponent';
import { GET_ME } from './gqlAPI/auth';
import { setAuth } from './redux/authReducer';

function App({setAuth}) {

    const {loading} = useQuery(GET_ME, {
        context: {
            headers: {
                "Authorization": "JWT " + localStorage.getItem("token")
            }
        },
        onCompleted: data=>{
            if(data.user){
                setAuth(data.user, 1)
            }
        },
        onError: err=>{
            debugger
            console.log(err.message)
        }
    })

    return (
        <div className="App">
            {loading ? <div>AAAA</div>:
            <>
                <Header />
                <RouterComponent />
                <Footer />
            </>
            }
        </div>
    );
}

export default connect(null, {setAuth})(App);
