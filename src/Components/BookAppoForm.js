import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from "axios";
import "../Styles/BookAppo.css"
import validator from 'validator'
import Modal from 'react-modal';
import FacebookLogin from "react-facebook-login";
import Googlelogin from "react-google-login";
import nextId from "react-id-generator";
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
    },
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
            mobile: "",
            email: "",
            gender: null,
            selectedSalonId: "",
            date: null,
            time: null,
            totalPrice: 0,
            isLogin: false,
            isLoginModalOpen: false,
            loginError: null,
            userName: "",
            password: "",
            firstName: "",
            lastName: "",
            isSingUpModalOpen: false,
            singUpError: null,
            isPlaceOrderModalOpen: false
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
        const { selectedSalonId, email, totalPrice, name, mobile, date, time, selectedServices } = this.state
        if (name.length == 0) {
            window.alert("Enter name first!")
            return;
        }
        if (name.length < 5) {
            window.alert("Name is too short!");
            return
        }
        if (validator.isEmail(email) === false) {
            window.alert("Enter valid email !")
            return
        }
        if (email.length == 0) {
            window.alert("Enter email first!")
            return;
        }
        if (mobile.length == 0) {
            window.alert("Enter mobile no first!")
            return;
        }
        if (mobile.length < 10) {
            window.alert("Enter valid mobile no!")
            return;
        }
        if (selectedSalonId.length == 0) {
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
            const reqData = {
                userId: email,
                salonId: selectedSalonId,
                orderStatus: "placed",
                totalPrice: totalPrice,
                userName: name,
                orderId: nextId(),
                date: date,
                time: time,
                orderDetails: selectedServices
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
                    gender: gender
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
                selectedSalonId: result.data.salon[0]._id
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
    serviceSelected = (e, p) => {
        debugger
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
        }else{
            let index = selectedServices.indexOf(e.target.value)
            if(index != -1){
                selectedServices.splice(index,1)
                total = total-p
                this.setState({
                    totalPrice: total,
                    selectedServices: selectedServices
                })
            }
        }
    }
    nameChanged = (e) => {
        this.setState({ name: e.target.value })
    }
    mobileChanged = (e) => {
        this.setState({
            mobile: e.target.value
        })
    }
    emailChanged = (e) => {
        this.setState({
            email: e.target.value
        })
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
    handelSingUpButtonClicked = () => {
        this.setState({
            isSingUpModalOpen: true,
            isLoginModalOpen: false
        });
    }
    handleChange = (event, field) => {
        this.setState({
            [field]: event.target.value,
            loginError: undefined
        });
    }
    handleSingUp = () => {
        const { userName, password, firstName, lastName, city, locality, mobile } = this.state;
        if (userName.length == 0) {
            window.alert("Enter email first!")
            return;
        }
        if (password.length == 0) {
            window.alert("Enter password first!");
            return;
        }
        if (firstName.length == 0) {
            window.alert("Enter first name first!");
            return;
        }
        if (lastName.length == 0) {
            window.alert("Enter last name first!");
            return;
        }

        const obj = {
            email: userName,
            password: password,
            firstName: firstName,
            lastName: lastName,
            city: city,
            locality: locality,
            mobile: mobile
        }
        axios({
            method: 'POST',
            url: `${API_URL}/signUp`,
            header: { 'Content-Type': 'application/json' },
            data: obj
        }).then(result => {
            //debugger
            if (result.data.data == "Use another email") {
                window.alert("This email is already used, try with another email")
                return;
            }
            localStorage.setItem("user", JSON.stringify(result.data.user));
            localStorage.setItem("isLoggedIn", true);
            this.setState({
                user: result.data.user,
                isLoggedIn: true,
                loginError: undefined,
                singUpError: undefined
            });
            this.resetSingUpForm();
        }).catch(error => {
            this.setState({
                singUpError: 'Error in SingUp !!'
            });
            console.log(error);
        });
    }

    resetSingUpForm = () => {
        this.setState({
            isSingUpModalOpen: false,
            username: '',
            password: '',
            firstName: "",
            lastName: "",
            city: "",
            locality: "",
            mobile: "",
            singUpError: undefined
        });
    }
    handleLogin = () => {
        //  debugger
        const { userName, password, isLoggedIn } = this.state;
        if (userName.length == 0) {
            window.alert("Enter email first!")
            return;
        }
        if (password.length == 0) {
            window.alert("Enter password first!")
            return;
        }
        const obj = {
            email: userName,
            password: password
        }
        axios({
            method: 'POST',
            url: `${API_URL}/login`,
            header: { 'Content-Type': 'application/json' },
            data: obj
        }).then(result => {
            if (result.data.data == "This email is not exist") {
                this.setState({
                    loginError: 'This email is not exist, You have to signUp first !!'
                });
                return;
            } else {
                localStorage.setItem("user", JSON.stringify(result.data.user[0]));
                localStorage.setItem("isLoggedIn", true);
                this.setState({
                    user: result.data.user[0],
                    isLoggedIn: true,
                    loginError: undefined
                });
                this.resetLoginForm();
            }
        }).catch(error => {
            this.setState({
                loginError: 'Password is wrong !!'
            });
            console.log(error);
        });
    }

    logout = () => {
        //debugger;
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        this.setState({
            user: undefined,
            isLoggedIn: false
        });
    }

    resetLoginForm = () => {
        this.setState({
            isLoginModalOpen: false,
            userName: '',
            password: '',
            loginError: undefined
        });
    }
    placeOrderClose = () => {
        this.setState({
            isPlaceOrderModalOpen: false
        })
    }
    render() {
        const { selectedSalon, cityes, isPlaceOrderModalOpen,totalPrice, selectedCityLocations, salons, expanded, isLoginModalOpen, loginError, userName, password, isSingUpModalOpen, singUpError, firstName, lastName } = this.state;
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
                            <input type="number" placeholder="Contact" className="input " onChange={(e) => this.mobileChanged(e)} />
                        </div>
                        <div className="bottomBorder">
                            <span><i class="material-icons">email</i></span>
                            <input type="email" placeholder="Email Id" className="input " onChange={(e) => this.emailChanged(e)} />
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

                                                                            <label className="d-block"><input type="checkBox" key={index} value={item.name} onChange={(e) => this.serviceSelected(e, item.price)} />{item.name}(&#x20b9; {item.price})</label>


                                                                        )
                                                                    })

                                                                }
                                                            </ul>
                                                            <hr/>
                                                            <a>Total:{totalPrice}</a>
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
                            <input type="date" placeholder="Preferred Date" className="input " onChange={(e) => this.dataChanged(e)} />
                        </div>
                        <div className="bottomBorder">
                            <span><i class="material-icons">schedule</i></span>
                            <label>Time<input type="time" min="07:00" max="22:00" onChange={(e) => this.timeChanged(e)} /></label>
                        </div>
                    </div>
                </div>
                <div className="row text-center lastButtomSection">
                    <div className="row lastButtomSection">
                        <button className="btn" onClick={() => this.bookAppoClicked()} >Book Appointment</button>

                        <Modal isOpen={isLoginModalOpen} style={customStyles} >
                            <h3>User Login</h3>
                            <form>
                                {
                                    loginError ? <div className="alert alert-danger">{loginError}</div> : null
                                }
                                <label className="form-label">Username:</label>
                                <input type="text" value={userName} className="form-control" onChange={(event) => this.handleChange(event, 'userName')} />
                                <br />
                                <label className="form-label">Password:</label>
                                <input type="password" value={password} className="form-control" onChange={(event) => this.handleChange(event, 'password')} />
                                <br />
                                <br />
                                <FacebookLogin
                                    appId="1182616252238309"
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    onClick={this.componentClicked}
                                    callback={this.responseFacebookLogin}
                                    icon="bi bi-facebook p-2 m-2"
                                    cssClass="fb"
                                />
                                <br />
                                <Googlelogin
                                    clientId="946053029267-3osdvlorecoptosi14vh65g4k982ncvi.apps.googleusercontent.com"
                                    buttonText="Continue with Google"
                                    onSuccess={this.responseSuccessGooglelogin}
                                    onFailure={this.responseFailureGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    className="google"
                                />
                                <br />
                                <br />
                                <input type="button" className="btn btn-primary" onClick={() => this.handleLogin()} value="Login" />
                                <input type="button" className="btn" onClick={() => this.resetLoginForm()} value="Cancel" />
                                <br />
                                <hr />
                                <div className="text-center">
                                    <p className="dontHaveAccount">Don't have account? <a className="signUpA pointer" onClick={() => this.handelSingUpButtonClicked()}>SignUp</a></p>
                                </div>
                            </form>
                        </Modal>
                        <Modal isOpen={isSingUpModalOpen} style={customStyles}>
                            <h3>User Singup</h3>
                            <form>
                                {
                                    singUpError ? <div className="alert alert-danger">{singUpError}</div> : null
                                }
                                <label className="form-label">First Name:</label>
                                <input type="text" value={firstName} className="form-control" onChange={(event) => this.handleChange(event, 'firstName')} />
                                <label className="form-label">Last Name:</label>
                                <input type="text" value={lastName} className="form-control" onChange={(event) => this.handleChange(event, 'lastName')} />
                                <label className="form-label">email:</label>
                                <input type="text" value={userName} className="form-control" onChange={(event) => this.handleChange(event, 'userName')} />
                                <label className="form-label">Password:</label>
                                <input type="password" value={password} className="form-control" onChange={(event) => this.handleChange(event, 'password')} />
                                <br />
                                <FacebookLogin
                                    appId="1182616252238309"
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    onClick={this.componentClicked}
                                    callback={this.responseFacebookSuingUp}
                                    icon="bi bi-facebook p-2 m-2"
                                    cssClass="fb"
                                />
                                <br />
                                <Googlelogin
                                    clientId="946053029267-3osdvlorecoptosi14vh65g4k982ncvi.apps.googleusercontent.com"
                                    buttonText="Continue with Google"
                                    onSuccess={this.responseSuccessGoogle}
                                    onFailure={this.responseFailureGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    className="google"
                                />
                                <br />
                                <br />
                                <input type="button" className="btn btn-primary" onClick={this.handleSingUp} value="Sing Up" />
                                <input type="button" className="btn" onClick={this.resetSingUpForm} value="Cancel" />
                                <br />
                                <hr />
                                <p className="dontHaveAccount">Already have an account? <a className="signUpA pointer" onClick={() => this.loginClicked()}>Login</a></p>
                            </form>
                        </Modal>
                        <Modal isOpen={isPlaceOrderModalOpen} style={customStyles1}>
                            <a onClick={() => this.placeOrderClose()} style={{float:"right"}}>+</a>
                            <p>We send your booking request to salon provider, If they comfirm your booking then we send you a payment link, you have to payment there</p>
                        </Modal>
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