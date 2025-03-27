import React from 'react'

const DashboardSearch = () => {
  return (
    <div>
      {/* serach bar */}
      <div className='flex flex-col'>
        <div className='flex items-center'>
          <input type='text' placeholder='Search for developer mate....' className=' p-2 pl-6
           border rounded-4xl outline-none flex-1'/>
          <button className='p-2 bg-blue-500 text-white rounded-2xl ml-2'>Search</button>
        </div>
      </div>

      {/* connetions grid */}
      <div>

      </div>
    </div> 
    
  )
}

export default DashboardSearch