import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Create = ({ userID }) => {
    let navigate = useNavigate()

    useEffect(() => {
        if (userID === "") {
            const path = "/login"
            navigate(path)
        }
      },[])

    const [Company, setCompany] = useState("")
    const [Position, setPosition] = useState("")
    const [DateApplied, setDateApplied] = useState("")
    const [Salary, setSalary] = useState("")
    const [Notes, setNotes] = useState("")
    const [Status, setStatus] = useState("Application Submitted")
    const [error, setError] = useState("")

    const validateSubmission = () => {
        if (Company.trim() === "") {
            setError("Company name is not valid")
        } else if (Position.trim() === "") {
            setError("Position name is not valid")
        } else if (!isDateValid(DateApplied)) {
            setError("Date applied is not valid")
        } else if (Salary.trim() === "") {
            setError("Salary entry is not valid")
        }  else {
            setError("")
            makeRequest()
        }
    }

    function isDateValid(dateString) {
        const pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
        return pattern.test(dateString);
    }

    const makeRequest = async() => {
        const application = {
            "userid": userID,
            "company": Company.trim(),
            "position": Position.trim(),
            "dateApplied": DateApplied.trim(),
            "salary": Salary.trim(),
            "notes": Notes.trim(),
            "status": Status.trim()
        }
        const response = await axios.post("http://localhost:4000/api/applications", application)
        if (response.status === 201) {
            const path = "/"
            navigate(path)
        } else {
            setError("Sorry, something went wrong")
        }
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
                placeholder="Date Applied (MM/DD/YYYY)"
                onChange={(e) => setDateApplied(e.target.value)}/>

                <input
                className="create-form-field"
                type="text"
                placeholder="Salary"
                onChange={(e) => setSalary(e.target.value)}/>

                <input
                className="create-form-field"
                type="text"
                placeholder="Notes (Optional)"
                onChange={(e) => setNotes(e.target.value)}/>

                <select className="create-select-field" onChange={handleStatusSelect}>
                    <option value="Application Submitted">Application Submitted</option>
                    <option value="Upcoming OA">Upcoming OA</option>
                    <option value="Completed OA">Completed OA</option>
                    <option value="Upcoming Interview">Upcoming Interview</option>
                    <option value="Completed Interview">Completed Interview</option>
                    <option value="Offer Received">Offer Received</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <div className="create-btn" onClick={validateSubmission}>Create</div>
                <div style={{textAlign:'center', color:"red"}}>{error}</div>
            </form>
            </div>
    </div>
  )
}

export default Create