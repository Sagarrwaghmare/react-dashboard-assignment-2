import React from 'react'
import {Link} from 'react-router-dom'


function Footer() {
  return (
    <footer className='footer bg-[#282828] flex flex-col text-center md:flex-row w-full justify-between py-4 px-10 '>
    <Link to={"#"}>Contact</Link>
    <Link to={"#"}>Company Inc</Link>
  </footer>
  )
}

export default Footer