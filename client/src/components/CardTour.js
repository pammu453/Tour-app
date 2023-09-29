import React from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBCardGroup
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const CardTour = ({ imageFile, description, title, tags, _id, name }) => {
    
    const excerpt = (str) => {
        if (str.length > 45) {
            str = str.substring(0, 45) + '...';
        }
        return str;
    };

    return (
        <MDBCardGroup>
            <MDBCard className='h-100 mt-1 mx-auto d-sm-flex hover-shadow' style={{ maxWidth: '20rem' }}>
                <MDBCardImage src={imageFile} alt={title}  position='top' style={{ width: '100%', height: '150px' }} />
                <div className='top-left' style={{ fontFamily: "Verela" }}>{name}</div>
                <span className='text-start tag-card ms-4 mt-1 mb-1'>
                    {
                    tags.map((tag,index) =>(
                        <Link to={`/tours/tag/${tag}`} key={index}>{` #${tag}`}</Link>
                    ))
                }
                </span>
                <MDBCardBody className='mt-1'>
                    <MDBCardTitle className='text-start' style={{ fontFamily: "Lora" }}>{title}</MDBCardTitle>
                    <MDBCardText className='text-start'>{excerpt(description)}
                        <Link to={`/tour/${_id}`}>Read More</Link>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBCardGroup>
    );
};

export default CardTour;
