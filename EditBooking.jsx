
import { addDoc, collection, getDoc , doc, updateDoc} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../../Config/Firebase";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, MenuItem, Button, Container, Typography } from "@mui/material";


const EditBooking = () => {
  const [editData , setEditData] = useState({
    checkin:"",
    checkout:"",
    roomid:""
  })


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
      await updateDoc(doc(database, "booking", id), editData);
      Swal.fire({
        title: "Success",
        text: "Booking Edited Successfully",
        icon: "success",
      });
      navigate("/bookList");
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
      const getBookingData = await getDoc(doc(database, "booking", id));
      setEditData(getBookingData.data());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);


 

  return (
    <Container className="container  mt-5">
      <Typography variant="h4" gutterBottom>
        Edit Customer Booking
      </Typography>
      <TextField
        disabled
        fullWidth
        margin="normal"
        label="Customer ID"
        value={id}
        
      />
      <TextField
        fullWidth
        margin="normal"
        type="number"
        label="Room Id"
        value={editData.roomid}
        onChange={handleChange}
      />
     
     <TextField
        fullWidth
        margin="normal"
        type="date"
        label="check In"
        name="checkin"
        value={editData.checkin}
        onChange={handleChange}
      />
       <TextField
        fullWidth
        margin="normal"
        type="date"
        label="Check out"
        name="checkout"
        value={editData.checkout}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        // color="primary"
        className="addbtn"
        onClick={handleEdit}
        sx={{ mt: 2 }}
      >
        {/* <Edit></Edit> */}
      </Button>
    </Container>
  );
};

export default EditBooking;

