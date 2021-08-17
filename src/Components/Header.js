import React from 'react';
import { withRouter } from 'react-router-dom';
import { Dropdown, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Spin as Hamburger } from 'hamburger-react';
import Modal from 'react-modal';
import axios from 'axios';
import FacebookLogin from "react-facebook-login";
import Googlelogin from "react-google-login";

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
class Header extends React.Component {
    constructor(props) {
        super();
        this.state = {
            a: "",
            isLoginModalOpen:false,
            userName:"",
            password:"",
            loginError:null,
            user:null,
            isLoggedIn:false,
            isSingUpModalOpen:false,
            singUpError:null,
            firstName:"",
            lastName:"",
            city:"",
            locality:"",
            mobile:""
        }
    }
    componentDidMount() {
        const initialPath = this.props.history;
        
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        let user = localStorage.getItem("user");
        if (user) {
            user = JSON.parse(user);
        }
        if(isLoggedIn){
            this.setState({
            user: user,
            isLoggedIn: isLoggedIn
        })}else{

        }
    }
    logoClick = () => {
        this.props.history.push("/");
    }
    bookAppoClicked = () => {
        this.props.history.push("/bookAppo");
    }
    aboutUsClicked = () => {
        this.props.history.push("/aboutUs");
    }

    loginClicked = () => {
        this.setState({
            isLoginModalOpen : true,
            isSingUpModalOpen:false
        })
    }
    salonFinder = () => {
        this.props.history.push("/salonFinder");
    }
    getnsServiceClicked = () => {
        this.props.history.push("/service/gents");
    }
    ladiesServiceClicked = () => {
        this.props.history.push("/service/ladies")
    }
    registerSalonClicked=()=>{
        this.props.history.push("/registerSalon")
    }
    handleChange = (event, field) => {
        this.setState({
            [field]: event.target.value,
            loginError: undefined
        });
    }
    handleSingUp = () => {
        const { userName, password, firstName, lastName,city,locality, mobile } = this.state;
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
        if (city.length == 0) {
            window.alert("Enter city first!");
            return;
        }
        if (locality.length == 0) {
            window.alert("Enter locality first!");
            return;
        }
        if (mobile.length < 10) {
            window.alert("Enter valid mobile no!");
            return;
        }
        const obj = {
            email: userName,
            password: password,
            firstName: firstName,
            lastName: lastName,
            city:city,
            locality:locality,
            mobile:mobile
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
            city:"",
            locality:"",
            mobile:"",
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
    handelSingUpButtonClicked = () => {
        this.setState({
            isSingUpModalOpen: true,
            isLoginModalOpen: false
        });
    }
    componentClicked=()=>{
        console.log("Clicked!")

    }
    responseFacebookLogin=(response)=> {
        //console.log(response)
        this.setState({
            userName: response.email,
            password: response.id
        })
        this.handleLogin();
    }
    render() {
        //debugger
        const {user, isLoginModalOpen, loginError, userName, password, isLoggedIn,isSingUpModalOpen,singUpError, firstName, lastName, city, locality, mobile } = this.state;
        return (

            <div className="header container-fluid row">
               

               

                
                <div className="leftSection col-12 col-sm-12 col-mg-3 col-lg-3 text-center my-2"  >
                    <span id="fn" onClick={this.logoClick}>STYLE</span>
                    <br />
                    <span id="ln" onClick={this.logoClick}>SALON</span>
                    <div id="google_translate_element" ></div>
                </div>
                <div className="rightSection col-12 col-sm-12 col-mg-9 col-lg-9">
                    <div className="row my-3">
                        <div className="col-12 col-sm-12 col-mg-6 col-lg-4 my-1 text-center my-2">
                            <span className="item  cursor-pointer" onClick={() => this.bookAppoClicked()} >Book Appointment</span>
                        </div>
                        <div className="col-12 col-sm-12 col-mg-6 col-lg-4 my-1 text-center my-2">
                            <span className="item " onClick={() => this.salonFinder()}>Salon Finder <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">

                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                            </svg></span>
                        </div>
                        <div className="col-12 col-sm-12 col-mg-6 col-lg-4 my-2 d-none d-lg-block">
                            <div className="row">
                                <span className=" col-4 fb"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                </svg></span>
                                <span className=" col-4 tw">< svg className="social" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                                </svg></span>
                                <span className=" float-end col-4 ins"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                </svg></span>
                            </div>
                        </div>
                   
                    </div>
                    <div className="row">
                        <Navbar className="container" collapseOnSelect expand="lg" variant="dark" className="navBar" sticky="top" >



                            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="navBarToggler" >
                                <a>
                                    <Hamburger />
                                </a>
                            </Navbar.Toggle>
                            <Navbar.Collapse id="responsive-navbar-nav" style={{ width: '100%' }}>
                                <Nav className="mr-auto" style={{ width: '100%' }}>
                                    <Nav.Link href="Home" className="pages" onClick={this.logoClick}> Home</Nav.Link>
                                    <NavDropdown.Divider className="dropdown-deviders" />
                                    <Nav.Link href="#" onClick={this.aboutUsClicked} className="pages">About Us</Nav.Link>
                                    <NavDropdown.Divider className="dropdown-deviders" />
                                    <NavDropdown title="Services" id="collasible-nav-dropdown" className="pages">
                                        <NavDropdown.Item href="#" onClick={this.getnsServiceClicked}>Gents</NavDropdown.Item>
                                        <NavDropdown.Divider className="dropdown-deviders" />
                                        <NavDropdown.Item href="#" onClick={this.ladiesServiceClicked}>Ladies</NavDropdown.Item>

                                    </NavDropdown>
                                    <NavDropdown.Divider className="dropdown-deviders" />
                                    <Nav.Link href="#" onClick={this.registerSalonClicked} className="pages">Register Salon</Nav.Link>
                                    <NavDropdown.Divider className="dropdown-deviders" style={{ color: "white" }} />
                                    {
                                        isLoggedIn === false
                                        ?
                                        <Nav.Link href="#" className="pages" onClick={()=>this.loginClicked()}>LogIn</Nav.Link>
                                        :
                                        <Nav.Link href="#" className="pages" onClick={()=>this.logout()}>{user.firstName}</Nav.Link>
                                    }
                                   
                                </Nav>

                            </Navbar.Collapse>
                        </Navbar>
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
                                <input type="button" className="btn btn-primary" onClick={()=>this.handleLogin()} value="Login" />
                                <input type="button" className="btn" onClick={()=>this.resetLoginForm()} value="Cancel" />
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
                                <label className="form-label">City:</label>
                                <input type="password" value={city} className="form-control" onChange={(event) => this.handleChange(event, 'city')} />
                                <label className="form-label">Locality:</label>
                                <input type="password" value={locality} className="form-control" onChange={(event) => this.handleChange(event, 'locality')} />
                                <label className="form-label">Mobile:</label>
                                <input type="password" value={mobile} className="form-control" onChange={(event) => this.handleChange(event, 'mobile')} />
                                <br />
                                {/* <FacebookLogin
                                    appId="4356797374331461"
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
                                /> */}
                                <br />
                                <br />
                                <input type="button" className="btn btn-primary" onClick={this.handleSingUp} value="Sing Up" />
                                <input type="button" className="btn" onClick={this.resetSingUpForm} value="Cancel" />
                                <br />
                                <hr />
                                <p className="dontHaveAccount">Already have an account? <a className="signUpA pointer" onClick={()=>this.loginClicked()}>Login</a></p>
                            </form>
                        </Modal>
                    </div>
                </div>

            </div>
        );
    }
}
export default withRouter(Header);