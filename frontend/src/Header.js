import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
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
                            <Link to="/create">
                                <div>Create Card</div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
        )

}

export default Header;