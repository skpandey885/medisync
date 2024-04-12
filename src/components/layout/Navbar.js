import React from 'react'
import { Link } from 'react-router-dom'
import Doctors from './Doctors.js'
import Hospitals from './Hospitals.js'
import Login from './Login.js'
import Logo from './Logo'
import AwareDropdown from './AwareDropdown'
import AvailabilityDropdown from './AvailabilityDropdown'

const Navbar = () => (
  <header className='z-50 px-6 py-4 bg-white'>
    <nav className='flex items-center justify-between'>
      <Link to='/'>
        <Logo />
      </Link>
      <div className='flex items-center gap-4'>

        <Hospitals />
        <Doctors />
        <AvailabilityDropdown />
        <AwareDropdown />
        <Login />
      </div>
    </nav>
  </header>
)

export default Navbar