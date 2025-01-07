import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">
        <div className="logo font-bold text-2xl">
          <span className='text-green-700'> &lt; </span>
          Pass
          <span className='text-green-700'> OP/ &gt; </span>
        </div>
       
        <button className='flex text-white justify-center items-center gap-2 bg-green-700 font-bold p-1 rounded-2xl px-2 ring-white ring-1'>
          <img width={40} className='invert rounded-full' src="assets/github.png" alt="" />
          GitHub
        </button>
      </div>
    </nav>
  )
}

export default Navbar
