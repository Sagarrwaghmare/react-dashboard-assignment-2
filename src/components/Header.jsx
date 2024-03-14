import React from 'react'


// import { IoIosNotificationsOutline } from "react-icons/io";
// import { AiOutlineMessage } from "react-icons/ai";
// import { MdDashboard } from "react-icons/md";

function Header() {
  return (
    <header className=" bg-[#282828] flex flex-row justify-between py-4 items-center rounded-md">

    <div className='flex flex-row w-40 justify-between mx-4 items-center'>
      <div className=''>
         {/* <MdDashboard className=' text-2xl' /> */}
      </div>

      <div className=''>Dashboard</div>
    </div>
    <div>
      <ul className='flex flex-row w-20 justify-around mx-4 items-center'>
        <li>
          {/* <IoIosNotificationsOutline className=' text-2xl' /> */}
        </li>
        <li>
          {/* <AiOutlineMessage className=' text-2xl' /> */}
        </li>
      </ul>
    </div>
  </header>
  )
}

export default Header