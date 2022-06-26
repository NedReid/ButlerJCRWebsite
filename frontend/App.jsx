import React from 'react';

import Header from './components/global/Header';
import Login from './components/global/Login';
import Admin from './components/admin/Admin';
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
        verified: "waiting",
        admin: "waiting",
    }



    async componentDidMount(){
        const ns = await isLoggedIn()
        this.setState({admin:ns.admin, verified: ns.verified, loggedIn: ns.username});
        console.log(ns)
    }

    render() {
         return <Router>
             <div className="md:container md:mx-auto">
                 <div className="object-center">
                     <Header admin={this.state.admin} />
                     <Login loggedIn={this.state.loggedIn}/>
                     <Routes>
                         <Route path="/admin" element={<Admin admin={this.state.admin} />}/>
                         <Route path="/members" element={<Members admin={this.state.verified} />}/>

                     </Routes>

                 </div>

             </div>
         </Router>
    }
}

export default App;