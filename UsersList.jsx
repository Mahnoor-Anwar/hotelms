import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import  { useEffect, useState } from 'react'
import {database} from '../../Config/Firebase'
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

const UserList = () => {
  const [userList , setuserList] = useState([])
  const [refresh , setRefresh] = useState(false)
  const navigate = useNavigate()

  const getstudentlist = async () => {
    try {
      const arr=[]
      const users = await getDocs(collection(database, 'user'))
      users.forEach((doc)=>{
        arr.push({...doc.data() , id:doc.id})
        console.log("users" , users)
      })
      setuserList(arr)
      
    } catch(err) {
      console.log(err)
    }
  }


  const handleDelete = async (id) =>{
    try {
      const deleteUser = await deleteDoc(doc(database , 'user' , id))
      Swal.fire({
        title: "success",
        text: "User Deleted Successfully",
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
    getstudentlist()
  },[refresh])

  return (
    <>
    <CustomTableContainer component={Paper}>
      <div className='listheader'>
      <h1>User List</h1>
     <Button mb={4} variant="contained" className='addbtn' sx={{float:'right', marginBottom:'20px', marginTop:'20px', marginRight:'20px'}}onClick={()=>navigate('/addUser')}>Add User</Button>
      </div>
        
      <Table>
        <CustomTableHead>
          <TableRow>
            <CustomTableCell sx={{color:'white'}}>User Id</CustomTableCell>
            <CustomTableCell sx={{color:'white'}}>User Name</CustomTableCell>
            <CustomTableCell sx={{color:'white'}}>User Email</CustomTableCell>
            <CustomTableCell sx={{color:'white'}}>User Role</CustomTableCell>
            <CustomTableCell sx={{color:'white'}}>Contact</CustomTableCell>
            <CustomTableCell sx={{color:'white'}}>Actions</CustomTableCell>
          </TableRow>
        </CustomTableHead>
        <TableBody>
          {userList.map((item) => (
            <CustomTableRow key={item.id}>
              <CustomTableCell>{item.id}</CustomTableCell>
              <CustomTableCell>{item.name}</CustomTableCell>
              <CustomTableCell>{item.email}</CustomTableCell>
              <CustomTableCell>{item.role}</CustomTableCell>
              <CustomTableCell>{item.contact}</CustomTableCell>
              <CustomTableCell>
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

export default UserList;
