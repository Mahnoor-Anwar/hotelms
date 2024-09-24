
import { addDoc, collection, getDoc , doc} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, MenuItem, Button, Container, Typography } from "@mui/material";
import { database } from "../../Config/Firebase";


const AddBooking = () => {
  const [checkin , setCheckIn] = useState((""))
  const [checkout , setCheckout] = useState((""))
  const [roomid , setRoomid] = useState("")

  const { id } = useParams();
  const navigate = useNavigate();


  const addData = async () => {
    let BookingObj = {
      roomid,
      checkin,
      checkout
    };

    try {
      const addBookingData = await addDoc(
        collection(database, "booking"),
        BookingObj
      );
      
      Swal.fire({
        title: "Success",
        text: "Booking Added Successfully",
        icon: "success",
      });
      navigate(`/bookList`);
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
        Create Booking
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
        name="roomid"
        onChange={(e)=>setRoomid(e.target.value)}
      />
     
     <TextField
        fullWidth
        margin="normal"
        type="date"
        label="check In"
        name="checkin"
        value={checkin}
        onChange={(e) => setCheckIn(e.target.value)}
      />
       <TextField
        fullWidth
        margin="normal"
        type="date"
        label="Check out"
        name="checkout"
        value={checkout}
        onChange={(e) => setCheckout(e.target.value)}
      />
      <Button
        variant="contained"
        // color="primary"
        className="addbtn"
        onClick={addData}
        sx={{ mt: 2 }}
        bookid={id}
      >
        Create
      </Button>
    </Container>
  );
};

export default AddBooking;

