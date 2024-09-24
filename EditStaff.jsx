import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../../Config/Firebase";
import Swal from "sweetalert2";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Container, Typography, Paper } from '@mui/material';

const EditStaff = () => {
  const [editData, setEditData] = useState({
    staffName: "",
    role: "",
    department: "",
    contactInfo: "",
    shiftTimings: "",
  });
  const { id } = useParams();
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
  const handleChange = (e) => {
    const { name } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const handleEdit = async () => {
    try {
      await updateDoc(doc(database, "staff", id), editData);
      Swal.fire({
        title: "Success",
        text: "Staff Edited Successfully",
        icon: "success",
      });
      navigate("/staffList");
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
      const getStaffData = await getDoc(doc(database, "staff", id));
      setEditData(getStaffData.data());
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
        Edit Staff
      </Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Staff Name"
          value={editData.staffName}
          onChange={handleChange}
          name="staffName"
          variant="outlined"
        />
      </FormControl>
     
      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
          value={editData.role}
          onChange={handleChange}
          name="role"
          label="Role"
        >
          {roleOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Department</InputLabel>
        <Select
          value={editData.department}
          onChange={handleChange}
          name="department"
          label="Department"
        >
          {departmentOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          label="Roll Number"
          type="text"
          value={editData.contactInfo}
          onChange={handleChange}
          name="contactInfo"
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Shift Timimgs</InputLabel>
        <Select
          value={editData.shiftTimings}
          onChange={handleChange}
          name="shiftTimings"
          label="Shift Timimgs"
        >
          {shiftTimesOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
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

export default EditStaff;
