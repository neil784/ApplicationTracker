import React, {  useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ getUserID }) => {
    let navigate = useNavigate()
    const [inputEmail, setInputEmail] = useState("")
    const [inputPassword, setInputPassword] = useState("")
    const [error, setError] = useState("")

    const authenticate = async() => {
        if (!inputEmail.trim().includes("@") || !inputEmail.trim().includes(".")) {
            setError("Email is not valid")
        } else if (inputPassword === "") {
            setError("Password is not valid")
        } else {
            setError("")
            const body = {"email": inputEmail, "password": inputPassword}
            const response = await axios.put("http://localhost:4000/api/users/", body)
            if (response.data.message === "Error: email does not exist") {
                setError("Email does not exist")
            } else if (response.data.message === "Error: incorrect password") {
                setError("Password is incorrect")
            } else {
                setError("")
                getUserID(response.data.data)
                const path = "/"
                navigate(path)
            }
        }
    }

    return (
        <div className='login-container'>
            <div className="login-form-container">
                <form className="login-register-form">
                    <h3 style={{ textAlign:"center", padding: '20px'}}>Log in</h3>
                    
                    <input
                    className="login-form-field"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    placeholder="Email"/>

                    <input
                    type="password"
                    className="login-form-field"
                    onChange={(e) => setInputPassword(e.target.value)}
                    placeholder="Password"/>

                    <div style={{textAlign:'center', color:"red"}}>{error}</div>
                    <div className="login-btn" onClick={authenticate}>Log in</div>
                </form>
            </div>

            <div className="login-form-container">
              <form className="login-register-form">
                <Link to="/signup">
                  <div className="login-btn">Create Account</div>
                </Link>
              </form>
            </div>

        </div>
      )
}

export default Login