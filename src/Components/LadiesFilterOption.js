import React from 'react';
class LadiseFilterOption extends React.Component {
    render() {
        return (
            <div>
                <div>
                Hair Styling
                </div>
                <div>
                    <label className="labelOptions" className="labelOptions"><input type="checkbox"/>Hair Cut</label>
                    <label className="labelOptions"><input type="checkbox"/>Ironing</label>
                    <label className="labelOptions"><input type="checkbox"/>Global Colouring</label>
                    <label className="labelOptions"><input type="checkbox"/>Blow Dry</label>
                    <label className="labelOptions"><input type="checkbox"/>Root Touch Up</label>
                    <label className="labelOptions"><input type="checkbox"/>Shampoo & Conditioning</label>
                    <label className="labelOptions"><input type="checkbox"/>Head Massage</label>
                    <label className="labelOptions"><input type="checkbox"/>Roller Setting</label>
                    <label className="labelOptions"><input type="checkbox"/>Oiling</label>
                </div>
                <br/>
                <div>
                Make Up
                </div>
                <div>
                    <label className="labelOptions"><input type="checkbox"/>Party Make Up</label>
                    <label className="labelOptions"><input type="checkbox"/>Engagement Make Up</label>
                    <label className="labelOptions"><input type="checkbox"/>Bridal & Reception Make Up</label>
                    <label className="labelOptions"><input type="checkbox"/>Base Make Up</label>
                    <label className="labelOptions"><input type="checkbox"/>Eye Make Up</label>
                </div>
                <br/>

                <div>
                Hair Texture
                </div>
                <div>
                    <label className="labelOptions"><input type="checkbox"/>Rebonding</label>
                    <label className="labelOptions"><input type="checkbox"/>Perming</label>
                    <label className="labelOptions"><input type="checkbox"/>Keratin</label>
                    <label className="labelOptions"><input type="checkbox"/>Colour Protection</label>
                    <label className="labelOptions"><input type="checkbox"/>Smoothening</label>
                </div>
                <br/>
                <div>
                Hair Treatments
                </div>
                <div>
                    <label className="labelOptions"><input type="checkbox"/>Spa Treatments</label>
                    <label className="labelOptions"><input type="checkbox"/>Volumizing</label>
                    <label className="labelOptions"><input type="checkbox"/>Advanced Hair Moisturising</label>
                    <label className="labelOptions"><input type="checkbox"/>Scalp Treatments</label>
                </div>
                <br/>
                <div>
                Facials & Rituals
                </div>
                <div>
                    <label className="labelOptions"><input type="checkbox"/>Bleach</label>
                    <label className="labelOptions"><input type="checkbox"/>Luxury Facials/Rituals</label>
                    <label className="labelOptions"><input type="checkbox"/>Clean Ups</label>
                    <label className="labelOptions"><input type="checkbox"/>Body Polishing/Rejuvenation</label>
                    <label className="labelOptions"><input type="checkbox"/>Threading</label>
                </div>
                <br/>
                <div>
                Hand & Feet
                </div>
                <div>
                    <label className="labelOptions"><input type="checkbox"/>Manicure</label>
                    <label className="labelOptions"><input type="checkbox"/>Spa Pedicure</label>
                    <label className="labelOptions"><input type="checkbox"/>Pedicure</label>
                    <label className="labelOptions"><input type="checkbox"/>Waxing</label>
                    <label className="labelOptions"><input type="checkbox"/>Spa Manicure</label>
                </div>
                <br/>
                <div>
                Nail Care
                </div>
                <div>
                    <label className="labelOptions"><input type="checkbox"/>Nail Paint</label>
                    <label className="labelOptions"><input type="checkbox"/>Nail Art</label>
                    <label className="labelOptions"><input type="checkbox"/>Nail Filling</label>
                </div>
            </div>
        )
    }
}
export default LadiseFilterOption;