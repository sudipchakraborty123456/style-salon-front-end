import React from 'react';
import Header from '../Components/Header';
import Buttom_Section from "../Components/Buttom_Section";
import SalonDetails from './SalonDetails';
import axios from "axios";
import queryString from "query-string";
const constants = require("../Constants");
const API_URL = constants.API_URL;
class QuickSearchFilterPage extends React.Component {
    constructor() {
        super();
        this.state = {
            salons: [],
            cityes: [],
            selectedServices: null,
            gender: "",
            name: "",
            locations: null,
            selectedLocationId: null,
            selectedCityLocations: [],
            page: 1,
            serviceslist: [],
            subServices: [],
            hcost: null,
            lcost: null,
            sort: null
        }
    }
    componentDidMount = () => {
        // debugger
        const qs = queryString.parse(this.props.location.search);
        const { service, gender, name } = qs;
        debugger;
        this.setState({

            selectedServices: parseInt(service),
            gender: gender,
            name: name
        })
        let s = [];
        s.push(parseInt(service));
        const reqData = {
            page: this.state.page,
            gender: gender,
            service: s
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
                debugger;
                const city = result.data.city;
                this.setState({
                    cityes: city
                })

                // console.log(result);



            })
            .catch(error => {
                console.log(error);
            });

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

        axios.get(`${API_URL}/getAllServicesByMainServiceId/${service}`)
            .then(result => {
                debugger;
                this.setState({
                    serviceslist: result.data.services[0].subServices
                })


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
        let s = [];
        s.push(parseInt(this.state.selectedServices));
        const { selectedCityId,
            selectedServices,
            hcost,
            lcost,
            sort,
            page,
            selectedLocationId,
            gender,
            subServices
        } = this.state;
        //console.log(selectedLocation)
        var req = { page: page }
        if (selectedLocationId) {
            req.locality = selectedLocationId;
        }
        if (gender) {
            req.gender = gender
        }
        debugger
        if (s) {
            if (s.length > 0) {
                req.service = s
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
    citySelected = (event) => {
        debugger
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
        document.getElementById("locationSelect").selectedIndex = "0"
        // this.componentDidMount();
    }
    locationSelected = (e) => {
        const selectedLocationId = e.target.value;
        this.setState({
            selectedLocationId: selectedLocationId
        }, () => { this.filterSalons() })
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

    subServicesClicked = (e) => {
        //  debugger
        console.log(e.target.checked);
        if (e.target.checked === true) {
            // debugger
            const subServices = this.state.subServices;
            subServices.push(parseInt(e.target.value));
            let uniqSubServices = [... new Set(subServices)];
            this.setState({
                subServices: uniqSubServices
            })
            setTimeout(() => this.filterSalons(), 0)
        } else {
            // debugger
            const subServices = this.state.subServices;
            const index = subServices.lastIndexOf(parseInt(e.target.value))
            subServices.splice(index, 1)
            this.setState({
                subServices: subServices
            })
            setTimeout(() => this.filterSalons(), 0)
        }

    }
    goToSalonDetails = (id) => {
        //debugger
        const url = `/details?id=${id}`;
        this.props.history.push(url);
    }
    handelCostChanged = (e, lcost, hcost) => {
        this.setState({
            lcost: lcost,
            hcost: hcost
        });
        setTimeout(() => this.filterSalons());
    }
    sortChanged = (e) => {
        const sort = e.target.value;
        const sort1 = parseInt(sort);
        this.setState({
            sort: sort1
        });
        setTimeout(() => this.filterSalons(), 0)
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
        // document.getElementById("genderRst").selectedIndex = "0"
        document.getElementById("sort1").checked = true;

        //document.getElementsByClassName("cost").checked = false;

    }
    render() {
        debugger
        const { salons, page, gender, name, cityes, serviceslist, selectedCityLocations } = this.state;
        let currPage = page;
        return (
            <>
                <Header />
                <div className="container">
                    <h2 className="text-center">This salons provide <span className="fw-bold">{name}</span> for <span className="fw-bold">{gender}</span></h2>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-mg-4 col-lg-4 ">

                            <div>
                                <div className='col-11 borderDesign p-3 ml-3' style={{ height: 'auto', margin: '0 auto' }}>
                                    <div className='row my-3'>
                                        <h2 className='col-12 col-sm-12 col-mg-4 col-lg-4'>Filters</h2>
                                        <button className="btn btn-primary col-12 col-sm-12 col-mg-8 col-lg-8" onClick={() => this.resetAllClicked()}>Reset All Filter</button>
                                    </div>

                                    <h4 className="my-2 " id="rst">Select City</h4>
                                    <select onChange={(event) => this.citySelected(event)} >
                                        <option>Select city</option>
                                        {
                                            cityes
                                                ?
                                                cityes.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item}>{item}</option>
                                                    )
                                                })
                                                :
                                                <option></option>
                                        }


                                    </select>
                                    <h4 className="my-2">Select Location</h4>
                                    <select id="locationSelect" onChange={(e) => this.locationSelected(e)}>
                                        <option selected disabled >Choose City First</option>
                                        {

                                            selectedCityLocations.map((item, index) => {
                                                return (<option value={item.locationId} key={index}>{item.name}</option>)
                                            })
                                        }
                                    </select>
                                    <h4 className="my-2">Select Services</h4>
                                    {
                                        serviceslist.map((item, index) => {
                                            return (
                                                <a>
                                                    <label><input key={index} value={item.id} type="checkBox" onChange={(e) => this.subServicesClicked(e)} />{item.name}</label>
                                                    <br />
                                                </a>
                                            )
                                        })
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
                        </div>

                        <div className="col-12 col-sm-12 col-mg-8 col-lg-8 ">
                            {
                                salons.length > 0
                                 ?
                                 <a>
                                 {
                                     salons.map((item, index) => {
                                         return (
                                             <a onClick={() => this.goToSalonDetails(item._id)}>
                                                 <SalonDetails key={index} item={item} />
                                             </a>
                                         )
                                     })
                                 }
 
 
 
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
                             </a>
                                 :
                                 <a>
                                      <div className="row  ">
                                        <div className="nosalon borderDesign col-12 ">
                                            <div className=" nosalonHeading ">No salons for the selected filters</div>
                                        </div>
                                    </div>
                                 </a>
                            }
                           
                        </div>
                    </div>
                </div>
                <Buttom_Section />
            </>
        )
    }
}
export default QuickSearchFilterPage;