import React from 'react';
import GentsFilteroptions from './GentsFilterOption';
import LadiesFilperOptions from './LadiesFilterOption';
import SalonDetails from "../Components/SalonDetails";
import "../Styles/salonFilter.css"
import Header from "../Components/Header";
import Buttom_Section from "../Components/Buttom_Section";
import axios from "axios";


const constants = require("../Constants");
const API_URL = constants.API_URL;

class SalonFinder extends React.Component {
    constructor() {
        super();
        this.state = {
            salons: [],
            selectedGender: null,
            page: 1,
            cityes: [],
            locations: null,
            selectedCity: "",
            cityLocations: null,
            selectedCityLocationId: null,
            selectedCityLocations: [],
            selectedCityId: "",
            sort: null,
            lcost: null,
            hcost: null,
            pageSize: 0,
            mainServicesList: [],
            service: [],
            subServices: []
        };
    }
    componentDidMount = () => {
        // debugger;
        const reqData = {
            page: this.state.page,
            getAllSalon: true
        }
        axios({
            method: "POST",
            url: `${API_URL}/filterSalons`,
            //  headers : {"Content-Type" : "applicaton/json"},
            data: reqData
        })
            .then(result => {
                //   debugger;
                const salons = result.data;
                const totalResults = result.data.totalResults;
                const pageSize = result.data.pageSize;

                let quotient = totalResults / pageSize;
                quotient = Math.floor(quotient);
                let noOFPages = quotient;

                const remainder = totalResults % pageSize;
                if (remainder > 0) {
                    noOFPages = quotient + 1;
                }
                // console.log(result);
                this.setState({

                    salons: salons.salons,
                    pageSize: noOFPages
                });

                //console.log(salons);
            })
            .catch(error => {
                console.log(error);
            });


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

    }
    getCityLocation = () => {
        const cityLocations = this.state.locations.filter(city => city.cityId == this.state.selectedCityId);
        const selectedCityLocations = cityLocations.map((item, index) => { return (item) })
        const selectedCityLocationId = cityLocations.map((item, index) => { return (item.locationId) })
        console.log(selectedCityLocations)
        this.setState({
            selectedCityLocations: selectedCityLocations
        })
    }
    filterSalons = () => {
        // debugger;
        const { selectedCityId,
            service,
            hcost,
            lcost,
            sort,
            page,
            selectedLocationId,
            selectedGender,
            subServices
        } = this.state;
        //console.log(selectedLocation)
        var req = { page: page }
        if (selectedLocationId) {
            req.locality = selectedLocationId;
        }
        if (selectedGender) {
            req.gender = selectedGender
        }

        if (service) {
            if (service.length > 0) {
                req.service = service
            }
        }
        if (subServices) {
            req.subServices = subServices
        }
        if (sort) {
            req.sort = sort
        }
        //debugger;
        //console.log(req.hcost+","+req.lCost)
        if (hcost != undefined && lcost != undefined) {

            req.hcost = hcost
            req.lcost = lcost

        }
        if (selectedCityId) {
            req.city = selectedCityId;
        }
        axios({
            method: "POST",
            url: `${API_URL}/filtersalons`,
            //  headers : {"Content-Type" : "applicaton/json"},
            data: req
        }).then(result => {
            //console.log(result)
            //  debugger;
            const totalResults = result.data.totalResults;
            const pageSize = result.data.pageSize;

            let quotient = totalResults / pageSize;
            quotient = Math.floor(quotient);
            let noOFPages = quotient;

            const remainder = totalResults % pageSize;
            if (remainder > 0) {
                noOFPages = quotient + 1;
            }



            // console.log(noOFPages)
            this.setState({
                salons: result.data.salons,
                page: result.data.pageNo,
                "Number of Salons found": result.data.totalResults,
                pageSize: noOFPages
            });
            console.log("salonList stored successfully")

        }).catch(error => { console.log(error); });
    }
    genderSelected = (e) => {
        //  debugger;
        if (e.target.value === 'Gents') {
            this.setState({
                selectedGender: 'Gents'
            })
            setTimeout(() => this.filterSalons(), 0);
        } else if (e.target.value === 'Ladise') {
            this.setState({
                selectedGender: 'Ladise'
            });
            setTimeout(() => this.filterSalons(), 0);

        } else {
            this.setState({
                selectedGender: ''
            });
            setTimeout(() => this.filterSalons(), 0);

        }
    }

    salonDetailsClicked = () => {
        this.props.history.push("/details");
    }
    getPages = () => {
        //   debugger;
        const { pageSize } = this.state;
        let pages = [];
        for (let i = 0; i < pageSize; i++) {
            pages.push(<span key={i} onClick={() => this.handlePage(i + 1)} className="paginationButton">{i + 1}</span>)
        }
        return pages;
    }
    handlePage(page) {
        debugger;
        const { pageSize } = this.state;
        if (page < 1 || page > pageSize) return;
        this.setState({
            page: page
        });
        setTimeout(() => {
            this.filterSalons();
        }, 0);
    }
    citySelected = (event) => {
        const selectedCity = event.target.value;
        const selectedCitylist = this.state.locations.find(o => o.city === selectedCity);
        const selectedCityId = selectedCitylist.cityId;
        this.setState({
            selectedCityId: selectedCityId,
            selectedLocationId: null
        }, () => {
            this.filterSalons()
        })
        setTimeout(() => this.getCityLocation(), 0);
        document.getElementById("locationSelect").selectedIndex = "-1"
        // this.componentDidMount();
    }

    locationSelected = (e) => {
        const selectedLocationId = e.target.value;
        this.setState({
            selectedLocationId: selectedLocationId
        }, () => { this.filterSalons() })
    }
    resetAllClicked = () => {
        this.setState({
            selectedGender: null,
            page: 1,
            lcost: null,
            hcost: null,

            selectedCity: "",
            sort: null,


            selectedCityId: ""
        }, () => this.componentDidMount())
        document.getElementById('rst').selectedIndex = "0"
        document.getElementById("genderRst").selectedIndex = "0"
        document.getElementById("sort1").checked = true;
        
        //document.getElementsByClassName("cost").checked = false;

    }
    handelCostChanged = (e, lcost, hcost) => {
        this.setState({
            lcost: lcost,
            hcost: hcost
        });
        setTimeout(() => this.filterSalons());
    }
    sortChanged = (e) => {
        debugger;
        const sort = e.target.value;
        const sort1 = parseInt(sort);
        this.setState({
            sort: sort1
        });
        setTimeout(() => this.filterSalons(), 0)
    }

    subServicesClicked = (e) => {
        debugger
        console.log(e.target.checked);
        if (e.target.checked === true) {
            debugger
            const subServices = this.state.subServices;
            subServices.push(parseInt(e.target.value));
            let uniqSubServices = [... new Set(subServices)];
            this.setState({
                subServices: uniqSubServices
            })
            setTimeout(() => this.filterSalons(), 0)
        } else {
            debugger
            const subServices = this.state.subServices;
            const index = subServices.lastIndexOf(parseInt(e.target.value))
            subServices.splice(index,1)
            this.setState({
                subServices: subServices
            })
            setTimeout(() => this.filterSalons(), 0)
        }

    }
    goToSalonDetails=(id)=>{
        debugger
        const url = `/details?id=${id}`;
        this.props.history.push(url);
    }
    render() {
        const { salons, page, selectedGender, cityes, selectedCityLocations, mainServicesList } = this.state;
        console.log(mainServicesList);
        let currPage = page;
        // debugger;
        return (
            <>
                <Header />

                <div className="container-fluid">
                    <h1 className="text-center my-2">Saoln Finder</h1>
                    <div className='row'>
                        <div className='col-12 col-sm-12 col-mg-4 col-lg-4 p-3 filter '>
                            <div className='col-11 borderDesign p-3 ml-3'>
                                <div className='row'>
                                    <h2 className='col-12 col-sm-12 col-mg-4 col-lg-4 text-center'>Filters</h2>
                                    <button onClick={() => this.resetAllClicked()} className="btn btn-primary col-12 col-sm-12 col-mg-8 col-lg-8 text-center" style={{ margin: '0 auto' }}> Reset All Filter</button>
                                </div>

                                <h4>Select City</h4>
                                <select id="rst" onChange={(event) => this.citySelected(event)} >
                                    <option selected disabled>Choose City</option>
                                    {cityes.map((item, index) => {
                                        return (<option key={index} >{item}</option>)
                                    })}

                                </select>
                                <h4>Select Location</h4>
                                <select id="locationSelect" onChange={(e) => this.locationSelected(e)}>
                                    <option selected disabled >Choose City First</option>
                                    {

                                        selectedCityLocations.map((item, index) => {
                                            return (<option value={item.locationId} key={index}>{item.name}</option>)
                                        })
                                    }
                                </select>
                                <h4>Gender</h4>
                                <select id="genderRst" onChange={(e) => this.genderSelected(e)}>
                                    <option value="" selected>Select Gender</option>
                                    <option value="Gents">Gents</option>
                                    <option value="Ladise">Ladise</option>
                                </select>
                                {/* <label className="labelOptions"><input type="checkbox" key={index} id="mainService" value="1" onChange={(e) => this.maainServiceChecked(e)} />Hair Cut & Finish</label> */}

                                {
                                    selectedGender == 'Gents'
                                        ?
                                        <div>
                                            <div>
                                                Hair Cut & Finish
                                            </div>
                                            <div style={{ paddingLeft: "10%" }}>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="1" onChange={(e) => this.subServicesClicked(e)} />Cut and Hair Care</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="2" onChange={(e) => this.subServicesClicked(e)} />Shampoo & Conditioning</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="3" onChange={(e) => this.subServicesClicked(e)} />Head Massage</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="4" onChange={(e) => this.subServicesClicked(e)} />Beard Styling</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="5" onChange={(e) => this.subServicesClicked(e)} />Hair/Beard Colouring</label>
                                            </div>
                                            <br />
                                            <div >
                                                Hair Colour
                                            </div>
                                            <div style={{ paddingLeft: "10%" }}>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="6" onChange={(e) => this.subServicesClicked(e)} />Hair Colour(Ammonia & Ammonia Free)</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="7" onChange={(e) => this.subServicesClicked(e)} />Hi - Lites</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="8" onChange={(e) => this.subServicesClicked(e)} />Beard Colour</label>
                                            </div>
                                            <br />

                                            <div>
                                                Hair Texture
                                            </div>
                                            <div style={{ paddingLeft: "10%" }}>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="9"  onChange={(e) => this.subServicesClicked(e)} />Straightening</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="10"  onChange={(e) => this.subServicesClicked(e)} />Smoothening</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="11"  onChange={(e) => this.subServicesClicked(e)} />Rebonding</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="12"  onChange={(e) => this.subServicesClicked(e)} />Perming</label>
                                            </div>
                                            <br />
                                            <div>
                                                Hair Treatments
                                            </div>
                                            <div style={{ paddingLeft: "10%" }}>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="13"  onChange={(e) => this.subServicesClicked(e)}/>Hair Spa</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="14"  onChange={(e) => this.subServicesClicked(e)}/>Advanced Moisturising</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="15"  onChange={(e) => this.subServicesClicked(e)}/>Scalp Treatments</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="16"  onChange={(e) => this.subServicesClicked(e)}/>Colour Protection</label>
                                            </div>
                                            <br />
                                            <div>
                                                Skin Care
                                            </div>
                                            <div style={{ paddingLeft: "10%" }}>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="17"  onChange={(e) => this.subServicesClicked(e)}/>Clean Ups</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="18"  onChange={(e) => this.subServicesClicked(e)}/>Facials</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="19"  onChange={(e) => this.subServicesClicked(e)}/>Organic Treatments</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="20"  onChange={(e) => this.subServicesClicked(e)}/>Manicure</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="21"  onChange={(e) => this.subServicesClicked(e)}/>Pedicure</label>
                                            </div>
                                            <br />
                                            <div>
                                                Beard Grooming
                                            </div>
                                            <div style={{ paddingLeft: "10%" }}>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="22"  onChange={(e) => this.subServicesClicked(e)} />Beard Trim</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="23"  onChange={(e) => this.subServicesClicked(e)} />Beard Colour</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="24"  onChange={(e) => this.subServicesClicked(e)} />Beard Styling</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="25"  onChange={(e) => this.subServicesClicked(e)} />Shave</label>
                                                <label className="labelOptions">< input id="subService" type="checkbox" value="26"  onChange={(e) => this.subServicesClicked(e)} />Luxury Shave & Beard Spa</label>
                                            </div>
                                        </div>
                                        :
                                        (
                                            selectedGender == 'Ladise'
                                                ?
                                                <div>
                                                    <div>
                                                        Hair Styling
                                                    </div>
                                                    <div style={{ paddingLeft: "10%" }}>
                                                        <label className="labelOptions" className="labelOptions"><input type="checkbox" value="27"  onChange={(e) => this.subServicesClicked(e)}/>Hair Cut</label>
                                                        <label className="labelOptions"><input type="checkbox" value="28"  onChange={(e) => this.subServicesClicked(e)}/>Ironing</label>
                                                        <label className="labelOptions"><input type="checkbox" value="29"  onChange={(e) => this.subServicesClicked(e)}/>Global Colouring</label>
                                                        <label className="labelOptions"><input type="checkbox" value="30"  onChange={(e) => this.subServicesClicked(e)}/>Blow Dry</label>
                                                        <label className="labelOptions"><input type="checkbox" value="31"  onChange={(e) => this.subServicesClicked(e)}/>Root Touch Up</label>
                                                        <label className="labelOptions"><input type="checkbox" value="32"  onChange={(e) => this.subServicesClicked(e)}/>Shampoo & Conditioning</label>
                                                        <label className="labelOptions"><input type="checkbox" value="33"  onChange={(e) => this.subServicesClicked(e)}/>Head Massage</label>
                                                        <label className="labelOptions"><input type="checkbox" value="34"  onChange={(e) => this.subServicesClicked(e)}/>Roller Setting</label>
                                                        <label className="labelOptions"><input type="checkbox" value="35"  onChange={(e) => this.subServicesClicked(e)}/>Oiling</label>
                                                    </div>
                                                    <br />
                                                    <div>
                                                        Make Up
                                                    </div>
                                                    <div style={{ paddingLeft: "10%" }}>
                                                        <label className="labelOptions"><input type="checkbox" value="36"   onChange={(e) => this.subServicesClicked(e)}/>Party Make Up</label>
                                                        <label className="labelOptions"><input type="checkbox" value="37"  onChange={(e) => this.subServicesClicked(e)}/>Engagement Make Up</label>
                                                        <label className="labelOptions"><input type="checkbox" value="38"  onChange={(e) => this.subServicesClicked(e)}/>Bridal & Reception Make Up</label>
                                                        <label className="labelOptions"><input type="checkbox" value="39"  onChange={(e) => this.subServicesClicked(e)}/>Base Make Up</label>
                                                        <label className="labelOptions"><input type="checkbox" value="40"  onChange={(e) => this.subServicesClicked(e)}/>Eye Make Up</label>
                                                    </div>
                                                    <br />

                                                    <div>
                                                        Hair Texture
                                                    </div>
                                                    <div style={{ paddingLeft: "10%" }}>
                                                        <label className="labelOptions"><input type="checkbox" value="41"  onChange={(e) => this.subServicesClicked(e)}/>Rebonding</label>
                                                        <label className="labelOptions"><input type="checkbox" value="42"  onChange={(e) => this.subServicesClicked(e)}/>Perming</label>
                                                        <label className="labelOptions"><input type="checkbox" value="43"  onChange={(e) => this.subServicesClicked(e)}/>Keratin</label>
                                                        <label className="labelOptions"><input type="checkbox" value="44"  onChange={(e) => this.subServicesClicked(e)}/>Colour Protection</label>
                                                        <label className="labelOptions"><input type="checkbox" value="45"  onChange={(e) => this.subServicesClicked(e)}/>Smoothening</label>
                                                    </div>
                                                    <br />
                                                    <div>
                                                        Hair Treatments
                                                    </div>
                                                    <div style={{ paddingLeft: "10%" }}>
                                                        <label className="labelOptions"><input type="checkbox" value="46"  onChange={(e) => this.subServicesClicked(e)}/>Spa Treatments</label>
                                                        <label className="labelOptions"><input type="checkbox" value="47"  onChange={(e) => this.subServicesClicked(e)}/>Volumizing</label>
                                                        <label className="labelOptions"><input type="checkbox" value="48"  onChange={(e) => this.subServicesClicked(e)}/>Advanced Hair Moisturising</label>
                                                        <label className="labelOptions"><input type="checkbox" value="49"  onChange={(e) => this.subServicesClicked(e)}/>Scalp Treatments</label>
                                                    </div>
                                                    <br />
                                                    <div>
                                                        Facials & Rituals
                                                    </div>
                                                    <div style={{ paddingLeft: "10%" }}>
                                                        <label className="labelOptions"><input type="checkbox" value="50"  onChange={(e) => this.subServicesClicked(e)}/>Bleach</label>
                                                        <label className="labelOptions"><input type="checkbox" value="51"  onChange={(e) => this.subServicesClicked(e)}/>Luxury Facials/Rituals</label>
                                                        <label className="labelOptions"><input type="checkbox" value="52"  onChange={(e) => this.subServicesClicked(e)}/>Clean Ups</label>
                                                        <label className="labelOptions"><input type="checkbox" value="53"  onChange={(e) => this.subServicesClicked(e)}/>Body Polishing/Rejuvenation</label>
                                                        <label className="labelOptions"><input type="checkbox" value="54"  onChange={(e) => this.subServicesClicked(e)}/>Threading</label>
                                                    </div>
                                                    <br />
                                                    <div>
                                                        Hand & Feet
                                                    </div>
                                                    <div style={{ paddingLeft: "10%" }}>
                                                        <label className="labelOptions"><input type="checkbox" value="55"  onChange={(e) => this.subServicesClicked(e)}/>Manicure</label>
                                                        <label className="labelOptions"><input type="checkbox" value="56"  onChange={(e) => this.subServicesClicked(e)}/>Spa Pedicure</label>
                                                        <label className="labelOptions"><input type="checkbox" value="57"  onChange={(e) => this.subServicesClicked(e)}/>Pedicure</label>
                                                        <label className="labelOptions"><input type="checkbox" value="58"  onChange={(e) => this.subServicesClicked(e)}/>Waxing</label>
                                                        <label className="labelOptions"><input type="checkbox" value="59"  onChange={(e) => this.subServicesClicked(e)}/>Spa Manicure</label>
                                                    </div>
                                                    <br />
                                                    <div>
                                                        Nail Care
                                                    </div>
                                                    <div style={{ paddingLeft: "10%" }}>
                                                        <label className="labelOptions"><input type="checkbox" value="60"  onChange={(e) => this.subServicesClicked(e)}/>Nail Paint</label>
                                                        <label className="labelOptions"><input type="checkbox" value="61"  onChange={(e) => this.subServicesClicked(e)}/>Nail Art</label>
                                                        <label className="labelOptions"><input type="checkbox" value="62"  onChange={(e) => this.subServicesClicked(e)}/>Nail Filling</label>
                                                    </div>
                                                </div>
                                                :
                                                <div>

                                                </div>
                                        )
                                }
                                <h4>Cost</h4>
                                <label className="cuisineSelection"><input className="cost" type="radio" name="cost" onChange={(e) => { this.handelCostChanged(e, 0, 500) }} />Less then ₹ 500  </label>
                                <br />
                                <label className="cuisineSelection"><input className="cost" type="radio" name="cost" onChange={(e) => { this.handelCostChanged(e, 500, 1000) }} /> ₹ 500 to ₹ 1000 </label>
                                <br />
                                <label className="cuisineSelection"><input className="cost" type="radio" name="cost" onChange={(e) => { this.handelCostChanged(e, 1000, 1500) }} /> ₹ 1000 to ₹ 1500 </label>
                                <br />
                                <label className="cuisineSelection"><input className="cost" type="radio" name="cost" onChange={(e) => { this.handelCostChanged(e, 1500, 2000) }} /> ₹ 1500 to ₹ 2000 </label>
                                <br />
                                <label className="cuisineSelection"><input className="cost" type="radio" name="cost" onChange={(e) => { this.handelCostChanged(e, 2000, 100000) }} /> ₹ 2000+ </label>
                                <h4>Sort</h4>
                                <label for="sort1"><input type="radio" defaultChecked name="sort" id="sort1" value="1" onClick={(e) => this.sortChanged(e)} />Price low to high</label>
                                <br />
                                <label for="sort2"><input type="radio" name="sort" id="sort2" value="-1" onClick={(e) => this.sortChanged(e)} />Price high to low</label>
                            </div>
                        </div>
                        <div className=' col-12 col-sm-12 col-mg-8 col-lg-8 rightSide p-3container'>

                            {

                                salons.length != 0 ?
                                    salons.map((item, index) => {
                                        //console.log(item);
                                        return (
                                            <a onClick={()=>this.goToSalonDetails(item._id)}><SalonDetails  key={index}item={item}  /></a>
                                        );

                                    })
                                    :
                                    <div className="row">
                                        <div className="nosalon col-12">
                                            <div className=" nosalonHeading">No salons for the selected filters</div>
                                        </div>
                                    </div>

                            }



                            {/* <a onClick={() => this.salonDetailsClicked()}><SalonDetails /></a> */}

                            {

                                salons.length > 0
                                    ?
                                    <div className=" paginationOptions">

                                        <span className="paginationButton" onClick={() => this.handlePage(--currPage)}>&lt;</span>
                                        {

                                            this.getPages()

                                        }
                                        <span className="paginationButton" onClick={() => this.handlePage(++currPage)}>&gt;</span>
                                    </div>
                                    :
                                    <div></div>
                            }
                        </div>
                    </div>
                </div>
                <Buttom_Section />
            </>
        );
    }
}
export default SalonFinder;