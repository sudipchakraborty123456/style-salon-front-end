import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Header from "../Components/Header";
import Buttom_Section from "../Components/Buttom_Section";
import "../Styles/DetailsPage.css";
import queryString from "query-string";
import axios from "axios";
import uuid from 'react-uuid'
import validator from 'validator'
const constants = require("../Constants");
const API_URL = constants.API_URL;


class DetailsPage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            salonId: "",
            salon: null,
            thumb: [],
            salonName: "",
            salonRating: 0,
            min_price: 0,
            phone: "",
            city: "",
            locality: "",
            models: null
        }
    }
    componentDidMount = () => {
        //debugger;
        const qs = queryString.parse(this.props.location.search);
        const { id } = qs;


        axios.get(`${API_URL}/getAllSalonById/${id}`)
            .then(result => {
                debugger;
                const salon = result.data.salon;
                this.setState({ 
                    salon: salon[0],
                    salonName: salon[0].name,
                    salonRating: salon[0].rating,
                    thumb: salon[0].thumb,
                    min_price: salon[0].min_price,
                    phone: salon[0].phone,
                    city: salon[0].city,
                    locality: salon[0].locality,
                    models: salon[0].models,
                    salonId: id
                })

                //console.log(cityLocations);



            })
            .catch(error => {
                console.log(error);
            });
    }
    servicRender = (item) => {
        debugger
        const id = this.state.salonId;
        const name = item.name;
        axios.get(`${API_URL}/serviceList/${name}/${id}`)
            .then(result => {
                debugger;

                result.data.serviceList.map((item,index)=>{
                    return (
                        
                            <h2>{item.name}(&#x20b9; {item.price})</h2>
                        
                    )
                })
               



            })
            .catch(error => {
                console.log(error);
            });
    }

    bookAppoClicked=(id)=>{
      
            // debugger
             const { salonId, email, totalPrice, name, mobile, date, time, selectedServices,user } = this.state
             // if (email.length == 0) {
             //     window.alert("Enter email first!")
             //     return;
             // }
             if (mobile.length == 0) {
                 window.alert("Enter mobile no first!")
                 return;
             }
             if (mobile.length < 10) {
                 window.alert("Enter valid mobile no!")
                 return;
             }
             if (salonId.length == 0) {
                 window.alert("Select Salon first!")
                 return
             }
             if (selectedServices.length == 0) {
                 window.alert("Please select minimum one service!");
                 return
             }
             if (!date) {
                 window.alert("please select appo date first!")
                 return
             }
             if (!time) {
                 window.alert("please select appo time first!")
                 return
             }
             let a = localStorage.getItem('user');
             this.setState({ userDetails: JSON.parse(a) })
             if (a) {
                 this.setState({
                     isLogin: true
                 })
                 console.log("login status changed!")
                 debugger
                 const reqData = {
                     userId:email,
                     salonId: salonId,
                     orderStatus: "placed",
                     totalPrice: totalPrice,
                     userName: name,
                     orderId: uuid(),
                     date: date,
                     time: time,
                     orderDetails: selectedServices,
                     payment:false,
                     confirmBooking:"pending",
                     mobile:mobile
                 }
                 axios({
                     method: "POST",
                     url: `${API_URL}/placeOrder`,
                     //  headers : {"Content-Type" : "applicaton/json"},
                     data: reqData
                 })
                     .then(result => {
                         //   debugger;
                         this.setState({
                             isPlaceOrderModalOpen: true
                         })
                     })
                     .catch(error => {
                         console.log(error);
                     });
     
             } else {
                 window.alert("You have to login first!")
                 this.setState({
                     isLoginModalOpen: true
                 })
             }
         
    }
    render() {
        // debugger
        const { salon, thumb, salonName, salonRating, min_price, phone, city, locality, models } = this.state;

        console.log(salon);
        return (
            <>
                <Header />
                <div className="container-fluid">
                    {

                        salon
                            ?
                            <div className="container">

                                <div className="row text-center mt-3">
                                    <Carousel dynamicHeight={false} showThumbs={false} stopOnHover={true} autoPlay={true} interval={3000} infiniteLoop={true}>
                                        {

                                            thumb.map((item, index) => {
                                                return (
                                                    <div>
                                                        <img src={require(`../${item}`).default} />
                                                    </div>
                                                )
                                            })
                                        }

                                    </Carousel>
                                </div>
                                <br />
                                <div className="row">
                                    <h1 className="col-12 col-sm-12 col-mg-6 col-lg-6 text-center">{salonName}</h1>
                                    <div className=" col-12 col-sm-12 col-mg-6 col-lg-6 text-center"><button className="btn" onClick={()=>this.bookAppoClicked(salon._id)}>Book Appointment</button></div>
                                </div>
                                <div className="row">
                                    <Tabs>
                                        <TabList>
                                            <Tab>Overview</Tab>
                                            <Tab>Contact</Tab>
                                        </TabList>
                                        <TabPanel>
                                            <h2>About This Salon</h2>
                                            <h2 className="text-center">Services</h2>
                                            <div className="row deatilsServices">
                                            {
                                                        salon ?
                                                            salon.services.map((item, index) => {
                                                               return(
                                                                   <span  className="col-12 col-sm-12 col-mg-3 col-lg-3 ">
                                                                       <h2>{item.name}</h2>
                                                                       <ul key={index}>
                                                                       {
                                                                       item.service.map((item,index)=>{
                                                                           return(
                                                                            
                                                                            <li key={index}>{item.name}(&#x20b9; {item.price})</li>
                                                                           
                                                                      
                                                                           )
                                                                       })
                                                                       
                                                            }
                                                            </ul>
                                                                   </span>
                                                               )

                                                            })
                                                            :
                                                            <a></a>
                                                    }
                                               
                                                <Carousel dynamicHeight={false} showThumbs={false} stopOnHover={true} autoPlay={true} interval={3000} infiniteLoop={true}>
                                                    {

                                                        models.map((item, index) => {
                                                            return (
                                                                <div>
                                                                    <img src={require(`../${item}`).default} />
                                                                </div>
                                                            )
                                                        })
                                                    }

                                                </Carousel>
                                            </div>
                                            <h2>Min Price : <span>{min_price}</span></h2>

                                           
                                        </TabPanel>
                                        <TabPanel>
                                            <h2>Phone number : <span>{phone}</span></h2>
                                            <h2>City :
                                                <span>
                                                    {city}
                                                </span></h2>
                                            <h2>Locality :
                                                <span>
                                                    {locality}
                                                </span></h2>
                                        </TabPanel>
                                    </Tabs>
                                </div>

                            </div>
                            :
                            <h4 className="text-center">Loading...</h4>
                    }
                </div>
                <Buttom_Section />
            </>
        )
    }
}
export default DetailsPage;