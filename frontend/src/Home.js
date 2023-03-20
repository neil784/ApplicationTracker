import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import axios from 'axios'

const Home = ({ userID }) => {
  const [offers, setOffers] = useState([])
  const [inprogress, setInprogress] = useState([])
  const [rejected, setRejected] = useState([])
  const [firstName, setFirstName] = useState("")
  const [isLoading, setIsLoading] = useState("false")

  useEffect(() => {
    getData()
  },[])

  const getData = async() => {
    setIsLoading(true)
    const response = await axios.get(`http://localhost:4000/api/applications?userid=${userID}`)
    let offersParsing = []
    let inProgressParsing = []
    let rejectedParsing = []
    for (let i = 0; i < response.data.data.length; i++) {
      if (response.data.data[i].status === "Offer Received") {
        offersParsing.push(response.data.data[i])
      } else if (response.data.data[i].status === "Rejected") {
        rejectedParsing.push(response.data.data[i])
      } else {
        inProgressParsing.push(response.data.data[i])
      }
    }
    setOffers(offersParsing)
    setInprogress(inProgressParsing)
    setRejected(rejectedParsing)
    const response1 = await axios.get(`http://localhost:4000/api/users/${userID}`)
    setFirstName(response1.data.data.firstname)
    setIsLoading(false)
  }

  if (userID === "") {
    return (
      <div className='splashscreen-container'>
        <p>Welcome to Careeration!</p>
        <p>Please sign up or log in above.</p>
      </div>
    )
  } else if (isLoading) {
    return (
      <div className='loading-container'>
        <p>Loading...</p>
      </div>
    )
  } else if (offers.length === 0 && inprogress.length === 0 && rejected.length === 0) {
    return (
      <div className='no-card-container'>
        <Link to="/create">
          <div className='home-fab'><p className='home-fab-plus'>+</p></div> 
        </Link>
        <p>Hi {firstName},</p>
        <p>Lets add some application cards</p>
        <div className='home-arrow'/>
      </div>
    )
  } else {
    return (
      <>
        <div className='home-intro'>
          <p>Welcome {firstName}! Let's see your progress:</p>
        </div>
        <div className='home-container'>
          {offers.length !== 0 && (
            <div>
              <p className='home-titles'>Offers</p>
              {offers.length == 1 ? 
              <p className='home-statuses'>{offers.length} offer</p> : 
              <p className='home-statuses'>{offers.length} offers</p>}
              {offers.map((offer) => (
                <Link to={`/edit/${offer._id}`}>
                  <Card card={offer} />
                </Link>
              ))}
            </div>
          )}
          {inprogress.length !== 0 && (
            <div>
              <p className='home-titles'>In Progress</p>
              {inprogress.length == 1 ? 
              <p className='home-statuses'>{inprogress.length} application in progress</p> : 
              <p className='home-statuses'>{inprogress.length} applications in progress</p>}
              {inprogress.map((offer) => (
                <Link to={`/edit/${offer._id}`}>
                  <Card card={offer} />
                </Link>
              ))}
            </div>
          )}
          {rejected.length !== 0 && (
            <div>
              <p className='home-titles'>Rejected</p>
              {rejected.length == 1 ? 
              <p className='home-statuses'>{rejected.length} rejection</p> : 
              <p className='home-statuses'>{rejected.length} rejections</p>}
              {rejected.map((offer) => (
                <Link to={`/edit/${offer._id}`}>
                  <Card card={offer} />
                </Link>
              ))}
            </div>
          )}
          <Link to="/create">
            <div className='home-fab'><p className='home-fab-plus'>+</p></div> 
          </Link>
        </div>
      </>
    )
  }
}

export default Home