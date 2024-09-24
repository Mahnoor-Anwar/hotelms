import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Sidebar from './Sidebar'
import Logout from '../../assets/logout.png'
import Logo from '../../assets/logo.png'
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, ListItemText, Typography } from '@mui/material';

function Dashboard() {

  const navigate = useNavigate()

  // const getDataFromStorage = localStorage.getItem("userData");
  const getIf = localStorage.getItem("userId")

  const data = JSON.parse(localStorage.getItem("userData"));
  console.log("data", data)



  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container fluid>
          <img src={Logo} alt="Hotel Management System" />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link href="/dashboard">Home</Nav.Link>
              {data.role === "manager" || data.role === "admin" && getIf ?
                <NavDropdown title="Users" id="basic-nav-dropdown">
                  <NavLink to={'/userList'} className="navbarlinks" >
                    <ListItemText primary="User List" />
                  </NavLink>
                  <NavLink to={'/addUser'} className="navbarlinks" >
                    <ListItemText primary="Add User" />
                  </NavLink>
                </NavDropdown>
                : <></>}
              {data.role === "manager" || data.role === "admin" && getIf ?
                <NavDropdown title="Customer" id="basic-nav-dropdown">
                  <NavLink to={'/customerList'} className="navbarlinks" >
                    <ListItemText primary="Cutsomer List" />
                  </NavLink>
                  <NavLink to={'/addCustomer'} className="navbarlinks" >
                    <ListItemText primary="Add Customer" />
                  </NavLink>
                </NavDropdown> : <></>
              }
              {/* <NavDropdown title="Bookings" id="basic-nav-dropdown">
            <NavLink to={'/bookList'} className="navbarlinks" >
            <ListItemText primary="Book List" />
            </NavLink>
            <NavLink to={'/addBooking'} className="navbarlinks" >
            <ListItemText primary="Add Booking" />
            </NavLink>
            </NavDropdown> */}

              <NavDropdown title="Rooms" id="basic-nav-dropdown">
                <NavLink to={'/roomList'} className="navbarlinks" >
                  <ListItemText primary="Room List" />
                </NavLink>
                {data.role === "manager" || data.role === "admin" && getIf ?
                  <NavLink to={'/addRoom'} className="navbarlinks" >
                    <ListItemText primary="Add Room" />
                  </NavLink> : <></>}
              </NavDropdown>
              {data.role === "manager" || data.role === "admin" && getIf ?
                <NavDropdown title="Bookings" id="basic-nav-dropdown">
                  <NavLink to={'/bookList'} className="navbarlinks" >
                    <ListItemText primary="Bookings List" />
                  </NavLink>
                </NavDropdown> : <></>}
              {data.role === "manager" || data.role === "admin" && getIf ?
                <NavDropdown title="Services" id="basic-nav-dropdown">
                  <NavLink to={'/servicesList'} className="navbarlinks" >
                    <ListItemText primary="Services List" />
                  </NavLink>
                  <NavLink to={'/addService'} className="navbarlinks" >
                    <ListItemText primary="Add Services" />
                  </NavLink>
                </NavDropdown> : <></>}
              {data.role === "manager" || data.role === "admin" && getIf ?
                <NavDropdown title="Staffs" id="basic-nav-dropdown">
                  <NavLink to={'/staffList'} className="navbarlinks" >
                    <ListItemText primary="Staff List" />
                  </NavLink>
                  <NavLink to={'/addStaff'} className="navbarlinks" >
                    <ListItemText primary="Add Staff" />
                  </NavLink>
                </NavDropdown> : <></>}
              {data.role === "manager" || data.role === "admin" && getIf ?
                <NavDropdown title="Inventory" id="basic-nav-dropdown">
                  <NavLink to={'/inventoryList'} className="navbarlinks" >
                    <ListItemText primary="Inventory List" />
                  </NavLink>
                  <NavLink to={'/addInventory'} className="navbarlinks" >
                    <ListItemText primary="Add Inventory" />
                  </NavLink>
                </NavDropdown> : <></>}
            </Nav>
          </Navbar.Collapse>

          <button className='logout' onClick={() => {  navigate('/') }}>
            <img src={Logout} alt="Logout" />
          </button>
        </Container>
      </Navbar>
    </>

  );
}

export default Dashboard;