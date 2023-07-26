import React, {useEffect, Suspense} from 'react';

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
    Switch,
    Link, useLocation, useParams, useNavigate
} from "react-router-dom";
import Societies from "./components/getInvolved/Societies";
import Sports from "./components/getInvolved/Sports";
import Committees from "./components/getInvolved/Committees";
import EditSSC from "./components/getInvolved/EditSSC";
import SSC from "./components/getInvolved/SSC";
import Homepage from "./components/static/Homepage";
import Error from "./components/static/Error";
import Finance from "./components/static/Finance"
import RolesPage from "./components/democracy/RolesPage";
import Role from "./components/democracy/Role";
import Elections from './components/democracy/Elections';
import WhosWho from "./components/static/WhosWho";
import Footer from "./components/global/Footer";
import JBs from "./components/static/JBs";
import Contact from "./components/static/Contact";
import Photos from "./components/static/Photos";
import PostAdmin from "./components/students/PostAdmin";
import WeeklyEmail from "./components/static/WeeklyEmail";
import ViewPost from "./components/static/ViewPost";
// import PayLevy from "./components/students/PayLevy";
// import Account from "./components/students/Account";
import MCRHomepage from "./components/MCR/MCRHomepage";
import MCRWhosWho from "./components/MCR/MCRWhosWho";
import MCRNews from "./components/MCR/MCRNews";
import ResetPassword from "./components/global/ResetPassword";
import Loading from "./components/global/Loading";
import CalendarEdit from "./components/admin/CalendarEdit";
import Cookies from "./components/static/Cookies";
import CookiesModal from "./components/static/CookiesModal";
import Feedback from "./components/static/Feedback";
import FreshersHomepage from "./components/freshers/FreshersHomepage";
import FreshersFAQ from "./components/freshers/FreshersFAQ";
import FreshersSchedule from "./components/freshers/FreshersSchedule";
const Calendar = React.lazy(() => import("./components/static/Calendar"));
class App extends React.Component {
    state = {
        loggedIn: "waiting",
        verified: "waiting",
        admin: "waiting",
        freshers: "waiting"
    }



    async componentDidMount(){
        const ns = await isLoggedIn()
        await this.setState({admin:ns.admin, verified: ns.verified, loggedIn: ns.username, freshers: ns.freshers});
        console.log(ns)
    }

    render() {
         return <Router>
             <div className="md:container md:mx-auto">
                 <div className="object-center">
                     <CookiesModal/>
                     <Routes>
                         <Route path="/mcr/*" element={<Header admin={this.state.admin} verified ={this.state.verified} mcr={true} freshers={this.state.freshers} />}/>
                         <Route path="/*" element={<Header admin={this.state.admin} verified ={this.state.verified} mcr={false} freshers={this.state.freshers}/>}/>
                     </Routes>

                     <Login loggedIn={this.state.loggedIn} verified ={this.state.verified}/>

                     <div className="min-h-screen">
                         <Routes>
                             <Route path="/admin" element={<Admin admin={this.state.admin} />}/>
                             <Route path="/students" element={<Students verified={this.state.verified}/>}>
                                 <Route path="events" element={<UserEvents/>}/>
                                 <Route path="events/book:id" element={<BookEvent/>}/>
                                 <Route path="edit-posts" element={<PostAdmin/>}/>
                             </Route>
                             <Route path="get-involved/societies" element={<Societies username={this.state.loggedIn}/>}/>
                             <Route path="get-involved/societies/edit/:id" element={<EditSSC/>}/>
                             <Route path="get-involved/societies/:id" element={<SSC/>}/>
                             <Route path="get-involved/sports" element={<Sports username={this.state.loggedIn}/>}/>
                             <Route path="get-involved/sports/edit/:id" element={<EditSSC/>}/>
                             <Route path="get-involved/sports/:id" element={<SSC/>}/>
                             <Route path="get-involved/committees" element={<Committees username={this.state.loggedIn}/>}/>
                             <Route path="get-involved/committees/edit/:id" element={<EditSSC/>}/>
                             <Route path="get-involved/committees/:id" element={<SSC/>}/>
                             <Route path="get-involved/ssc/:id" element={<SSC/>}/>
                             <Route path="/" element={<Homepage/>} />
                             <Route path="finance" element={<Finance/>}/>
                             <Route path="roles" element={<RolesPage/>}/>
                             <Route path="roles/:id" element={<Role/>}/>
                             <Route path="elections/:id" element={<Elections/>}/>
                             <Route path="elections/" element={<Elections/>}/>
                             <Route path="oh-no" element={<Error/>}/>
                             <Route path="whos-who" element={<WhosWho/>}/>
                             <Route path="jbs" element={<JBs/>}/>
                             <Route path="contact" element={<Contact/>}/>
                             <Route path="photos" element={<div><Photos/></div>}/>
                             <Route path="weekly-email" element={<div><WeeklyEmail/></div>}/>
                             <Route path="photos/:id" element={<Photos/>}/>
                             <Route path="posts/:id" element={<ViewPost/>}/>
                             {/*<Route path="pay" element={<PayLevy username={this.state.loggedIn}/>}/>*/}
                             {/*<Route path="account" element={<Account username={this.state.loggedIn}/>}/>*/}
                             <Route path="mcr" element={<MCRHomepage/>}/>
                             <Route path="mcr/whos-who" element={<MCRWhosWho/>}/>
                             <Route path="mcr/news" element={<MCRNews/>}/>
                             <Route path="mcr/posts/:id" element={<ViewPost/>}/>
                             <Route path="reset-password/:id" element={<ResetPassword/>}/>
                             <Route path="calendar" element={<Suspense fallback={<Loading/>}><Calendar admin={this.state.admin}/></Suspense>}/>
                             <Route path="calendar/edit" element={<CalendarEdit admin={this.state.admin}/>}/>
                             <Route path="cookies" element={<Cookies/>}/>
                             <Route path="feedback" element={<Feedback/>}/>
                             <Route path="freshers" element={<FreshersHomepage/>}/>
                             <Route path="freshers/faq" element={<FreshersFAQ admin={this.state.admin}/>}/>
                             <Route path="freshers/schedule" element={<FreshersSchedule/>}/>

                         </Routes>
                     </div>
                     <Footer/>

                 </div>

             </div>
         </Router>
    }
}

export default App;
// export default function(props) {
//     let location = useLocation;
//     // let mcr = window.location.pathname.startsWith("/mcr")
//     // useEffect(() => {
//     //     mcr = window.location.pathname.startsWith("/mcr")
//     // }, [location]);
//     return <App {...props} loc={location} mcr={false}/>;
// }