import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = ({ userID }) => {
    const { id } = useParams()
    let navigate = useNavigate()

    const [Company, setCompany] = useState("")
    const [Position, setPosition] = useState("")
    const [DateApplied, setDateApplied] = useState("")
    const [Salary, setSalary] = useState("")
    const [Notes, setNotes] = useState("")
    const [Status, setStatus] = useState("Application Submitted")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState("False")
    const [deletePrompt, setDeletePrompt] = useState("")

    useEffect(() => {
        if (userID === "") {
            const path = "/login"
            navigate(path)
        } else {
            getData()
        }
    },[])
    
    const getData = async() => {
        setIsLoading(true)
        const response = await axios.get(`http://localhost:4000/api/applications/${id}`)
        setCompany(response.data.data.company)
        setPosition(response.data.data.position)
        setDateApplied(response.data.data.dateApplied)
        setSalary(response.data.data.salary)
        setNotes(response.data.data.notes)
        setStatus(response.data.data.status)
        setIsLoading(false)
    }

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
            "company": Company.trim(),
            "position": Position.trim(),
            "dateApplied": DateApplied.trim(),
            "salary": Salary.trim(),
            "notes": Notes.trim(),
            "status": Status.trim()
        }
        const response = await axios.put(`http://localhost:4000/api/applications/${id}`, application)
        if (response.status === 200) {
            const path = "/"
            navigate(path)
        } else {
            setError("Sorry, something went wrong")
        }
    }

    const handleStatusSelect = (event) => {
        setStatus(event.target.value)
    }

    const deleteApplication = async() => {
        if (deletePrompt === "") {
          setDeletePrompt("Click again to confirm delete")
        } else {
          setDeletePrompt("")
          const response = await axios.delete(`http://localhost:4000/api/applications?applicationid=${id}&userid=${userID}`)
          if (response.status === 200) {
            setError("")
            const path = "/"
            navigate(path)
          } else {
            setError("Sorry, something went wrong")
          }
        }
    }

    if (isLoading) {
        return (
            <div className='loading-container'>
              <p className='loading-text'>Loading...</p>
            </div>
        )
    } else {
        return (
            <div className='edit-container'>
                <div className="edit-form-container">
                    <form className="edit-register-form">
                        <h3 style={{ textAlign:"center", padding: '20px'}}>Edit Application Card</h3>
    
                        <input
                        className="edit-form-field"
                        type="text"
                        placeholder="Company Name"
                        value={Company}
                        onChange={(e) => setCompany(e.target.value)}/>
    
                        <input
                        className="edit-form-field"
                        type="text"
                        placeholder="Position"
                        value={Position}
                        onChange={(e) => setPosition(e.target.value)}/>
    
                        <input
                        className="edit-form-field"
                        type="text"
                        placeholder="Date Applied (MM/DD/YYYY)"
                        value={DateApplied}
                        onChange={(e) => setDateApplied(e.target.value)}/>
    
                        <input
                        className="edit-form-field"
                        type="text"
                        placeholder="Salary"
                        value={Salary}
                        onChange={(e) => setSalary(e.target.value)}/>
    
                        <input
                        className="edit-form-field"
                        type="text"
                        placeholder="Notes (Optional)"
                        value={Notes}
                        onChange={(e) => setNotes(e.target.value)}/>
    
                        <select className="edit-select-field" onChange={handleStatusSelect} value={Status}>
                            <option value="Application Submitted">Application Submitted</option>
                            <option value="Upcoming OA">Upcoming OA</option>
                            <option value="Completed OA">Completed OA</option>
                            <option value="Upcoming Interview">Upcoming Interview</option>
                            <option value="Completed Interview">Completed Interview</option>
                            <option value="Offer Received">Offer Received</option>
                            <option value="Rejected">Rejected</option>
                        </select>
    
                        <div className="edit-btn" onClick={validateSubmission}>Edit</div>
                        <div style={{textAlign:'center', color:"red"}}>{error}</div>
                    </form>
                </div>
                <div className="delete-form-container">
                    <form className="delete-register-form">
                        <div className="delete-btn" style={{ backgroundColor:'red'}} onClick={deleteApplication}>Delete</div>
                        <div style={{textAlign:'center', color:"red"}}>{deletePrompt}</div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Edit