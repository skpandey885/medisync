import React from 'react'

const MedicineCard = ({name, description, quantity, brands}) => {
  return (

    <div
    className="flex flex-col m-3 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 h-[250px] w-[450px] " 
  >
    <img
      className="object-cover w-full rounded-t-lg md:h-full md:w-48 md:rounded-none md:rounded-s-lg"
      src="https://th.bing.com/th/id/OIP.0R2Ok_0eIm9hZKJl8IHp4AAAAA?w=246&h=180&c=7&r=0&o=5&dpr=2&pid=1.7"
      alt=""
    />
    <div className="flex flex-col p-4 overflow-y-scroll leading-normal">
      <h6 className="mb-2 text-2xl tracking-tight text-gray-900 font-rubik ">
    {name}
      </h6>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      {description}
      </p>
      <span > 
      <span className='underline'> 
        Brands</span>: {brands}</span>
      <span> 
        
      <span className='underline'>Quantity</span>: {quantity}</span>
    </div>
  </div>

  )
}

export default MedicineCard