import { GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import {auth} from '../../Config/Firebase'
import { NavLink, useNavigate } from 'react-router-dom'
import Google from '../../assets/google.jpg'
import { TextField, MenuItem, Button, Container, Typography } from "@mui/material";
import { getDoc , doc} from 'firebase/firestore'
import { database } from "../../Config/Firebase";
import Swal from "sweetalert2";
import Dashboard from '../Dashboard/Dashboard'


const Login = () => {

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin =async () => {
     
       await signInWithEmailAndPassword(auth , email , password).then(async (res)=>{

          localStorage.setItem("userId" , res.user.uid)

          const getId = await getDoc(doc(database, "user" ,res.user.uid ))
          console.log("geti", getId.data())
          localStorage.setItem("userData", JSON.stringify(getId.data()))
            navigate('/dashboard')
          
        }).catch((err)=>{
          Swal.fire({
            title: "Error",
            text: err,
            icon: "error",
          });
        })
      
    }
     const handleGoogle = () => {
        
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth , provider).then((res)=>{
            navigate('/dashboard')
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
     }

    
  return (
    <div>
    {/* <Dashboard/> */}
      <Container sx={{mt:5}}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        type="email"
        onChange={(e)=>setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        type="password"
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      
     
      <Button
        variant="contained"
        color="primary"
        onClick={()=>handleLogin()}
        className='loginbtn'
        sx={{ mt: 2 }}
      >
        Login
      </Button>
      <Button
        variant="conatined"
        color="primary"
        onClick={()=>handleGoogle()}
        className='googlebtn'
        sx={{ mt: 2 ,ml:3 }}
      >
        <span><img src={Google} className='google'/></span>
        Login with Google
      </Button>
      <NavLink to='/signup' className="navlink">
        Don't have an account? signup
      </NavLink>
     
    </Container>
    </div>
  )
}

export default Login
