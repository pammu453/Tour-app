import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBCardGroup,
  MDBSpinner
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {toast} from "react-toastify"

import { deleteTour, getToursByUser } from "../redux/features/tourSlice";
import Spinner from '../components/Spinner'

const Dashboard = () => {

  const { user } = useSelector((state) => ({ ...state.auth }));
  const { userTours, loading } = useSelector((state) => ({ ...state.tour }));
  const userId = user?.result?._id;
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    }
  }, [userId]);

  if(loading){
    return <Spinner/>
  }

  const excerpt = (str) => {
    if (str.length > 40) {
      str = str.substring(0, 40) + " ...";
    }
    return str;
  };

  const handleDelete=(id)=>{
    if(window.confirm("Are you want to delete the tour ?")){
        dispatch(deleteTour({id,toast}))
    }
  }

  return (
    <div
      style={{
        margin: "auto",
        padding: "20px",
        maxWidth: "900px",
        alignContent: "center",
      }}
    >
      {userTours.length === 0 && (
        <h3 style={{marginTop:"70px"}}>No tour available with the user: {user?.result?.name}</h3>
      )}

      {userTours.length > 0 && (
        <>
          <h5 className="text-center" style={{marginTop:"100px"}}>Dashboard: {user?.result?.name}</h5>
          <hr style={{ maxWidth: "100%" }} />
        </>
      )}

      {userTours &&
        userTours.map((item) => (
          <MDBCardGroup key={item._id}>
            <MDBCard style={{ maxWidth: "100%", marginBottom: "20px" }} className="hover-shadow">
              <MDBRow className="g-0">
                <MDBCol sm="12" md="4">
                  <MDBCardImage
                    className="rounded"
                    src={item.imageFile}
                    alt={item.title}
                    fluid
                  />
                </MDBCol>
                <MDBCol sm="12" md="8">
                  <MDBCardBody>
                    <MDBCardTitle className="text-start">
                      {item.title}
                    </MDBCardTitle>
                    <MDBCardText className="text-start">
                      <small className="text-muted">
                        {excerpt(item.description)}
                      </small>
                    </MDBCardText>
                    <div
                      style={{
                        marginLeft: "5px",
                        float: "right",
                        marginTop: "-10px",
                      }}
                    >
                      <MDBBtn className="mt-1" tag="a" color="none">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39" }}
                          size="lg"
                          onClick={()=>handleDelete(item._id)}
                        />
                      </MDBBtn>
                      <Link to={`/editTour/${item._id}`}>
                        <MDBIcon
                          fas
                          icon="edit"
                          style={{ color: "#55acee", marginLeft: "10px" }}
                          size="lg"
                        />
                      </Link>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCardGroup>
        ))}
    </div>
  );
};

export default Dashboard;
