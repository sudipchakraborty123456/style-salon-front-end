import React from 'react';
import "../Styles/services.css";
import BookAppoForm from "../Components/BookAppoForm";
import ServiceGents from "../Components/ServiceGents";
class Service extends React.Component {
    render() {
        return (
            <div>

                <ServiceGents />
                <BookAppoForm />
            </div>
        );
    }
}
export default Service;