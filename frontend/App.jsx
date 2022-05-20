import React from 'react';

import Header from './components/global/Header'
import Login from './components/global/Login'
import {isLoggedIn} from './helpers/loginHelper';

class App extends React.Component {
    state = {
        loggedIn: "waiting"
    }



    async componentDidMount(){
        this.setState({loggedIn: await isLoggedIn()})
    }

    render() {
         return <div className="md:container md:mx-auto">
            <div className="object-center">
                <Header />

                <Login loggedIn={this.state.loggedIn}></Login>

        </div>

         </div>
    }
}

export default App;