import React from 'react';
import Header from "../Components/Header";
import Buttom_Section from "../Components/Buttom_Section";
import "../Styles/Login.css"
class Login extends React.Component {
    render() {
        return (
            <>
            <Header/>
            <div className="container outsideBox">
                <div className="row text-center insideBox borderDesign">
                        <h1>Login</h1>
                        <h3>Usernamme:</h3>
                        <input type="text"/>
                        <h3>Password:</h3>
                        <input type="password"/>
                        <div className="facebook borderDesign my-3">
                        <img src={require("../Images/facebookIcon.png").default} alt="Sorry!"/>
                            <span>Login With Facebook</span>
                        </div>
                        <div className="google borderDesign my-3">
                        <img src={require("../Images/googleIcon.png").default} alt="Sorry!"/>
                            <span className="mx-3">Login With Google</span>
                        </div>
                        <div>
                            <button className="btn">Login</button>
                        </div>
                        <hr/>
                        <div>
                            <span>Don't have account? <a>SignUp</a></span>
                        </div>
                </div>
            </div>
            <Buttom_Section/>
            </>
        )
    }
}
export default Login