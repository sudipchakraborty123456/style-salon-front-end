import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from "axios";
import "../Styles/BookAppo.css"
import validator from 'validator'
const constants = require("../Constants");
const API_URL = constants.API_URL;

class BookAppoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityes: [],
            locations: null,
            selectedCity: "",
            cityLocations: null,
            selectedCityLocationId: null,
            selectedCityLocations: [],
            salons: [],
            selectedCityId: null,
            selectedLocationId: null,
            selectedSalon: null,
            expanded: false,
            selectedServices: [],
            name: "",
            mobile:"",
            email:"",
            gender:null,
            selectedSalonId:"",
            date:null,
            time:null,
            totalPrice:0,
            isLogin:false
        }
    }
    componentDidMount = () => {
        axios.get(`${API_URL}/getAllCity`)
            .then(result => {
                //   debugger;
                const city = result.data.city;
                this.setState({
                    cityes: city
                })

                // console.log(result);



            })
            .catch(error => {
                console.log(error);
            });
        //debugger;
        axios.get(`${API_URL}/getAllLocations`)
            .then(result => {
                //debugger;
                const locations = result.data.locations;


                this.setState({
                    locations: locations
                })

                //console.log(cityLocations);



            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`${API_URL}/getAllSalons`)
            .then(result => {
                //debugger;
                const salons = result.data.salons;


                this.setState({
                    salons: salons
                })

                //console.log(cityLocations);
                               


            })
            .catch(error => {
                console.log(error);
            });
    }
    bookAppoClicked = () => {
        debugger
        const {selectedSalonId, email, totalPrice, name,mobile,  date, time, selectedServices} =this.state
        if(name.length == 0 ){
            window.alert("Enter name first!")
            return;
        }
        if(name.length < 5){
            window.alert("Name is too short!");
            return
        }
        if(validator.isEmail(email) === false){
            window.alert("Enter valid email !")
          return
        }
        if(email.length == 0 ){
            window.alert("Enter email first!")
            return;
        }
        if(mobile.length == 0 ){
            window.alert("Enter mobile no first!")
            return;
        }
        if(mobile.length < 10 ){
            window.alert("Enter valid mobile no!")
            return;
        }
        if(selectedSalonId.length == 0){
            window.alert("Select Salon first!")
            return
        }
        if(selectedServices.length == 0){
            window.alert("Please select minimum one service!");
            return
        }
        if(!date){
            window.alert("please select appo date first!")
            return
        }
        if(!time){
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
        }else{
            window.alert("You have to login first!")
        }
    }
    citySelected = (event) => {
        document.getElementById("locationSelect").selectedIndex = "0"
        document.getElementById("gender").selectedIndex = "0"
        const selectedCity = event.target.value;
        const selectedCitylist = this.state.locations.find(o => o.city === selectedCity);
        const selectedCityId = selectedCitylist.cityId;
        axios.get(`${API_URL}/getAllSalonByCityId/${selectedCityId}`)
            .then(result => {
                // debugger;
                this.setState({
                    salons: result.data.city,
                    selectedCityId: selectedCityId,
                    selectedLocationId: null
                });
                setTimeout(() => this.getCityLocation(), 0);
            })
            .catch(error => {
                console.log(error);
            });



        // this.componentDidMount();
    }
    getCityLocation = () => {
        const cityLocations = this.state.locations.filter(city => city.cityId == this.state.selectedCityId);
        const selectedCityLocations = cityLocations.map((item, index) => { return (item) })
        const selectedCityLocationId = cityLocations.map((item, index) => { return (item.locationId) })

        this.setState({
            selectedCityLocations: selectedCityLocations
        })
    }
    locationSelected = (e) => {
        document.getElementById("gender").selectedIndex = "0"
        const selectedLocationId = e.target.value;
        this.setState({
            selectedLocationId: selectedLocationId
        })
        setTimeout(() => this.getSalonByLocation(selectedLocationId), 0)
    }
    getSalonByLocation = (id) => {
        //debugger;
        axios.get(`${API_URL}/getAllSalonByLocationId/${id}`).then(result => {
           // debugger
            this.setState({
                salons: result.data.Salons
            })
        }).catch(err => {
            console.log(err);
        })
    }
    genderSelected = (e) => {
        const gender = e.target.value;
        let reqData = {}
        if (this.state.selectedCityId) {
            reqData = {
                city: this.state.selectedCityId,
                gender: gender
            }
        } else if (this.state.selectedLocationId) {
            reqData = {
                locality: this.state.selectedLocationId,
                gender: gender
            }
        } else {
            reqData = {
                gender: gender
            }
        }
        axios({
            method: "POST",
            url: `${API_URL}/filterSalonsByGender&location`,
            //  headers : {"Content-Type" : "applicaton/json"},
            data: reqData
        })
            .then(result => {
             //   debugger;
                this.setState({
                    salons: result.data.salons,
                    gender:gender
                })
            })
            .catch(error => {
                console.log(error);
            });

    }
    salonSelected = (e) => {
      //  debugger
        const id = e.target.value;
        axios.get(`${API_URL}/getAllSalonById/${id}`).then(result => {
            debugger
            this.setState({
                selectedSalon: result.data.salon[0],
                selectedSalonId:result.data.salon[0]._id
            })
        }).catch(err => {
            console.log(err);
        })


    }
    showCheckboxes = () => {
       // debugger
        if (this.state.expanded === true) {
            this.setState({
                expanded: false
            })
        } else {
            this.setState({
                expanded: true
            })
        }
    }
    serviceSelected = (e,p) => {
       // debugger
        let total = this.state.totalPrice;
    
        const selectedServices = this.state.selectedServices;
        selectedServices.push(e.target.value)
        total = total + p;
        this.setState({
            totalPrice : total
        })

    }
    nameChanged = (e) => {
        this.setState({ name: e.target.value })
    }
    mobileChanged=(e)=>{
        this.setState({
            mobile:e.target.value
        })
    }
    emailChanged=(e)=>{
        this.setState({
            email:e.target.value
        })
    }
    dataChanged=(e)=>{
        this.setState({
            date:e.target.value
        })
    }
    timeChanged=(e)=>{
       // debugger
        this.setState({
            time:e.target.value
        })
    }
    render() {
        const { selectedSalon, cityes, selectedCityLocations, salons, expanded } = this.state;
        return (
            <div className="container-fluid my-5 mx-0 " style={{ backgroundColor: ' rgb(238,238,238)' }}>
                <div className="row text-center py-3">
                    <h1>BOOK AN APPOINTMENT ONLINE</h1>
                    <p>Our online bookings service operates between 10:00a.m. and 6:00p.m.</p>
                    <p>During opening hours, we'll call you back within 1 hour to confirm your appointment. Outside opening hours we will call you soon after 10:00am</p>
                    <p>Your data is safe with us! We will only use your details to process your salon booking, and won't share them with third parties.</p>
                </div>
                <div className="row text-center">
                    <div className="col-12 col-sm-12 col-lg-6 px-5">
                        <div className="bottomBorder">
                            <span><i class="material-icons">person</i></span>
                            <input type="text" placeholder="Name" className="input " onChange={(e) => this.nameChanged(e)} />
                        </div>
                        <div className="bottomBorder">
                            <span><i class="material-icons">call</i></span>
                            <input type="number" placeholder="Contact" className="input " onChange={(e)=>this.mobileChanged(e)}/>
                        </div>
                        <div className="bottomBorder">
                            <span><i class="material-icons">email</i></span>
                            <input type="email" placeholder="Email Id" className="input " onChange={(e)=>this.emailChanged(e)}/>
                        </div>
                        <div className="row">
                            <div className="bottomBorder text-center text-center col-12 col-sm-12 col-mg-4 col-lg-4">
                                <span><i class="material-icons">location_on</i></span>
                                <select className="input my-2" id="rst" onChange={(event) => this.citySelected(event)} >
                                    <option selected disabled> City</option>
                                    {cityes.map((item, index) => {
                                        return (<option key={index} >{item}</option>)
                                    })}
                                </select>
                            </div>
                            <div className="bottomBorder   text-center col-12 col-sm-12 col-mg-4 col-lg-4">
                                <select className="input  mx-5" id="locationSelect" onChange={(e) => this.locationSelected(e)}>
                                    <option selected disabled> Select city first</option>
                                    {
                                        selectedCityLocations.map((item, index) => {
                                            return (<option value={item.locationId} key={index}>{item.name}</option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className="bottomBorder   text-center col-12 col-sm-12 col-mg-4 col-lg-4">
                                <span><i class="material-icons">accessibility</i></span>
                                <select className="input " id="gender" onChange={(e) => this.genderSelected(e)}>
                                    <option selected disabled> Gender</option>
                                    <option value="Gents">Male</option>
                                    <option value="Ladise">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-lg-6 px-5">
                        <div className="bottomBorder">

                            <select className="input  mx-5" onChange={(e) => this.salonSelected(e)}>
                                <option selected disabled> Salon</option>
                                {
                                    salons.map((item, index) => {
                                        return (<option value={item._id}>{item.name}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div className="bottomBorder">
                            <div className="selectBox" >
                                <span><i class="material-icons">content_cut</i></span>
                                <div className="input " onClick={() => this.showCheckboxes()} style={{ display: "inline-block" }}>Select Services

                                </div>
                            </div>
                            {
                                expanded === true
                                    ?
                                    <div id="checkboxes" style={{ display: "block" }}>
                                        {
                                            selectedSalon ?
                                                selectedSalon.services.map((item, index) => {
                                                    return (
                                                        <span className="col-12 col-sm-12 col-mg-3 col-lg-3 ">
                                                            <h5>{item.name}</h5>
                                                            <ul key={index}>
                                                                {
                                                                    item.service.map((item, index) => {
                                                                        return (

                                                                            <label className="d-block"><input type="checkBox" key={index} value={item.name}  onChange={(e) => this.serviceSelected(e,item.price)} />{item.name}(&#x20b9; {item.price})</label>


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
                                    </div>
                                    :
                                    <a></a>
                            }

                        </div>
                        <div className="bottomBorder">
                            <span><i class="material-icons">event</i></span>
                            <input type="date" placeholder="Preferred Date" className="input " onChange={(e)=>this.dataChanged(e)}/>
                        </div>
                        <div className="bottomBorder">
                            <span><i class="material-icons">schedule</i></span>
                            <label>Time<input type="time" min="07:00" max="22:00" onChange={(e)=>this.timeChanged(e)} /></label>
                        </div>
                    </div>
                </div>
                <div className="row text-center lastButtomSection">
                    <div className="row lastButtomSection">
                        <button className="btn" onClick={()=>this.bookAppoClicked()} >Book Appointment</button>
                    </div>

                    <p>OR</p>
                    <div className="row ">
                        <h2>
                            Call Us @ <span>9999999999</span>
                        </h2>
                    </div>

                </div>
            </div>
        )

    }
}
export default withRouter(BookAppoForm);