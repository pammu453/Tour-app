import React, { useEffect } from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage, MDBContainer, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import moment from 'moment';
import { getTour } from '../redux/features/tourSlice';
import {useNavigate} from "react-router-dom"

const SingleTour = () => {

  const dispatch = useDispatch();
  const { tour } = useSelector((state) => ({ ...state.tour }))
  const { id } = useParams();
  const navigate=useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getTour(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <MDBContainer>
      <MDBCard className='mb-3' style={{ marginTop: "100px" }}>
        <MDBCardImage position='top' style={{ width: "100%", maxHeight: "600px" }} src={tour.imageFile} alt={tour.title} />
        <MDBCardBody>
          <MDBBtn tag="a"color='none' style={{float:"left",color:"#000"}} onClick={()=>navigate("/")}><MDBIcon fas icon="long-arrow-alt-left" /></MDBBtn>
          <h3>{tour.title}</h3>
          <span><p className="text-start">Created By : {tour.name}</p></span>
          <div style={{ float: "left" }}>
            <span className='text-start'>
              {tour && tour.tags && tour.tags.map((tag) => ` #${tag}`)}
            </span>
          </div>
          <br />
          <MDBCardText className='text-start mt-3' style={{ display: 'flex', alignItems: 'center', marginTop: "3px" }}>
            <MDBIcon style={{ float: "left", marginRight: "4px" }} far icon="calendar-alt" size='lg' />
            <small>{moment(tour.createdAt).fromNow()}</small>
          </MDBCardText>
          <MDBCardText className='lead text-start'>
            {tour.description}
          </MDBCardText>
        </MDBCardBody>
      </MDBCard> 
    </MDBContainer>
  )
}

export default SingleTour;
