import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.scss'

function Nabbar() {
  return (
    <div>
      <div className="navbar">
        <ul className='nav'>
            <li className='nav-item'><Link className='nav-link' to="/">Home</Link></li>
            <li className='nav-item'><Link className='nav-link' to="/add-contact">Add Contact</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Nabbar
