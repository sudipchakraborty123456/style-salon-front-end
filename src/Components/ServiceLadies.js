import React from 'react';
import Buttom_Section from "../Components/Buttom_Section";
import BookAppoForm from "../Components/BookAppoForm";
import Header from "../Components/Header";
class ServiceLadies extends React.Component{
    gentsServiceClicked=()=>{
        this.props.history.push("/service/gents")
    }
    render() {
        return (
            <div>
                <Header/>
                    <div className="container-fluid">
                    <div className="row services my-3">
                        <span  >LADIES</span>
                        
                    </div>
                    <div className="row">
                        <img className="col-12 images" src={require('../Images/ladies2.jpg').default} alt="sorry!" />
                    </div>
                    <div className="row my-5 mx-5">
                        <div className="col-12 col-sm-12 col-mg3 col-lg-3 text-center">
                            <span className="heading">Hair Styling</span>
                            <ul className="list" style={{ textAlign: 'left' }}>
                                <li>Hair Cut</li>
                                <li>Ironing</li>
                                <li>Global Colouring</li>
                                <li>Blow Dry</li>
                                <li>Root Touch Up</li>
                                <li>Shampoo & Conditioning</li>
                                <li>Head Massage</li>
                                <li>Roller Setting</li>
                                <li>Oiling</li>
                            </ul>
                        </div>

                        <div className="col-12 col-sm-12 col-mg3 col-lg-3 text-center">
                            <span className="heading">Make Up</span>
                            <ul className="list" style={{ textAlign: 'left' }}>
                                <li>Party Make Up</li>
                                <li>Engagement Make Up</li>
                                <li>Bridal & Reception Make Up</li>
                                <li>Base Make Up</li>
                                <li>Eye Make Up</li>
                            </ul>
                        </div>

                        <div className="col-12 col-sm-12 col-mg3 col-lg-3 text-center">
                            <span className="heading">Hair Texture</span>
                            <ul className="list" style={{ textAlign: 'left' }}>
                                <li>Rebonding</li>
                                <li>Perming</li>
                                <li>Keratin</li>
                                <li>Colour Protection</li>
                                <li>Smoothening</li>
                            </ul>
                        </div>
                        <div className="col-12 com-sm-12 col-mg-3 col-lg-3 text-center">
                            <span className="heading">Hair Treatments</span>
                            <ul className="list" style={{ textAlign: 'left' }}>
                                <li>Spa Treatments</li>
                                <li>Volumizing</li>
                                <li>Advanced Hair Moisturising</li>
                                <li>Scalp Treatments</li>
                                <li>Hair Spa</li>
                            </ul>
                        </div>
                        
                    </div>
                    <div className="row">
                        <img className="col-12 images" src={require("../Images/ladies1.jpg").default} alt="sorry!" />
                    </div>
                    <div className="row mx-5">
                       
                        <div className="col-12 com-sm-12 col-mg-6 col-lg-6 text-center">
                            <span className="heading">Facials & Rituals</span>
                            <ul className="list" style={{ textAlign: 'left' }}>
                                <li>Bleach</li>
                                <li>Luxury Facials/Rituals</li>
                                <li>Clean Ups</li>
                                <li>Body Polishing/Rejuvenation</li>
                                <li>Threading</li>
                            </ul>
                        </div>
                        <div className="col-12 com-sm-12 col-mg-6 col-lg-6 text-center">
                            <span className="heading">Hand & Feet</span>
                            <ul className="list" style={{ textAlign: 'left' }}>
                                <li>Manicure</li>
                                <li>Spa Pedicure</li>
                                <li>Pedicure</li>
                                <li>Waxing</li>
                                <li>Spa Manicure</li>
                            </ul>
                        </div>
                     
                    </div>
                    <div className="text-center my-5">
                        <button className="btn btn-light" onClick={()=>this.gentsServiceClicked()}>Gents Services</button>
                    </div>
                    <BookAppoForm/>
                   
                </div>
                <Buttom_Section/>
            </div>
        )
    }
}
export default ServiceLadies;