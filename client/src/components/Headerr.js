import React, { useState } from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse,
    MDBIcon
} from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { setLogout } from '../redux/features/authSlice';
import { searchTours } from '../redux/features/tourSlice';
import { useNavigate } from 'react-router-dom';
import decode from "jwt-decode";

export default function Header() {

    const [showNav, setShowNav] = useState(false);
    const [search, setSearch] = useState("")
    const { user } = useSelector((state) => ({ ...state.auth }))
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //if token expired logout for this we installed jwt-decode
    const token = user?.token;
    if (token) {
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            dispatch(setLogout());
        }
    }

    const handelLogout = () => {
        dispatch(setLogout());
    }

    const handleSubmite = (e) => {
        e.preventDefault();
        if (search) {
            console.log(search);
            dispatch(searchTours(search))
            navigate(`/tours/search?searchQuery=${search}`)
            setSearch("")
        } else {
            navigate("/");
            window.location.reload();
        }
    }

    return (
        <MDBNavbar expand='lg' fixed='top' style={{ backgroundColor: "#f0e6ea" }}>
            <MDBContainer>
                <MDBNavbarBrand href='/' style={{ color: "black", fontWeight: "1000", fontSize: "22px", fontFamily: "Lora" }}><MDBIcon fas icon="plane-departure" size='1x' style={{ marginRight: "5px" }} />TOURO-PEDIA</MDBNavbarBrand>
                <MDBNavbarToggler
                    type='button'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowNav(!showNav)}
                    style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar show={showNav}>
                    <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
                        {
                            user ? (
                                <>
                                    <MDBNavbarItem>
                                        <MDBNavbarLink incalid="true" style={{ color: "black", fontFamily: "Lora", fontWeight: 900 }}><MDBIcon fas icon='user' className='me-1' />{user?.result?.name}</MDBNavbarLink>
                                    </MDBNavbarItem>
                                </>
                            ) : (
                                null
                            )
                        }
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/'>Home</MDBNavbarLink>
                        </MDBNavbarItem>
                        {user && (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/addtour'>Add Tour</MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/dashboard'>Dashboard</MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        )}
                        {user ? (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href='/logout' onClick={handelLogout}>LogOut</MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        ) : (
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/login'>LogIn</MDBNavbarLink>
                            </MDBNavbarItem>
                        )}
                    </MDBNavbarNav>
                    <form className='d-flex input-group w-auto'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Search Tour'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <span className="input-group-text border-0" id="search-addon" style={{ backgroundColor: "blue", color: "white" }} onClick={handleSubmite}>
                            <i className="fas fa-search"></i>
                        </span>
                    </form>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}
