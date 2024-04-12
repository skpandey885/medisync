import { Menu } from '@headlessui/react'
import { Link } from 'react-router-dom'

export default function Doctors() {
  return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
        <Link to='/browse/doctors' className="inline-flex items-center px-4 py-2 font-medium rounded hover:bg-gray-100 hover:text-blue-500">
            Doctors

          </Link>
        </div>
       
      </Menu>    
  )
}
