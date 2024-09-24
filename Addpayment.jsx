
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, MenuItem, Button, Container, Typography } from "@mui/material";
import { database } from "../../Config/Firebase";
import jsPDF from "jspdf";

const AddPayment = () => {
  const [customerId, setCustomerId] = useState("");
  const [customerName, setcustomerName] = useState("")
  const [serviceType, setServiceType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const navigate = useNavigate();
  const {id} = useParams()

  const serviceOptions = [
    { value: "Dine In", label: "Dine In" },
    { value: "Events", label: "Events" },
    { value: "Room Service", label: "Room Service" },
    { value: "Laundry", label: "Laundry" },
  ];

  const paymentOptions = [
    { value: "Credit/Debit Card", label: "Credit/Debit Card" },
    { value: "Bank Transfer", label: "Bank Tranfer" },
    { value: "Net Banking", label: "Net Banking" },
    { value: "Cheque", label: "Cheque" },
  ];
  const addData = async () => {
    let serviceObj = {
      customerId,
      customerName,
      serviceType,
      paymentMethod,
      
    };

    try {
      const addPaymenetData = await addDoc(
        collection(database, "payment"),
        serviceObj
      );
      Swal.fire({
        title: "Success",
        text: "payment invoice created Successfully",
        icon: "success",
      });
      generateFeePdf()
      navigate("/roomList");
   
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
      });
    }
  };

  const [amount, setAmount]  = useState(0)
  if(serviceType==="Dinein"){
    setAmount(1500);
  } else if (serviceType==="events") {
    amount=5000
  }
  else if (serviceType==="roomService") {
    amount=3500
  } else if (serviceType==="laundry") {
    amount=2800
  }
  const generateFeePdf =() => {
        const doc = new jsPDF();
    
        doc.text('Hotel Account Number: 992071267890', 10, 10);
        doc.text('Bank Name: Meezan Bank', 10, 20);
        doc.text(`Customer ID: ${customerId}`, 10, 30);
        doc.text(`Customer Name: ${customerName}`, 10, 40);
        doc.text(`Service Type: ${serviceType}`, 10, 50);
        doc.text(`Payment Method: ${paymentMethod}`, 10, 60);
        doc.text(`Total: ${amount}`, 10, 70);
     
    
        // Save the PDF
        doc.save('customer-invoice.pdf');
      }

  return (
    <Container className="container  mt-5">
      <Typography variant="h4" gutterBottom>
        Creaate Payment
      </Typography>
      <TextField
        fullWidth
        disabled
        margin="normal"
        type="id"
        label="customerId"
        name="customerId"
        value={id}
        // onChange={(e) => setCustomerId(e.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        type="text"
        label="customer Name"
        name="customerName"
        value={customerName}
        onChange={(e) => setcustomerName(e.target.value)}
      />
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
        select
        label="Payment Type"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        {paymentOptions.map((option) => (
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
        Download Invoice
      </Button>

    </Container>
  );
};

export default AddPayment;

