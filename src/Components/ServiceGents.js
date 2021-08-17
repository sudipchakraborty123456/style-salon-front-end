import react from 'react';
import Buttom_Section from "../Components/Buttom_Section";
import Header from "../Components/Header";
import BookAppoForm from "../Components/BookAppoForm";
class ServiceGents extends react.Component {
    ladiesServiceClicked=()=>{
        this.props.history.push("/service/ladies")
    }
    render() {
        return (
            <div>
                <Header/>
                <div className="container-fluid">
                    <div className="row services my-3">
                        <span  >GENTS</span>
                        
                    </div>
                    <div className="row">
                        <img className="col-12 images" src={require('../Images/gents1.jpg').default} alt="sorry!" />
                    </div>
                    <div className="row my-5 mx-5">
                        <div className="col-12 col-sm-12 col-mg3 col-lg-3 text-center">
                            <span className="heading">Hair Cut & Finish</span>
                            <ul className="list" style={{ textAlign: 'left' }}>
                                <li>Cut and Hair Care</li>
                                <li>Shampoo & Conditioning</li>
                                <li>Hair/Beard Colouring</li>
                                <li>Head Massage</li>
                                <li>Beard Styling</li>
                            </ul>
                        </div>

                        <div className="col-12 col-sm-12 col-mg3 col-lg-3 text-center">
                            <span className="heading">Hair Colour</span>
                            <ul className="list" style={{ textAlign: 'left' }}>
                                <li>Hi - Lites</li>
                                <li>Hair Colour
                                (Ammonia & Ammonia Free)</li>
                                <li>Beard Colour</li>
                            </ul>
                        </div>

                        <div className="col-12 col-sm-12 col-mg3 col-lg-3 text-center">
                            <span className="heading">Hair Texture</span>
                            <ul className="list" style={{ textAlign: 'left' }}>
                                <li>Smoothening</li>
                                <li>Straightening</li>
                                <li>Rebonding</li>
                                <li>Perming</li>
                            </ul>
                        </div>

                        <div className="col-12 col-sm-12 col-mg3 col-lg-3 text-center">
                            <span className="heading">Hair Treatments</span>
                            <ul className="list" style={{ textAlign: 'left' }}>
                                <li>Advanced Moisturising</li>
                                <li>Hair Spa</li>
                                <li>Scalp Treatments</li>
                                <li>Colour Protection</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <img className="col-12 images" src={require("../Images/gents2.jpg").default} alt="sorry!" />
                    </div>
                    <div className="row mx-5">
                        <div className="col-12 col-sm-12 col-mg-6 col-lg-6 text-center">
                            <span className="heading">Skin Care</span>
                            <ul className="list" style={{ textAlign: 'left' }}>
                                <li>Clean Ups</li>
                                <li>Organic Treatments</li>
                                <li>Facials</li>
                                <li>Manicure</li>
                                <li>Pedicure</li>
                            </ul>
                        </div>
                        <div className="col-12 col-sm-12 col-mg-6 col-lg-6 text-center">
                            <span className="heading">Beard Grooming</span>
                            <ul className="list" style={{ textAlign: 'left' }}>
                                <li>Beard Trim</li>
                                <li>Beard Colour</li>
                                <li>Beard Styling</li>
                                <li>Shave</li>
                                <li>Luxury Shave & Beard Spa</li>
                            </ul>
                        </div>
                    </div>
                    <div className="text-center my-5">
                        <button className="btn btn-light" onClick={()=>this.ladiesServiceClicked()}>Ladies Services</button>
                    </div>
                    <BookAppoForm/>
                    
                </div>
                <Buttom_Section/>
            </div>
        )
    }
}
export default ServiceGents;