import React from 'react';
import Buttom_Section from "../Components/Buttom_Section";
import Header from "../Components/Header";
import axios from "axios";
import Music from "../Components/Music"
const constants = require("../Constants");
const API_URL = constants.API_URL;
class SalonAdminPage extends React.Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            a:null
        }
    }
    componentDidMount = () => {
        let a = localStorage.getItem('user');
        a = JSON.parse(a)
        console.log(a.salonId);
        axios.get(`${API_URL}/getOrdersBySalonId/${a.salonId}`)
            .then(result => {
                this.setState({
                    orders: result.data.data
                })


            })
            .catch(error => {
                console.log(error);
            });
    }
    acceptClicked = (e) => {
        axios.get(`${API_URL}/confiemBooking/${e.target.value}`)
            .then(result => {

                this.setState({
                    a:1
                })

            })
            .catch(error => {
                console.log(error);
            });
    }
    denyClicked=(e)=>{
        axios.get(`${API_URL}/denyBooking/${e.target.value}`)
        .then(result => {

            this.setState({
                a:1
            })


        })
        .catch(error => {
            console.log(error);
        });
    }
    render() {
        const { orders } = this.state;
        return (

            <div>
                <Music/>
                <Header />
                <div className="container">
                    <h2 className="text-center">Notification</h2>
                    {
                        orders.length > 0
                            ?
                            orders.map((item, index) => {
                                return (
                                    <div className="borderDesign">
                                        <div className="row m-3 p-3">
                                            <div className="col-3 text-center">
                                                <h5 >Name :{item.userName}</h5>
                                                <h5>Phone: {item.mobile}</h5>
                                                <h5>Date : {item.date}</h5>
                                                <h5>time : {item.time}</h5>
                                            </div>
                                            <div className="col-3">
                                                <h5>Booking services Details</h5>
                                                <ul>
                                                    {
                                                        item.orderDetails.map((item, index) => {
                                                            return (
                                                                <li>{item}</li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            <div className="col-3 text-center">
                                                <h5>Payment</h5>
                                                {
                                                 item.confirmBooking === "Accepted" 
                                                 ?
                                                 <h7>You accepted this booking, waiting for confirm payment</h7>
                                                 :
                                                 <h7>Waiting for your comfermation</h7>
                                                }
                                               
                                            </div>
                                            <div className="col-3 text-center">
                                                <button value={item.orderId} onClick={(e) => this.acceptClicked(e)}>Accept</button>
                                                <br />
                                                <br />
                                                <button value={item.orderId} onClick={(e) => this.denyClicked(e)} > Deny</button>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                            :
                            <a></a>
                    }

                </div>
                <Buttom_Section />
            </div>
        )
    }
}
export default SalonAdminPage;