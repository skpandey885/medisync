import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { HiChevronDown as ChevronDownIcon } from 'react-icons/hi/index'
import { Link } from 'react-router-dom'

export default function AwareDropdown() {
  return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex items-center p-4 py-2 font-medium rounded hover:bg-gray-100 hover:text-blue-500 ">
Aware
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 "
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-50 w-56 mt-2 origin-top-left bg-white rounded shadow-lg ring-1 ring-gray-200">
            <div className="flex flex-col p-1 i">
              <Menu.Item>
                  <Link className='px-4 py-2 duration-100 rounded hover:bg-gray-100' to='/others/healthcare/initiatives'>
                    Healthcare Schemes
                  </Link>

              </Menu.Item>
              <Menu.Item>
              <Link className='px-4 py-2 duration-100 rounded hover:bg-gray-100' to='/others/healthcare/conferences'>
               Conferences 
                  </Link>
              </Menu.Item>

             
            
            </div>
          </Menu.Items>
        </Transition>
      </Menu>    
  )
}
