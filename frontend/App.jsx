import React from 'react';

import Header from './components/global/Header';
import Login from './components/global/Login';
import Admin from './components/admin/Admin';
import Students from './components/students/Students';
import UserEvents from './components/students/UserEvents';
import BookEvent from "./components/students/BookEvent";
import {isLoggedIn} from './helpers/loginHelper';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Societies from "./components/getInvolved/Societies";
import Sports from "./components/getInvolved/Sports";
import Committees from "./components/getInvolved/Committees";
import EditSSC from "./components/getInvolved/EditSSC";
import SSC from "./components/getInvolved/SSC";
import Homepage from "./components/static/Homepage";
// import PageEditor from "./components/global/PageEditor";
import Finance from "./components/static/Finance"

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
                     <Header admin={this.state.admin} verified ={this.state.verified} />
                     <Login loggedIn={this.state.loggedIn} verified ={this.state.verified}/>
                     <Routes>
                         <Route path="/admin" element={<Admin admin={this.state.admin} />}/>
                         <Route path="/students" element={<Students verified={this.state.verified}/>}>
                             <Route path="events" element={<UserEvents/>}/>
                             <Route path="events/book:id" element={<BookEvent/>}/>
                         </Route>
                         <Route path="get-involved/societies" element={<Societies username={this.state.loggedIn}/>}/>
                         <Route path="get-involved/societies/edit:id" element={<EditSSC/>}/>
                         <Route path="get-involved/societies/:id" element={<SSC/>}/>
                         <Route path="get-involved/sports" element={<Sports username={this.state.loggedIn}/>}/>
                         <Route path="get-involved/sports/edit:id" element={<EditSSC/>}/>
                         <Route path="get-involved/sports/:id" element={<SSC/>}/>
                         <Route path="get-involved/committees" element={<Committees username={this.state.loggedIn}/>}/>
                         <Route path="get-involved/committees/edit:id" element={<EditSSC/>}/>
                         <Route path="get-involved/committees/:id" element={<SSC/>}/>
                         <Route path="get-involved/ssc/:id" element={<SSC/>}/>
                         <Route path="/" element={<Homepage/>} />
                         <Route path="finance" element={<Finance/>}/>

                     </Routes>

                 </div>

             </div>
         </Router>
    }
}

export default App;