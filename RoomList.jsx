
import React, { useState } from 'react'
import Room1 from '../../assets/room1.jpg'
import Room2 from '../../assets/room2.jpg'
import Room3 from '../../assets/room3.jpg'
// import Room4 from '../../asts/room4.jpg'
import Room5 from '../../assets/room5.jpg'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import AddPayment from '../Payment/Addpayment'
import { NavItem } from 'react-bootstrap'

const RoomList = () => {
  const rooms = [
    {
      id: 1,
      img: Room1,
      type: "Single Room",
      price: 2000
    },
    {
      id: 2,
      img: Room2,
      type: "Quadruple Room",
      description: "",
      price: 7000
    },
    {
      id: 3,
      img: Room3,
      type: "King Room",
      price: 2800
    },
    {
      id: 4,
      img: Room5,
      type: "Queen Room",
      price: 2800
    },
    {
      id: 5,
      img: Room1,
      type: "Studio Room",
      price: 5000
    },
    {
      id: 6,
      img: Room2,
      type: "Junior Suite",
      price: 7000
    },
    {
      id: 7,
      img: Room5,
      type: "Presidential suite",
      price: 15000
    }
  ]

  const navigate = useNavigate()
  const [payment, setPayment] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  return (
    <>
    <h2 className='text-center my-4'>Rooms</h2>
      <div className="container">
        <div className="row d-flex">
          {rooms.map(card => (
            console.log("card", card),
            <div className="col-md-4 d-flex my-3">
              <Card key={card.id} onClick={() => setSelectedId(card.id)}>
                <Card.Img variant="top" src={card.img} />
                <Card.Body>
                  <Card.Title>{card.type}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">{card.price}</Button>
                  {selectedId && selectedId == card.id ? <Button disabled className="me-2">Already Booked</Button> :
                    <><Button variant="primary" className="ml-2 ms-2 me-2 mr-2" onClick={() => navigate(`/addPayment/${card.id}`)}>Pay</Button
                    ></>
                  }
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>


    </>
  )
}

export default RoomList