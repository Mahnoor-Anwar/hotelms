
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { TextField, MenuItem, Button, Container, Typography } from "@mui/material";
import { database } from "../../Config/Firebase";

const AddService = () => {
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [charges, setCharges] = useState("");

  const navigate = useNavigate();

  const serviceOptions = [
    { value: "Dinein", label: "Dine In" },
    { value: "events", label: "Events" },
    { value: "roomService", label: "Room Service" },
    { value: "laundry", label: "Laundry" },
  ];


  const addData = async () => {
    let serviceObj = {
      serviceType,
      description,
      charges,
    };

    try {
      const addServiceData = await addDoc(
        collection(database, "services"),
        serviceObj
      );
      Swal.fire({
        title: "Success",
        text: "Service Added Successfully",
        icon: "success",
      });
      navigate("/servicesList");
      console.log(addServiceData);
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
        Add Service
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        select
        label="Service Type"
        value={serviceType}
        onChange={(e) => setServiceType(e.target.value)}
      >
        {serviceOptions.map((option) => (
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
        type="text"
        label="charges"
        name="charges"
        value={charges}
        onChange={(e) => setCharges(e.target.value)}
      />
      <Button
        variant="contained"
        // color="primary"
        className="addbtn"
        onClick={addData}
        sx={{ mt: 2 }}
      >
        Add Service
      </Button>
    </Container>
  );
};

export default AddService;

