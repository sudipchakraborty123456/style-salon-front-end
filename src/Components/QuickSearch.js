import React from 'react';
class QuickSearch extends React.Component {
   
    render() {
        const {image,heading,description} = this.props;
        return(
                <div className="row borderDesign  p-2 mt-2" >
             
                         <img className="col-5 quickSearchImages" src={require('../'+image).default} height="200px" width="auto" alt="sorry!" />
                     
                     <div className="col-7">
                         <h3>{heading}</h3>
                         <a>{description}</a>
                     </div>
                </div>
        )
    }
}
export default QuickSearch;