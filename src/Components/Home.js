import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loaders
import "../Styles/Home.css"
import BookAppoForm from "../Components/BookAppoForm"
import Header from "../Components/Header";
import Buttom_Section from "../Components/Buttom_Section";
import QuickSearch from "../Components/QuickSearch";
class Home extends React.Component {
    gentsClicked = () => {
        this.props.history.push("/service/gents");

    }
    ladiesClicked = () => {
        this.props.history.push("/service/ladies");
    }
    QuickSearchClicked = (e,r,gender,name) => {
 // debugger
      const url = `/quickSearchFilterPage?service=${r}&gender=${gender}&name=${name}`;
      this.props.history.push(url);
    }
    render() {
        const thumb = ["Images/salon.jpg", "Images/salon1.jpg", "Images/salon2.jpg", "Images/salon3.jpg"]
        return (
            <>
                <Header />
                <div className="container-fluid">
                    <div className="images  mb-3">
                        <Carousel className="carousel" dynamicHeight={true} showThumbs={false} stopOnHover={true} autoPlay={true} interval={3000} infiniteLoop={true} >
                            {thumb.map((item, index) => {
                                return (<div>
                                    <img src={require("../" + item).default} alt="Opps Sorry!" />
                                </div>);
                            })
                            }
                        </Carousel>
                    </div>
                    <div className="row text-center">
                        <h1>OUR SERVICES</h1>
                    </div>
                    <div className="row">

                        <div className=" col-12 col-sm-12 col-mg-6 col-lg-6 text-center my-3 "  >
                            <h2>GENTS</h2>
                            <img src={require("../Images/gents.jpg").default} className="gents borderDesign" onClick={() => this.gentsClicked()} />
                            <div className="col-11" style={{ margin: '0 auto' }}>
                                <h2 className="my-3">Quick Searches for Gents</h2>
                               <div onClick={(e) => this.QuickSearchClicked(e,1,"Gents","Hair Cut & Finish")}><QuickSearch image="Images/hairCutMen.jpg" heading="Hair Cut & Finish" description="Your hair will then be washed and conditioned. Following this, your hair will be cut using methods that suit the desired result. Your hair will then be finished with a luxury blow dry or alternatively other styling techniques will be carried out such as wanding, curling, diffusing, setting." /></div>
                                <div onClick={(e) => this.QuickSearchClicked(e,2,"Gents","Hair Colour")} ><QuickSearch image="Images/hairColorMen.jpg" heading="Hair Colour" description="Hair color is the pigmentation of hair follicles due to two types of melanin: eumelanin and pheomelanin. Generally, if more melanin is present, the color of the hair is darker; if less melanin is present, the hair is lighter." /></div>
                                <div onClick={(e) => this.QuickSearchClicked(e,3,"Gents","Hair Texture")} ><QuickSearch image="Images/Hair Texture.jpg" heading="Hair Texture" description=" Natural hair will have a texture of its own and this will also be influenced by condition. Hair can be thick and coarse or fine and soft, with a glossy, defined edge or a fine sheen. Porous hair will look dull and matt." /></div>
                                <div onClick={(e) => this.QuickSearchClicked(e,4,"Gents","Hair Treatments")} ><QuickSearch image="Images/Hair Treatments.jpg" heading="Hair Treatments" description=" Hair treatments generally refer to any means of managing common hair related problems such as hair fall, dryness, dandruff, frizzy hair, thinning hair, and so on. The treatments vary in terms of the problem you are suffering from because different ingredients and elements are required to tackle them. " /></div>
                                <div onClick={(e) => this.QuickSearchClicked(e,5,"Gents","Skin Care")} ><QuickSearch image="Images/Skin CareMen.jpg" heading="Skin Care" description=" Hair treatments generally refer to any means of managing common hair related problems such as hair fall, dryness, dandruff, frizzy hair, thinning hair, and so on. The treatments vary in terms of the problem you are suffering from because different ingredients and elements are required to tackle them. " /></div>
                                <div  onClick={(e) => this.QuickSearchClicked(e,6,"Gents","Beard Grooming")}><QuickSearch  image="Images/Beard Grooming.jpg" heading="Beard Grooming" description="Beard grooming is the art (yes, 'art') of taming your beard and having complete control over it. The fact that you care about yourself enough to grow a beard or even stubble, automatically categorizes you as a man who cares about his appearance. And this is the most important incentive for beard grooming! " /></div>

                            </div>
                        </div>
                        <div className=" col-12 col-sm-12 col-mg-6 col-lg-6 text-center my-3 " >
                            <h2>LADISE</h2>
                            <img src={require("../Images/ladies.jpg").default} className="ladise borderDesign" onClick={() => this.ladiesClicked()} />
                            <div className="col-11" style={{ margin: '0 auto' }}>
                                <h2 className="my-3">Quick Searches for Ladies</h2>
                                <div onClick={(e) => this.QuickSearchClicked(e,7, "Ladise","Hair Styling")} ><QuickSearch image="Images/hairStylingLadies.jpg" heading="Hair Styling" description="Whether you have got long hair, medium hair or short hair we can always create a perfect look for you, with our range of haircuts and styles." /></div>
                                <div onClick={(e) => this.QuickSearchClicked(e,8, "Ladise","Make Up")} ><QuickSearch image="Images/make_UP.jpg" heading="Make Up" description="Hair color is the pigmentation of hair follicles due to two types of melanin: eumelanin and pheomelanin. Generally, if more melanin is present, the color of the hair is darker; if less melanin is present, the hair is lighter." /></div>
                                <div onClick={(e) => this.QuickSearchClicked(e,9, "Ladise","Hair Texture")} ><QuickSearch image="Images/Hair Texture ladies.jpg" heading="Hair Texture" description=" Natural hair will have a texture of its own and this will also be influenced by condition. Hair can be thick and coarse or fine and soft, with a glossy, defined edge or a fine sheen. Porous hair will look dull and matt." /></div>
                                <div onClick={(e) => this.QuickSearchClicked(e,10, "Ladise","Hair Treatments")} ><QuickSearch image="Images/Hair Treatments ladies.jpg" heading="Hair Treatments" description=" Hair treatments generally refer to any means of managing common hair related problems such as hair fall, dryness, dandruff, frizzy hair, thinning hair, and so on. The treatments vary in terms of the problem you are suffering from because different ingredients and elements are required to tackle them. " /></div>
                                <div  onClick={(e) => this.QuickSearchClicked(e,11, "Ladise","Facials & Rituals")}><QuickSearch  image="Images/Facials & Rituals.jpg" heading="Facials & Rituals" description=" Hair treatments generally refer to any means of managing common hair related problems such as hair fall, dryness, dandruff, frizzy hair, thinning hair, and so on. The treatments vary in terms of the problem you are suffering from because different ingredients and elements are required to tackle them. " /></div>
                                <div  onClick={(e) => this.QuickSearchClicked(e,12, "Ladise","Hand & Feet")}><QuickSearch  image="Images/Hand & Feet.jpg" heading="Hand & Feet" description="Beard grooming is the art (yes, 'art') of taming your beard and having complete control over it. The fact that you care about yourself enough to grow a beard or even stubble, automatically categorizes you as a man who cares about his appearance. And this is the most important incentive for beard grooming! " /></div>
                            </div>
                        </div>
                    </div>
                    {/* <BookAppoForm /> */}
                </div>
                <Buttom_Section />
            </>
        );
    }
}
export default Home;