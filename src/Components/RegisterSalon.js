import React from 'react';
import Header from "../Components/Header";
import Buttom_Section from "../Components/Buttom_Section";
import Upload from "../Components/Upload";
import "../Styles/RegisterSalon.css";
class Login extends React.Component {
    render() {
        return (
            <>
                <Header />

                <div className="container">
                    <h1 className="text-center">Register Your Salon</h1>

                    <div className="row">
                    <div className="col-12 col-sm-12 col-mg-6 col-lg-6">
                        <label className="inputFieldLabel my-1 ">Salon Name : <input className="inputFild" type="text" placeholder="Enter Salon Name" /></label>
                        <br />
                        <label className="inputFieldLabel my-1 ">Address : <input className="inputFild"  type="text" placeholder="Enter Salon Address" /></label>
                        <br />
                        <label className="inputFieldLabel my-1 ">Contact No : <input className="inputFild"  type="number" placeholder="Enter Salon Contact Number" /></label>
                        <br />
                    </div>


                    
                        <div className="col-12 col-sm-12 col-mg-6 col-lg-6" >
                            <label className="inputFieldLabel my-1 ">Email : <input className="inputFild"  type="email" placeholder="Enter Salon Contact Email" /></label>
                            <br />
                            <label className="inputFieldLabel my-1 ">Select Gender : <select className="inputFild" >
                                <option selected disabled>Select Gender</option>
                                <option>Gents</option>
                                <option>Ladise</option>
                            </select></label>
                            <br />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-mg-6 col-lg-6 text-start">
                            <h2 className="text-center">Chose Main Services : </h2>
                            <lable> <input type="checkBox" className="mx-2" />  Hair Cut & Finish </lable>
                            <br />
                            <lable> <input type="checkBox" className="mx-2" />  Hair Colour </lable>
                            <br />
                            <lable> <input type="checkBox" className="mx-2"/>  Hair Texture </lable>
                            <br />
                            <lable> <input type="checkBox" className="mx-2"/>  Hair Treatments</lable>
                            <br />
                            <lable> <input type="checkBox" className="mx-2"/>  Skin Care </lable>
                            <br />
                            <lable> <input type="checkBox" className="mx-2"/>  Beard Grooming</lable>
                        </div>
                        <div className="col-12 col-sm-12 col-mg-6 col-lg-6 text-start" >
                            <h2 className="text-center">Chose Sub Services : </h2>
                            <h5>Hair Cut & Finish</h5>
                            <lable> <input type="checkBox" className="mx-2"/>Hair Cut & Finish <br /> Price <input type="number" placeholder="in rupee" />, Duration : <input type="number" placeholder="in min" /></lable>
                            <br />
                            <lable> <input type="checkBox"className="mx-2" />Hair Colour <br /> Price <input type="number" placeholder="in rupee" />, Duration : <input type="number" placeholder="in min" /> </lable>
                            <br />
                            <lable> <input type="checkBox" className="mx-2"/>Hair Texture <br /> Price <input type="number" placeholder="in rupee" />, Duration : <input type="number" placeholder="in min" /> </lable>
                            <br />
                            <lable> <input type="checkBox" className="mx-2"/>Hair Treatments <br /> Price <input type="number" placeholder="in rupee" />, Duration : <input type="number" placeholder="in min" /></lable>
                            <br />
                            <lable> <input type="checkBox"className="mx-2" />Skin Care  <br /> Price <input type="number" placeholder="in rupee" />, Duration : <input type="number" placeholder="in min" /></lable>
                            <br />
                            <lable> <input type="checkBox" className="mx-2"/>Beard Grooming <br /> Price <input type="number" placeholder="in rupee" />, Duration : <input type="number" placeholder="in min" /></lable>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-mg-6 col-lg-6 text-start">
                            <h2>Upload Salon Photo</h2>
                            <h6>*Please choose min 3 photo of your Salon</h6>
                            <Upload />
                        </div>

                        <div className="col-12 col-sm-12 col-mg-6 col-lg-6 text-start">
                            <h2>Upload Model Photo</h2>
                            <h6>*Please choose min 2 photo of your Models</h6>
                            <Upload />
                        </div>
                    </div>
                </div>
                <div className="text-center my-2"> 
                <button className="btn" >Register </button>
                </div>
                <Buttom_Section />
            </>
        )
    }
}
export default Login