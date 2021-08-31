import React from 'react';
class SalonDetails extends React.Component {
    constructor(props) {
        super();

    }

    reating = (reating) => {
        //  debugger;
        let items = [];
        for (let i = 0; i < reating; i++) {
            items.push(<span key={i}><img src={require("../Images/star_icon.png").default} height="20px" /></span>)
        }
        return (items)
    }
    render() {
        const { item } = this.props
       // debugger
        return (

            <div className="  p-3">
                <div className="col-11 salonDetails p-3 borderDesign" style={{ margin: "0 auto" }}>
                    <div className='row'>
                        <img className='col-4' src={require("../Images/salon1.jpg").default} alt="Sorry!" style={{ borderRadius: "10%" }} />
                        <div className="col-8">
                            <h1>{item.name}</h1>
                            <h4>{item.city}</h4>
                            <h3>{item.locality}</h3>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-4">
                            <h4>Services</h4>
                            <h4>Gender</h4>
                            <h4>Reating</h4>
                        </div>
                        <div className="col-8">
                            {
                                item.length != 0
                                    ?
                                    item.services.map((item, index) => {
                                        return (
                                            <span className="" style={{marginBottom:"8px"}} key={index}>{item.name}, </span>
                                        )
                                    })
                                    :
                                    <a></a>
                            }
                            <br />
                            {
                                item.length != 0
                                    ?
                                    <span >{item.gender} </span>
                                    :
                                    <span></span>
                            }
                            <div>
                                {
                                    this.reating(item.rating)
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SalonDetails;