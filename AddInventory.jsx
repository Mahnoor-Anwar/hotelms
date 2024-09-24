
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { TextField, MenuItem, Button, Container, Typography } from "@mui/material";
import { database } from "../../Config/Firebase";

const AddInventory = () => {
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setquantity] = useState("");

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


  const addData = async () => {
    let inventoryObj = {
      item,
      description,
      quantity,
    };

    try {
      const AddInventoryData = await addDoc(
        collection(database, "inventory"),
        inventoryObj
      );
      Swal.fire({
        title: "Success",
        text: "Inventory Added Successfully",
        icon: "success",
      });
      navigate("/inventoryList");
      console.log(AddInventoryData);
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
      });
    }
  };

  return (
    <Container className="container  mt-5">
      <Typography variant="h4" gutterBottom>
        Add Inventory
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        select
        label="Item Name"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      >
        {itemOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      
      <TextField
        fullWidth
        margin="normal"
        type="text"
        label="Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
        <TextField
        fullWidth
        margin="normal"
        type="number"
        label="quantity"
        name="quantity"
        value={quantity}
        onChange={(e) => setquantity(e.target.value)}
      />
      <Button
        variant="contained"
        // color="primary"
        className="addbtn"
        onClick={addData}
        sx={{ mt: 2 }}
      >
        Add Inventory
      </Button>
    </Container>
  );
};

export default AddInventory;

