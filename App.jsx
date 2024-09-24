import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Screens/Login/Login'
import Signup from './Screens/Signup/Signup'
import Dashboard from './Screens/Dashboard/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Screens/Dashboard/Home'
import AuthRoute from './Screens/Routes/AuthRoutes'
import ProtectedRoute from './Screens/Routes/ProtectedRoutes'
import UsersList from './Screens/User/UsersList'
import AddUser from './Screens/User/AddUser'
import CustomerList from './Screens/Customer/CustomerList'
import AddCustomer from './Screens/Customer/AddCustomer'
import EditCustomer from './Screens/Customer/EditCustomer'
import RoomList from './Screens/Room/RoomList'
import AddRoom from './Screens/Room/AddRoom'
import EditRoom from './Screens/Room/EditRoom'
import ServiceList from './Screens/Services/ServiceList'
import AddService from './Screens/Services/AddService'
import StaffList from './Screens/Staff/StaffList'
import AddStaff from './Screens/Staff/AddStaff'
import EditStaff from './Screens/Staff/EditStaff'
import Addpayment from './Screens/Payment/Addpayment'
import Inventory from './Screens/Inventory/Inventory'
import AddInventory from './Screens/Inventory/AddInventory'
import Editinventory from './Screens/Inventory/Editinventory'
import ReportTable from './Screens/Report/ReportTable'
import BookingList from './Screens/Booking/BookingList'
import AddBooking from './Screens/Booking/AddBooking'
import EditBooking from './Screens/Booking/EditBooking'

import ViewBooking from './Screens/Booking/ViewBooking'
{
  /* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';
import EditService from './Screens/Services/EditService'
import AddPayment from './Screens/Payment/Addpayment'

function App() {
  return (
    <>
      <Dashboard />
    <Routes>
      <Route element={<AuthRoute />}>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Signup />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Home />} />
        {/* <Route path="/userDashbaord" element={<UserDashbaord />} /> */}
        <Route path='/userList' element={<UsersList />} />
        <Route path='/addUser' element={<AddUser />} />
        <Route path='/customerList' element={<CustomerList />} />
        <Route path='/addCustomer' element={<AddCustomer />} />
        <Route path='/editCustomer/:id' element={<EditCustomer />} />
        <Route path='/roomList' element={<RoomList />} />
        <Route path='/addRoom' element={<AddRoom />} />
        <Route path='/editRoom/:id' element={<EditRoom />} />
        <Route path='/servicesList' element={<ServiceList />} />
        <Route path='/addService' element={<AddService />} />
        <Route path='/editService/:id' element={<EditService />} />
        <Route path='/staffList' element={<StaffList />} />
        <Route path='/addStaff' element={<AddStaff />}/>
        <Route path='/editStaff/:id' element={<EditStaff />} />
        <Route path='/payment/:id' element={<Addpayment />} />
        <Route path='/inventoryList' element={<Inventory />} />
        <Route path='/addInventory' element={<AddInventory />} />
        <Route path='/editInventory/:id' element={<Editinventory />} />
        <Route path='/report' element={<ReportTable />} />
        <Route path='/bookList' element={<BookingList />} />
        <Route path='/viewBooking/:id' element={<ViewBooking />} />
        <Route path='/addBooking/:id' element={<AddBooking />} />
        <Route path='/editBooking/:id' element={<EditBooking />} />
        <Route path='/addPayment/:id' element={<AddPayment />} />
      </Route>
    </Routes>
      
    </>
  )
}

export default App