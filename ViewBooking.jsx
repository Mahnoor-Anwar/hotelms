import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../../Config/Firebase'

const ViewBooking = () => {
    const [singleDta , setSingleData]= useState({
        roomid:"",
        checkin:"",
        checkout:""
    })
    const {id} = useParams()
    console.log("id",id)
    const getSingleData = async() => {
        try{
            const bookData = await getDoc(doc(database, "booking", id))
            console.log("bookdata", bookData.data())
            setSingleData(bookData.data())
        } catch(err){
            console.log(err)
        }
        
    }
    
   
    console.log("data", singleDta)
    useEffect(()=>{
        getSingleData()
    },[])
  return (
    <>
    {singleDta ? 
    <>
        <div className="container">
            <h1 className='text-center my-3'>Booking History</h1>
            <div className="row">
                <div className="col-md-6 heading">Status</div>  
                <div className="col-md-6">
                <div className="pending-status">
                    Pending
                </div>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-md-6 heading">Booking ID</div>
                <div className="col-md-6">{id}</div>
            </div>
            <hr />
            <div className="row">
                <div className="col-md-6 heading">Room Id</div>
                <div className="col-md-6">{singleDta.roomid}</div>
            </div>
            <hr />
            <div className="row">
                <div className="col-md-6 heading">Check In</div>
                <div className="col-md-6">{singleDta.checkin}</div>
            </div>
            <hr />
            <div className="row">
                <div className="col-md-6 heading">Check Out</div>
                <div className="col-md-6">{singleDta.checkout}</div>
            </div>
        </div>
    </>:
    `no data for user: ${id}`}
  
    {/* <h3>{singleDta.checkin}</h3>
    <h3>{singleDta.checkout}</h3> */}
    </>
  )
}

export default ViewBooking