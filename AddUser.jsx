import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import {auth, database} from '../../Config/Firebase'
import { NavLink, useNavigate } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import { TextField, MenuItem, Button, Container, Typography } from "@mui/material";
import Swal from "sweetalert2";


const AddUser = () => {
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [role , setRole] = useState("")
    const [contactInfo , setContact] = useState("")
    const navigate = useNavigate()

    const roleOptions = [
      { value: "reception", label: "Receptionist" },
      { value: "Manager", label: "Manager" },
      { value: "customer", label: "customer" },
      { value: "waiter", label: "Waiter" },
    ];

    const handleSignup = async() => {
      try {

        await createUserWithEmailAndPassword(auth , email , password).then(async(userCredentials)=>{
           let userObj = {
             name,
             email,
             password,
             role,
             contactInfo
           }
 
           const userId = userCredentials.user.uid
 
           const storeData = await setDoc(doc(database, "user", userId), userObj)
             navigate('/userList')
             console.log(userCredentials)
         })
      } catch(err) {
        Swal.fire({
          title: "Error",
          text: err,
          icon: "error",
        });
      }
    }
  return (
    <div>
      
      
      <Container>
      <Typography variant="h4" gutterBottom textAlign={'center'} my={4}>
        Add User
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Full Name"
        name="name" placeholder='name'onChange={(e)=>setName(e.target.value)}
      />
       <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email" placeholder='Email'onChange={(e)=>setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        type="password"
        label="Password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
       <TextField
        fullWidth
        margin="normal"
        select
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        {roleOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
       <TextField
        fullWidth
        margin="normal"
        type="text"
        label="contact"
        name="contactInfo"
        onChange={(e) => setContact(e.target.value)}
      />
      
     
      <Button
        variant="contained"
        color="primary"
        onClick={()=>handleSignup()}
        className='loginbtn'
        sx={{ mt: 2 }}
      >
        Signup
      </Button>
      <NavLink to='/' className="navlink">
        Already have an account? Login
      </NavLink>
    </Container>
    </div>
  )
}

export default AddUser
