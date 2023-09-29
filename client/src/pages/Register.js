import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner
} from "mdb-react-ui-kit";

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { register } from '../redux/features/authSlice';


const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword:""
}

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const {firstName,lastName ,email, password,confirmPassword } = formValue;

  const { loading, error } = useSelector((state) => ({ ...state.auth }))

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error)
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !==confirmPassword){
      return toast.error("Password should match!")
    }
    if(email && password && firstName && lastName && confirmPassword){
      dispatch(register({formValue,navigate,toast}));
    }
  }

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  }

  return (
    <div style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }}>
      <MDBCard alignment='center'>
        <MDBIcon fas icon='user-circle' className='fa-2x pt-3' />
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
            <div className='col-md-12'>
              <MDBInput label="firstName" type='text' value={firstName} name='firstName' onChange={onInputChange} required invalid validation="Please provide your firstName" />
            </div>
            <div className='col-md-12'>
              <MDBInput label="lastName" type='text' value={lastName} name='lastName' onChange={onInputChange} required invalid validation="Please provide your lastName" />
            </div>
            <div className='col-md-12'>
              <MDBInput label="Email" type='email' value={email} name='email' onChange={onInputChange} required invalid validation="Please provide your email" />
            </div>
            <div className='col-md-12'>
              <MDBInput label="Password" type='password' value={password} name='password' onChange={onInputChange} required invalid validation="Please provide your password" />
            </div>
            <div className='col-md-12'>
              <MDBInput label="Confirm Password" type='password' value={confirmPassword} name='confirmPassword' onChange={onInputChange} required invalid validation="Please provide your password" />
            </div>
            <div className="col-12">
              {
                loading && <MDBSpinner size='sm' role="status" tag="span" className='me-2' />
              }
              <MDBBtn style={{ width: "100%", className: "mt-2" }} >Register</MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <span>Already have an account ?</span>
          <Link to="/login">
            <span> Sign In</span>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  )
}

export default Register;

