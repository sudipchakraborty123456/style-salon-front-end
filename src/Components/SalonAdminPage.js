import React from 'react';
import Buttom_Section from "../Components/Buttom_Section";
import Header from "../Components/Header";
class SalonAdminPage extends React.Component {
    render() {
        return (

            <div>
                <Header />
                <div className="container">
                    <h2 className="text-center">Notification</h2>
                    <div className="borderDesign">
                        <div className="row m-3 p-3">
                            <div className="col-3 text-center">
                                <h5 >Name : Animesh</h5>
                                <h5>Phone: 8899556622</h5>
                                <h5>Date : 18/12/1995</h5>
                                <h5>time : 12.30 PM</h5>
                            </div>
                            <div className="col-3">
                                <h5>Booking services Details</h5>
                                <ul>
                                    <li>Hair-cut</li>
                                </ul>
                            </div>
                            <div className="col-3 text-center">
                                <h5>Payment</h5>
                                <h7>Waiting for your comfermation</h7>
                            </div>
                            <div className="col-3 text-center">
                                <button>Accept</button>
                                <br />
                                <br/>
                                <button>Denie</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Buttom_Section />
            </div>
        )
    }
}
export default SalonAdminPage;