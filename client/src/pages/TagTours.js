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
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { getToursByTag } from "../redux/features/tourSlice";

const TagTours = () => {
  const { tagTours, loading } = useSelector((state) => ({ ...state.tour }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tag } = useParams();

  useEffect(() => {
    if (tag) {
      dispatch(getToursByTag(tag));
    }
  }, [tag]);

  if (loading) {
    return <Spinner />;
  }

  const excerpt = (str) => {
    if (str.length > 45) {
      str = str.substring(0, 45) + "...";
    }
    return str;
  };

  return (
    <div className="container">
      <h3 className="text-center"  style={{ marginTop:"100px"}}>Tours with tag: {tag}</h3>
      <hr style={{maxWidth:"50%",margin:"auto"}}/>
      <div className="row justify-content-center">
        {tagTours &&
          tagTours.map((item) => (
            <MDBCardGroup key={item._id}>
              <MDBCard className="mt-2 hover-shadow m-auto" style={{ maxWidth: "600px" }}>
                <MDBRow className="g-0">
                  <MDBCol md="4">
                    <MDBCardImage
                      className="rounded"
                      src={item.imageFile}
                      alt={item.title}
                      fluid
                    />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody>
                      <MDBCardTitle className="text-start">{item.title}</MDBCardTitle>
                      <MDBCardText className="text-start">{excerpt(item.description)}</MDBCardText>
                      <div className="text-start">
                        <MDBBtn
                          size="sm"
                          rounded
                          color="info"
                          onClick={() => navigate(`/tour/${item._id}`)}
                        >
                          Read More
                        </MDBBtn>
                      </div>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCardGroup>
          ))}
      </div>
    </div>
  );
};

export default TagTours;
