import Home from"./Components/Home";
import Service from "./Components/Service";
import AboutUs from "./Components/AboutUs";
import BookAppointment from "./Components/BookAppointment";
import Header from "./Components/Header";
import Login from "./Components/Login"
import SalonFinder from "./Components/SalonFinder"
import ServiceGents from "./Components/ServiceGents";
import ServiceLadies from "./Components/ServiceLadies";
import Buttom_Section from "./Components/Buttom_Section";
import DetailsPage from "./Components/DetailsPage";
import registerSalon from "./Components/RegisterSalon";
import QuickSearchFilterPage from "./Components/QuickSearchFilterPage"
import {Route,BrowserRouter} from "react-router-dom";
import { Component } from "react";
import admin from "./Components/SalonAdminPage"


import "./Styles/Header.css"

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
            {/* <Header/> */}
            <Route exact path="/" component={Home}/>
            <Route path="/home" component={Home} />
            <Route path="/aboutus" component={AboutUs}/>
            {/* <Route path="/service" component={Service}/> */}
            <Route path="/bookappo" component={BookAppointment}/>
            <Route path="/login" component={Login}/>
            <Route path="/salonFinder" component={SalonFinder}/>
            <Route path="/service/gents" component={ServiceGents}/>
            <Route path="/service/ladies" component={ServiceLadies}/>
            <Route path="/details" component={DetailsPage}/>
            {/* <Buttom_Section/> */}
            <Route path="/quickSearchFilterPage" component={QuickSearchFilterPage}/>
            <Route path="/registerSalon" component={registerSalon}/> 
            <Route path="/salonAdmin" component={admin}/> 
            </BrowserRouter>
        )
    }
}
export default Router;