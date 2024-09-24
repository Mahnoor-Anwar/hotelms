
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { TextField, MenuItem, Button, Container, Typography } from "@mui/material";
import { database } from "../../config/Firebase";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();


  const addData = async () => {
    let customerObj = {
      name,
      email,
      phone,
      address
    };

    try {
      const addCustomerData = await addDoc(
        collection(database, "customer"),
        customerObj
      );
      Swal.fire({
        title: "Success",
        text: "Customer Added Successfully",
        icon: "success",
      });
      navigate("/customerList");
      // console.log(addCustomerData.data().id);
      // localStorage.setItem("customerId", addCustomerData)

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
        Add Customer
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Customer Name"
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        type="email"
        label="Customer Email"
        onChange={(e) => setEmail(e.target.value)}
      />
     
     <TextField
        fullWidth
        margin="normal"
        type="text"
        label="Phone"
        onChange={(e) => setPhone(e.target.value)}
      />
       <TextField
        fullWidth
        margin="normal"
        type="text"
        label="Address"
        onChange={(e) => setAddress(e.target.value)}
      />
      <Button
        variant="contained"
        // color="primary"
        className="addbtn"
        onClick={addData}
        sx={{ mt: 2 }}
      >
        Add Customer
      </Button>
    </Container>
  );
};

export default AddCustomer;

