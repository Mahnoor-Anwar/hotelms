import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import  { useEffect, useState } from 'react'
import {database} from '../../config/Firebase'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// Custom styled components
const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: '#f9f9f9',
  borderRadius: '20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  margin: 'auto',
  padding: '20px',
  width:'90%',
  marginTop:'50px'

}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  padding: '12px 15px',
  borderBottom: '1px solid #ddd',
  color:'#726f72'
}));

const CustomTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#67526b',
  color: '#ffff',
  fontWeight:'bolder'
}));

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#f2f2f2',
  },
  '&:hover': {
    backgroundColor: '#ddd',
  },
}));

const BookingHistory = ({id}) => {
  const [bookinglist , setBookingList] = useState([])
  const [refresh , setRefresh] = useState(false)
  const navigate = useNavigate()

  console.log("id", id)
  const getBookingList = async () => {
    try {
      const arr=[]
      const bookings = await getDocs(collection(database, 'booking'))
      bookings.forEach((doc)=>{
        arr.push({...doc.data() , id:doc.id})
        console.log("bookings" , bookings)
      })
      setBookingList(arr)
      
    } catch(err) {
      console.log(err)
    }
  }


  const handleDelete = async (id) =>{
    try {
      const deleteStudent = await deleteDoc(doc(database , 'booking' , id))
      Swal.fire({
        title: "success",
        text: "Booking Deleted Successfully",
        icon: "success"
      });
        setRefresh(!refresh)
    } catch(err){
      Swal.fire({
        title: "danger",
        text: err,
        icon: "danger"
      });
    }
  }
 

  useEffect(()=>{
    getBookingList()
  },[refresh])

  return (
    <>
    <CustomTableContainer component={Paper}>
      <div className='listheader'>
      <h1>Booking List</h1>
      </div>
        
      <Table>
        <CustomTableHead>
          <TableRow>
            <CustomTableCell sx={{color:'white'}}>Booking Id</CustomTableCell>
            <CustomTableCell sx={{color:'white'}}>Room Id</CustomTableCell>
            <CustomTableCell sx={{color:'white'}}>Check In</CustomTableCell>
            <CustomTableCell sx={{color:'white'}}>Check Out</CustomTableCell>
            <CustomTableCell sx={{color:'white'}}>View</CustomTableCell>
            <CustomTableCell sx={{color:'white'}}>Actions</CustomTableCell>
          </TableRow>
        </CustomTableHead>
        <TableBody>
          {bookinglist.map((item) => (
            console.log("itens", item),
            <CustomTableRow key={item.id}>
              <CustomTableCell>{item.id}</CustomTableCell>
              <CustomTableCell>{item.roomid}</CustomTableCell>
              <CustomTableCell>{item.checkin}</CustomTableCell>
              <CustomTableCell>{item.checkout}</CustomTableCell>
              <CustomTableCell>
                <Button onClick={()=>navigate(`/viewBooking/${item.id}`)}>View Booking</Button>
              </CustomTableCell>
              <CustomTableCell>
                <ModeEditOutlineIcon onClick={()=>navigate(`/editStudent/${item.id}`)}/>
                <DeleteIcon onClick={()=>handleDelete(item.id)}/>
              </CustomTableCell>
            </CustomTableRow>
          ))}
        </TableBody>
      </Table>
    </CustomTableContainer>
    </>
  );
};

export default BookingHistory;
