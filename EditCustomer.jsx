
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../../Config/Firebase";
import Swal from "sweetalert2";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Container, Typography, Paper } from '@mui/material';

const EditCustomer = () => {
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
   
  });
  const { id } = useParams();
  const navigate = useNavigate();
  
  

  const handleChange = (e) => {
    const { name } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const handleEdit = async () => {
    try {
      await updateDoc(doc(database, "customer", id), editData);
      Swal.fire({
        title: "Success",
        text: "customer Edited Successfully",
        icon: "success",
      });
      navigate("/customerList");
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
      });
    }
  };

  const getData = async () => {
    try {
      const getStuData = await getDoc(doc(database, "customer", id));
      setEditData(getStuData.data());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
  
    <Container maxWidth="sm" className="container  mt-5">
      <Typography variant="h4" gutterBottom>
        Edit Customer
      </Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Customer Name"
          value={editData.name}
          onChange={handleChange}
          name="name"
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Email"
          type="email"
          value={editData.email}
          onChange={handleChange}
          name="email"
          variant="outlined"
        />
      </FormControl>
     
      <FormControl fullWidth margin="normal">
        <TextField
          label="phone"
          type="phone"
          value={editData.phone}
          onChange={handleChange}
          name="phone"
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Address"
          type="address"
          value={editData.address}
          onChange={handleChange}
          name="address"
          variant="outlined"
        />
      </FormControl>
      <Button 
        variant="contained" 
        // color="primary" 
        className="addbtn"
        onClick={handleEdit}
        fullWidth
      >
        Edit
      </Button>
    </Container>
    
  );
};

export default EditCustomer;
