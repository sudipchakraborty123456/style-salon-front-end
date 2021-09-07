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
import Modal from 'react-modal';
import { ThemeProvider } from "react-bootstrap";
const constants = require("../Constants");
const API_URL = constants.API_URL;


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
        zIndex: '1000',
        maxWidth: "500px",
        width: "100%",
        "margin-top": "5px"
    }
};
const customStyles1 = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width:'54%'
    },
};
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
            models: null,
            isOrderDetailsModalOpen: false,
            mobile: "",
            totalPrice: 0,
            selectedServices: [],
            date: null,
            time: null,
            isPlaceOrderModalOpen:false
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

                result.data.serviceList.map((item, index) => {
                    return (

                        <h2>{item.name}(&#x20b9; {item.price})</h2>

                    )
                })




            })
            .catch(error => {
                console.log(error);
            });
    }

    bookingDetailsSend = (id) => {

        // debugger
        const { salonId, email, totalPrice, name, mobile, date, time, selectedServices, user } = this.state
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
        a=JSON.parse(a)
        this.setState({ userDetails:  a})
        if (a) {
            this.setState({
                isLogin: true
            })
            console.log("login status changed!")
            debugger
            const reqData = {
                userId: a.email,
                salonId: salonId,
                orderStatus: "placed",
                totalPrice: totalPrice,
                userName: a.firstName,
                orderId: uuid(),
                date: date,
                time: time,
                orderDetails: selectedServices,
                payment: false,
                confirmBooking: "pending",
                mobile: mobile
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
    bookAppoClicked = () => {
        this.setState({
            isOrderDetailsModalOpen: true
        })
    }
    orderDetailsModalClose = () => {
        this.setState({
            isOrderDetailsModalOpen: false
        })
    }
    setValueForName = (e, field) => {
        //debugger;

        this.setState({
            [field]: e.target.value

        });
        //console.log(this.state.field['name']);
        // console.log(this.state.name);
        // console.log(this.state.mobileNo);
        // console.log(this.state.address);
    }
    serviceSelected = (e, p) => {
        //   debugger
        let total = this.state.totalPrice;

        const selectedServices = this.state.selectedServices;
        if (e.target.checked) {
            let selectedServices = this.state.selectedServices
            selectedServices.push(e.target.value)
            total = total + p;
            this.setState({
                totalPrice: total,
                selectedServices: selectedServices
            })
        } else {
            let index = selectedServices.indexOf(e.target.value)
            if (index != -1) {
                selectedServices.splice(index, 1)
                total = total - p
                this.setState({
                    totalPrice: total,
                    selectedServices: selectedServices
                })
            }
        }
    }
    dataChanged = (e) => {
        this.setState({
            date: e.target.value
        })
    }
    timeChanged = (e) => {
        // debugger
        this.setState({
            time: e.target.value
        })
    }
    placeOrderClose = () => {
        this.setState({
            isPlaceOrderModalOpen: false
        })
        this.props.history.push("/");
    }
    render() {
       // debugger
        const { isPlaceOrderModalOpen, isOrderDetailsModalOpen, salon, thumb, salonName, salonRating, min_price, phone, city, locality, models } = this.state;

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
                                    <div className=" col-12 col-sm-12 col-mg-6 col-lg-6 text-center"><button className="btn" onClick={() => this.bookAppoClicked(salon._id)}>Book Appointment</button></div>
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
                                                            return (
                                                                <span className="col-12 col-sm-12 col-mg-3 col-lg-3 ">
                                                                    <h2>{item.name}</h2>
                                                                    <ul key={index}>
                                                                        {
                                                                            item.service.map((item, index) => {
                                                                                return (

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
                                <Modal isOpen={isOrderDetailsModalOpen} style={customStyles}>
                                    <div className="container">
                                        <div >
                                            <h1 className="heading2 text-center">Select Services</h1>
                                            <button className=" btn btn-light" className="btn btn-light closeBtn" onClick={() => this.orderDetailsModalClose()}>&times;</button>
                                        </div>
                                        <div className="row">
                                            {
                                                salon ?
                                                    salon.services.map((item, index) => {
                                                        return (
                                                            <span className="">
                                                                <h2  >{item.name}</h2>
                                                                <ul key={index}>
                                                                    {
                                                                        item.service.map((item, index) => {
                                                                            return (

                                                                                <label className="d-block"><input type="checkBox" key={index} value={item.name} onChange={(e) => this.serviceSelected(e, item.price)} />{item.name}(&#x20b9; {item.price})</label>


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
                                            {/* <div className="subHading">Name</div>
                                            <input className="inputField" type="text" placeholder="Enter your name" onChange={(e) => this.setValueForName(e, 'name')} /> */}
                                            <span className="subHading" required min="10" style={{ "width": "auto" }}>Mobile Number</span>
                                            <input type="number" className="inputField" placeholder="Enter mobile number" style={{ "width": "auto" }} onChange={(e) => this.setValueForName(e, 'mobile')} />
                                            {/* <div className="subHading" required>Address</div>
                                            <input type="text" className="inputField" placeholder="Enter your address" onChange={(e) => this.setValueForName(e, 'address')} /> */}
                                            <div className="bottomBorder">
                                                <span className="subHading" required >Select Date</span>
                                                <input type="date" placeholder="Preferred Date" className="input " onChange={(e) => this.dataChanged(e)} />
                                            </div>
                                            <div className="bottomBorder">
                                                <span className="subHading text-start" required min="10">Select Time</span>
                                                <label><input type="time" min="07:00" max="22:00" onChange={(e) => this.timeChanged(e)} /></label>
                                            </div>
                                        </div>
                                        <br />
                                        <button className="btn btn-danger float-end" type="submit" value="submit" onClick={this.bookingDetailsSend}>Pay Now</button>

                                    </div>
                                </Modal>
                                <Modal isOpen={isPlaceOrderModalOpen} style={customStyles1}>
                                    <button className=" btn btn-light" style={{ float: "right" }} onClick={() => this.placeOrderClose()} className="btn btn-light closeBtn">&times;</button>
                                    <p>We send your booking request to salon provider, If they comfirm your booking then we send you a payment link, you have to payment there</p>
                                </Modal>
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