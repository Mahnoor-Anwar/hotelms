
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { TextField, MenuItem, Button, Container, Typography } from "@mui/material";
import { database } from "../../Config/Firebase";

const AddStaff = () => {
  const [staffName, setStaffName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [shiftTimings, setShiftTimings] = useState("");

  const navigate = useNavigate();

  const departmentOptions = [
    { value: "kitchen", label: "Kitchen" },
    { value: "roomService", label: "Room Service" },
    { value: "reception", label: "Reception" },
    { value: "cleaning", label: "Cleaning" },
    { value: "laundry", label: "Laundry" },
  ];

  const roleOptions = [
    { value: "manager", label: "Manager" },
    { value: "waiter", label: "Waiter" },
    { value: "receptionist", label: "Receptionist" },
    { value: "chef", label: "Chef" },
    { value: "sweeper", label: "Sweeper" },
  ];

  const shiftTimesOptions = [
    { value: "6:00AM - 8:00AM", label: "6:00AM - 8:00AM" },
    { value: "8:00AM - 10:30AM", label: "12:00PM - 6:00AM" },
    { value: "10:30AM - 1:00PM", label: "10:30AM - 1:00PM" },
    { value: "1:00PM - 3:30PM", label: "1:00PM - 3:30PM" },
    { value: "3:30PM - 6:00PM", label: "3:30PM - 6:00PM" },
    { value: "6:00PM - 9:00PM", label: "6:00PM - 9:00PM" },
    { value: "9:00PM - 12:00AM", label: "9:00PM - 12:00AM" },
  ];

  const addData = async () => {
    let serviceObj = {
      staffName,
      role,
      department,
      contactInfo,
      shiftTimings,
    };

    try {
      const addStaffData = await addDoc(
        collection(database, "staff"),
        serviceObj
      );
      Swal.fire({
        title: "Success",
        text: "staff Added Successfully",
        icon: "success",
      });
      navigate("/staffList");
      console.log(addStaffData);
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
        Add Staff
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Staff Name"
        onChange={(e) => setStaffName(e.target.value)}
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
        select
        label="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        {departmentOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        margin="normal"
        type="text"
        label="Contact"
        onChange={(e) => setContactInfo(e.target.value)}
      />
       <TextField
        fullWidth
        margin="normal"
        select
        label="Shift Timings"
        value={shiftTimings}
        onChange={(e) => setShiftTimings(e.target.value)}
      >
        {shiftTimesOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
        </TextField>
      <Button
        variant="contained"
        // color="primary"
        className="addbtn"
        onClick={addData}
        sx={{ mt: 2 }}
      >
        Add Staff
      </Button>
    </Container>
  );
};

export default AddStaff;

