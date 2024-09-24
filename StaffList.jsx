import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import  { useEffect, useState } from 'react'
import { database } from '../../Config/Firebase'
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

const StaffList = () => {
  const [staffList , setStaff] = useState([])
  const [refresh , setRefresh] = useState(false)
  const navigate = useNavigate()

  const getStaffList = async () => {
    try {
      const arr=[]
      const staff = await getDocs(collection(database, 'staff'))
      staff.forEach((doc)=>{
        arr.push({...doc.data() , id:doc.id})
        console.log("staff" , staff)
      })
      setStaff(arr)
      
    } catch(err) {
      console.log(err)
    }
  }


  const handleDelete = async (id) =>{
    try {
      const deletetStaff = await deleteDoc(doc(database , 'staff' , id))
      Swal.fire({
        title: "success",
        text: "Staff Deleted Successfully",
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
    getStaffList()
  },[refresh])

  return (
    <>
    <CustomTableContainer component={Paper}>
      <div className='listheader'>
      <h1>Staff List</h1>
     <Button mb={4} variant="contained" className='addbtn' sx={{float:'right', marginBottom:'20px', marginTop:'20px', marginRight:'20px'}}onClick={()=>navigate('/addStaff')}>Add Staff</Button>
      </div>
        
      <Table>
        <CustomTableHead>
          <TableRow>
            <CustomTableCell sx={{color:'white'}}>Staff Name</CustomTableCell>
            <CustomTableCell sx={{color:'white'}}>Staff Role</CustomTableCell>
            <CustomTableCell sx={{color:'white'}}>Staff Department</CustomTableCell>
            <CustomTableCell sx={{color:'white'}}>Staff Contact</CustomTableCell>
            <CustomTableCell sx={{color:'white'}}>Shift Timings</CustomTableCell>
            <CustomTableCell sx={{color:'white'}}>Actions</CustomTableCell>
          </TableRow>
        </CustomTableHead>
        <TableBody>
          {staffList.map((item) => (
            <CustomTableRow key={item.id}>
              <CustomTableCell>{item.staffName}</CustomTableCell>
              <CustomTableCell>{item.role}</CustomTableCell>
              <CustomTableCell>{item.department}</CustomTableCell>
              <CustomTableCell>{item.contactInfo}</CustomTableCell>
              <CustomTableCell>{item.shiftTimings}</CustomTableCell>
              <CustomTableCell>
                <ModeEditOutlineIcon onClick={()=>navigate(`/editStaff/${item.id}`)}/>
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

export default StaffList;
