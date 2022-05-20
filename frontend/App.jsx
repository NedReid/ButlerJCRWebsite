import React from 'react';

import Header from './components/global/Header'
import Login from './components/global/Login'
import {isLoggedIn} from './helpers/loginHelper';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

class App extends React.Component {
    state = {
        loggedIn: "waiting",
        admin:
    }



    async componentDidMount(){
        this.setState({loggedIn: await isLoggedIn()})
    }

    render() {
         return <Router>
             <div className="md:container md:mx-auto">
                 <div className="object-center">
                     <Header />
                     <Routes>
                         <Route path="/" element={<Login loggedIn={this.state.loggedIn}></Login>}/>

                     </Routes>

                 </div>

             </div>
         </Router>
    }
}

export default App;