import React from 'react';
import "../Styles/GentsFilterOption.css"
import axios from 'axios';

const constants = require("../Constants");
const API_URL = constants.API_URL;

class GentsFilterOptions extends React.Component {
    constructor() {
        super();
        this.state = {
            checked: false,
            salons: [],
            mainServices : []
        }
    }
    componentDidMount () {
        debugger
        axios.get(`${API_URL}/getAllSalonByGender/Gents`)
            .then(result => {
            
                debugger;
                const salons = (result.data.salons);
                let a=[];
                salons.find((salon) => {
                    salon.services.find((s)=>{
                        a.push(s.name)
                    })
                })
                a=[...new Set(a)]
                
                this.setState=({
                    salons:salons,
                    mainServices : a
                },()=>console.log(this.state.mainServices));
            })
            
            .catch(error => {
                debugger
                console.log(error);
            });

    }
    maainServiceChecked = (e) => {
        debugger;
        let checkedStatus = document.getElementById("mainService").checked
        console.log(checkedStatus);
        if (checkedStatus === true) {
            this.setState({
                checked: true
            })
            setTimeout(() => {
                this.props.fun(e.target.value)
            }, 0);
        } else {
            this.setState({
                checked: false
            })
            setTimeout(() => {
                this.props.remfun()
            }, 0);
        }


    }
    render() {
        debugger;
        const {mainServices} = this.state
        console.log(mainServices);
        return (
            <div>
                <div>
                    {
                        mainServices.length > 0 
                        ?
                        mainServices.map((item,index ) => {
                            return(
                            <label className="labelOptions"><input type="checkbox" key={index} id="mainService" value={item} onChange={(e) => this.maainServiceChecked(e)} />{item}</label>
                            )
                        })
                        :
                        <div></div>
                    }
                   
                </div>
                <div>
                    {
                        this.state.checked === true
                            ?
                            <div>
                                <label className="labelOptions"><input type="checkbox" />Shampoo & Conditioning</label>
                                <label className="labelOptions"><input type="checkbox" />Head Massage</label>
                                <label className="labelOptions"><input type="checkbox" />Beard Styling</label>
                                <label className="labelOptions"><input type="checkbox" />Hair/Beard Colouring</label>
                            </div>
                            :
                            <div></div>
                    }

                </div>
                {/* <br/>
                <div>
                Hair Colour
                </div>
                <div>
                    <label className="labelOptions"><input type="checkbox"/>Hair Colour(Ammonia & Ammonia Free)</label>
                    <label className="labelOptions"><input type="checkbox"/>Hi - Lites</label>
                    <label className="labelOptions"><input type="checkbox"/>Beard Colour</label>
                </div>
                <br/>

                <div>
                Hair Texture
                </div>
                <div>
                    <label className="labelOptions"><input type="checkbox"/>Straightening</label>
                    <label className="labelOptions"><input type="checkbox"/>Smoothening</label>
                    <label className="labelOptions"><input type="checkbox"/>Rebonding</label>
                    <label className="labelOptions"><input type="checkbox"/>Perming</label>
                </div>
                <br/>
                <div>
                Hair Treatments
                </div>
                <div>
                    <label className="labelOptions"><input type="checkbox"/>Hair Spa</label>
                    <label className="labelOptions"><input type="checkbox"/>Advanced Moisturising</label>
                    <label className="labelOptions"><input type="checkbox"/>Scalp Treatments</label>
                    <label className="labelOptions"><input type="checkbox"/>Colour Protection</label>
                </div>
                <br/>
                <div>
                Skin Care
                </div>
                <div>
                    <label className="labelOptions"><input type="checkbox"/>Clean Ups</label>
                    <label className="labelOptions"><input type="checkbox"/>Facials</label>
                    <label className="labelOptions"><input type="checkbox"/>Organic Treatments</label>
                    <label className="labelOptions"><input type="checkbox"/>Manicure</label>
                    <label className="labelOptions"><input type="checkbox"/>Pedicure</label>
                </div>
                <br/>
                <div>
                Beard Grooming
                </div>
                <div>
                    <label className="labelOptions"><input type="checkbox"/>Beard Trim</label>
                    <label className="labelOptions"><input type="checkbox"/>Beard Colour</label>
                    <label className="labelOptions"><input type="checkbox"/>Beard Styling</label>
                    <label className="labelOptions"><input type="checkbox"/>Shave</label>
                    <label className="labelOptions"><input type="checkbox"/>Luxury Shave & Beard Spa</label>
                </div> */}
            </div>
        )
    }
}
export default GentsFilterOptions;