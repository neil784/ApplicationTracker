import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = ({ getUserID }) => {
    let navigate = useNavigate()
    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const validateSubmission = async() => {
        if (FirstName.trim() === "") {
            setError("First name is not valid")
        } else if (LastName.trim() === "") {
            setError("Last name is not valid")
        } else if (!Email.trim().includes("@") || !Email.trim().includes(".")) {
            setError("Email is not valid")
        } else if (Password.trim() === "") {
            setError("Password is not valid")
        } else if (ConfirmPassword !== Password) {
            setError("Passwords do not match")
        } else {
            setError("")
            const user = {
                firstname: FirstName,
                lastname: LastName,
                email: Email,
                password: Password
            }
            try {
                const response = await axios.post("http://localhost:4000/api/users/", user)
                console.log(response)
                if (response.status === 201) {
                    getUserID(response.data.data)
                    const path = "/"
                    navigate(path)
                }
                setError("Sorry, something went wrong")
            } catch (err) {
                if (err.response.data.message === "Error: email already exists") {
                    setError("This email is already in use")
                } else {
                    setError("Sorry, something went wrong")
                }
            }
        }
    }

    return (
        <div className='signup-container'>
            <div className="signup-form-container">
                <form className="signup-register-form">
                    <h3 style={{ textAlign:"center", padding: '20px'}}>Create Account</h3>
    
                    <input
                    className="signup-form-field"
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}/>
    
                    <input
                    className="signup-form-field"
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}/>
    
                    <input
                    className="signup-form-field"
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}/>
    
                    <input
                    className="signup-form-field"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}/>

                    <input
                    className="signup-form-field"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}/>
    
                    <div className="signup-btn" onClick={validateSubmission}>Create Account</div>
                    <div style={{textAlign:'center', color:"red"}}>{error}</div>
                </form>
                </div>
        </div>
      )
}

export default Signup