import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../../Config/Firebase";
import Swal from "sweetalert2";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Container, Typography, Paper } from '@mui/material';

const EditService = () => {
  const [editData, setEditData] = useState({
    serviceType: "",
    description: "",
    charges: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  
  const serviceOptions = [
    { value: "Dinein", label: "Dine In" },
    { value: "events", label: "Events" },
    { value: "roomService", label: "Room Service" },
    { value: "laundry", label: "Laundry" },
  ];


  const handleChange = (e) => {
    const { name } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const handleEdit = async () => {
    try {
      await updateDoc(doc(database, "services", id), editData);
      Swal.fire({
        title: "Success",
        text: "Services Edited Successfully",
        icon: "success",
      });
      navigate("/servicesList");
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
      const getServiceData = await getDoc(doc(database, "services", id));
      setEditData(getServiceData.data());
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
        Edit Service
      </Typography>
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Service Type</InputLabel>
        <Select
           value={editData.serviceType}
           onChange={handleChange}
           name="serviceType"
           label="Service Type"
        >
          {serviceOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Charges"
          type="number"
          value={editData.charges}
          onChange={handleChange}
          name="charges"
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="description"
          type="text"
          value={editData.description}
          onChange={handleChange}
          name="description"
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

export default EditService;
