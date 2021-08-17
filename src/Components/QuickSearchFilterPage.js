import React from 'react';
import Header from '../Components/Header';
import Buttom_Section from "../Components/Buttom_Section";
import SalonDetails from './SalonDetails';
class QuickSearchFilterPage extends React.Component {
    render() {
        return (
            <>
                <Header />
                <div className="container">
                    <h2 className="text-center">Salon which provide <span className="fw-bold">Hair Cut & Finish</span> for <span className="fw-bold">Gents</span></h2>
                    <div className="row">
                        <div className="col-12 col-sm-12 col-mg-4 col-lg-4 ">
                           
                            <div>
                            <div className='col-11 borderDesign p-3 ml-3' style={{height:'70vh',margin: '0 auto'}}>
                                <div className='row my-3'>
                                    <h2 className='col-12 col-sm-12 col-mg-4 col-lg-4'>Filters</h2>
                                    <button className="btn btn-primary col-12 col-sm-12 col-mg-8 col-lg-8">Reset All Filter</button>
                                </div>

                                <h4 className="my-2">Select City</h4>
                                <select>
                                    <option value="">Kolkata</option>
                                    <option value="">Mumbai</option>
                                    <option value="">Channai</option>
                                </select>
                                <h4 className="my-2">Select Location</h4>
                                <select>
                                    <option value="">Kolkata</option>
                                    <option value="">Mumbai</option>
                                    <option value="">Channai</option>
                                </select>
                                <h4 className="my-2">Select Services</h4>
                                <label><input type="checkBox"/>Cut and Hair Care</label>
                                <br/>
                                <label><input type="checkBox"/>Shampoo & Conditioning</label>
                                <br/>
                                <label><input type="checkBox"/>Head Massage</label>
                                <br/>
                                <label><input type="checkBox"/>Beard Styling</label>
                                <br/>
                                <label><input type="checkBox"/>Hair/Beard Colouring</label>
                            </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-12 col-mg-8 col-lg-8">

                            <a>
                                <SalonDetails />
                            </a>
                            <a>
                                <SalonDetails />
                            </a>
                            

                            <div className=" paginationOptions my-2">

                                <span className="paginationButton borderDesign" >&lt;</span>
                                <span className="paginationButton borderDesign">1</span>
                                <span className="paginationButton borderDesign">2</span>
                                <span className="paginationButton borderDesign" >&gt;</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Buttom_Section />
            </>
        )
    }
}
export default QuickSearchFilterPage;