import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../../Config/Firebase";
import Swal from "sweetalert2";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Container, Typography, Paper } from '@mui/material';

const EditInventory = () => {
  const [editData, setEditData] = useState({
    item: "",
    description: "",
    quantity: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  
  const itemOptions = [
    { value: "chair", label: "Chair" },
    { value: "table", label: "Table" },
    { value: "sofa", label: "Sofa" },
    { value: "AC", label: "AC" },
    { value: "lights", label: "lights" },
    { value: "bed", label: "Bed" },
    { value: "laundrybasket", label: "Laundry Basket" },
    { value: "cutlery", label: "Cutlery" },
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
      await updateDoc(doc(database, "inventory", id), editData);
      Swal.fire({
        title: "Success",
        text: "Inventory Edited Successfully",
        icon: "success",
      });
      navigate("/inventoryList");
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
      const getInventoryData = await getDoc(doc(database, "inventory", id));
      setEditData(getInventoryData.data());
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
        Edit Inventory
      </Typography>
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Item Name</InputLabel>
        <Select
           value={editData.item}
           onChange={handleChange}
           name="item"
           label="Item Name"
        >
          {itemOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
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

      <FormControl fullWidth margin="normal">
        <TextField
          label="Quantity"
          type="number"
          value={editData.quantity}
          onChange={handleChange}
          name="Quantity"
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

export default EditInventory;
