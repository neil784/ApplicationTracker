import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ userID, getUserID }) => {
    if (userID === "") {
        return (
            <>
                <div className="header">
                    <div className="title">
                        <Link to="/">
                            <h1>Careeration</h1>
                        </Link> 
                    </div>
                    <div>
                        <ul className="list">
                            <li>
                                <Link to="/signup">
                                    <div>Sign up</div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/login">
                                    <div>Log in</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
          )
    } else {
        return (
            <>
                <div className="header">
                    <div className="title">
                        <Link to="/">
                            <h1>Careeration</h1>
                        </Link> 
                    </div>
                    <div>
                        <ul className="list">
                            <li>
                                <Link to="/">
                                    <div>Home</div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/">
                                    <div onClick={()=>getUserID("")}>Sign out</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
          )
    }
}

export default Header