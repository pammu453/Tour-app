import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';

export default function Spinner() {
  return (
    <MDBSpinner role='status' style={{marginTop:"100px"}}>
      <span className='visually-hidden'>Loading...</span>
    </MDBSpinner>
  );
}