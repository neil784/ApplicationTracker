import React, { useState } from 'react'
import axios from 'axios'

const Create = () => {
    const [Company, setCompany] = useState("")
    const [Position, setPosition] = useState("")
    const [Salary, setSalary] = useState("")
    const [Notes, setNotes] = useState("")
    const [Status, setStatus] = useState("Application Submitted")
    const [error, setError] = useState("")

    const validateSubmission = () => {
        if (Company.trim() === "") {
            setError("Company name is not valid")
        } else if (Position.trim() === "") {
            setError("Position name is not valid")
        } else if (Salary.trim() === "") {
            setError("Salary entry is not valid")
        }  else {
            setError("")
            makeRequest()
        }
    }

    const makeRequest = async() => {
        const card = {
            "company":Company.trim(),
            "position":Position.trim(),
            "salary":Salary.trim(),
            "notes":Notes.trim(),
            "status":Status.trim()
        }
        console.log(card)
        /*const response = await axios.post("http://34.83.134.92/resturants/addResturant", vendor)
        if (response.status === 200) {
            alert("Your Vendor ID is: " + VendorId)
            const path = "/admin"
            navigate(path)
        } else {
            setError("Sorry, something went wrong")
        }*/
    }

    const handleStatusSelect = (event) => {
        setStatus(event.target.value)
    }

  return (
    <div className='create-container'>
        <div className="create-form-container">
            <form className="create-register-form">
                <h3 style={{ textAlign:"center", padding: '20px'}}>Create New Card</h3>

                <input
                className="create-form-field"
                type="text"
                placeholder="Company Name"
                onChange={(e) => setCompany(e.target.value)}/>

                <input
                className="create-form-field"
                type="text"
                placeholder="Position"
                onChange={(e) => setPosition(e.target.value)}/>

                <input
                className="create-form-field"
                type="text"
                placeholder="Salary"
                onChange={(e) => setSalary(e.target.value)}/>

                <input
                className="create-form-field"
                type="text"
                placeholder="Notes (optional)"
                onChange={(e) => setNotes(e.target.value)}/>

                <select className="create-select-field" onChange={handleStatusSelect}>
                    <option value="Application Submitted">Application Submitted</option>
                    <option value="Upcoming OA">Upcoming OA</option>
                    <option value="Completed OA">Completed OA</option>
                    <option value="Upcoming Interview">Upcoming Interview</option>
                    <option value="Completed Interview">Completed Interview</option>
                    <option value="Offer Recieved">Offer Recieved</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <div className="btn" onClick={validateSubmission}>Create</div>
                <div style={{textAlign:'center', color:"red"}}>{error}</div>
            </form>
            </div>
    </div>
  )
}

export default Create