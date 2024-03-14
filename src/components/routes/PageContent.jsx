import React from 'react'
import {Routes,Route} from 'react-router-dom'

import Dashboard from '../../pages/Dashboard';
import Layout from '../../pages/Layout';
import Products from '../../pages/Products';
import Order from '../../pages/Order';


import {Link,Outlet} from 'react-router-dom';
// import { AiFillDashboard,AiOutlineDropbox,AiOutlineShoppingCart} from "react-icons/ai";
import CalendarView from '../../pages/Calendar';




function PageContent() {
  
  const linkClass = "mx-2 text-xl hover:bg-[#3f3f3f]  rounded-lg"
  return (
    
    <main className='mainsection  flex flex-col w-full md:flex-row' >        
      
        {/* Navigation */}
        <div className=" bg-[#282828]" >
          <nav className=" ">
              <ul className='flex flex-col gap-2 rounded-md py-3'>
                <li className={linkClass}>
                  <Link to="/" className='flex flex-row items-center space-x-2 p-2'>
                    {/* <AiFillDashboard /> */}
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className={linkClass}>
                  <Link to="product" className='flex flex-row items-center space-x-2 p-2'>
                    {/* <AiOutlineDropbox /> */}
                    <span>Product</span>
                  </Link>
                </li>
                <li className={linkClass}>
                  <Link to="order" className='flex flex-row items-center space-x-2 p-2'>
                      {/* <AiOutlineShoppingCart /> */}
                      <span>Order</span>
                  </Link>
                </li>
                
              </ul>
          </nav>
      </div >

      {/* Routes */}
      <Routes >
            <Route path="/" element={                  
              <div  className="bg-[#121212] w-full">
                <Outlet ></Outlet>
              </div>
            }>

              <Route path="/" element={<Dashboard />} />
              
              <Route path="product" element={<Products />} />
              
              <Route path="order" element={<Order />} />
              
              {/* <Route path="calendar" element={<CalendarView/>} /> */}
            </Route>
      </Routes>
    </main>
  )
}

export default PageContent