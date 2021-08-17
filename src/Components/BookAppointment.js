import React from 'react';
import bookImage from "../Images/salon.jpg";
import "../Styles/BookAppo.css"
import Buttom_Section from "../Components/Buttom_Section";
import Header from "../Components/Header";
import BookAppoForm from '../Components/BookAppoForm';

class BookAppointment extends React.Component {
    render() {
        return (
            <div className="container-fluid containerfluid">
                <Header/>
                <div className="row">
                    <img src={bookImage} className="bookImage" alt="Sorry!" />
                </div>
                <div className="container">
                    

                   <BookAppoForm/>
                    <div className="row text-center">
                        <h3>Book an Appointment at STYLE Salon</h3>
                        <p>STYLE Salon, a premium name in the salon industry leaves no stone unturned to bring out a new STYLE for every man and woman. With more than 95 salons present in India and abroad, STYLE Salon takes pride in becoming hair and beauty treatment partner of thousands of our esteemed customers for the longest time. Be it for a party, festival or a normal dating - Let us take care of your STYLE and you may remain tension-free!</p>
                        <p>STYLESing for a fresh STYLE this festive season? Or want to bring out a new you? Then wait no more, just book an appointment at STYLE Salon today and observe yourself getting transformed into a totally new person. Booking an appointment with STYLE Salon is as easy as a cakewalk. All you've to do is to fill the quick form above through which our stylists and experts can have an understanding of your needs and then get a call from our executive to confirm your appointment, Viola! Your journey of getting transformed has begun.</p>
                        <p>You can also locate the nearest STYLE Salon through our Salon Finder and book an appointment seamlessly. So while we're working our best to give you a new STYLE and answer all your beauty and hair questions, we want to make sure you have the best time and leave our salon with a big smile. Book your appointment now!</p>
                    </div>
                </div>
                <Buttom_Section/>
            </div>

        );
    }
}
export default BookAppointment;