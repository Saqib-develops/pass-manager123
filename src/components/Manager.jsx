import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords")

    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }

  }, [])

  const showPassword = (params) => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("assets/eye-crossed.svg")) {
      ref.current.src = "assets/images.png"
      passwordRef.current.type = "password"
    }
    else {
      ref.current.src = "assets/eye-crossed.svg"
      passwordRef.current.type = "text"
    }

  }
  const savePassword = () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      setform({ site: "", username: "", password: "" })
      toast('🦄 Password saved successfully', {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        hideProgressBar: "false",
      });
    }
    else{
      toast('🦄Error: Password not saved!', {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        hideProgressBar: "false",
      });
    }


  }
  const deletePassword = (id) => {
    console.log("deleting password with:", id)
    let c = confirm("Do you really want to delete?")
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id))
      localStorage.setItem("passwords", JSON.stringify((passwordArray.filter(item => item.id !== id))))
    }
    toast('🦄 Password deleted successfully', {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      hideProgressBar: "false",
    });

  }
  const editPassword = (id) => {
    toast('🦄 Please edit your entries', {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      hideProgressBar: "false",
    });
    setform(passwordArray.filter(i => i.id === id)[0])
    setpasswordArray(passwordArray.filter(item => item.id !== id))

  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const copyItem = (Item) => {
    toast('🦄 Copied to Clipboard!', {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      hideProgressBar: "false",
    });
    navigator.clipboard.writeText(Item)
  }



  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="md:mycontainer p-2 md:p-0">
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-700'> &lt; </span>
          Pass
          <span className='text-green-700'> OP/ &gt; </span>

        </h1>
        <p className='text-green-900 text-lg text-center font-bold'>Your own Password Manager</p>
        <div className="text-white flex flex-col p-4 gap-8 items-center">
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 text-black p-4 py-1 w-full' type="text" name="site" id="site" />
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 text-black p-4 py-1  w-full' type="text" name="username" id="username" />
            <div className='relative'>
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 text-black p-4 py-1  w-full' type="password" name="password" id="password" />
              <span className='absolute right-2 border border-white top-1.5 cursor-pointer' onClick={showPassword}>
                <img ref={ref} width={30} src="assets/images.png" alt="" />
              </span>
            </div>
          </div>

          <button onClick={savePassword} className='text-center text-black flex justify-center items-center bg-green-500 p-2 px-4 rounded-full font-bold hover:bg-green-400 w-fit border border-black'>
            <lord-icon
              src="https://cdn.lordicon.com/tsrgicte.json"
              trigger="hover">
            </lord-icon>Save Password</button>
        </div>
        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 &&
            <table className="table-auto w-full rounded-md overflow-hidden mb-10 ">
              <thead className='bg-green-800 text-white'>
                <tr>
                  <th className='py-2 border border-white'>Site</th>
                  <th className='py-2 border border-white'>Username</th>
                  <th className='py-2 border border-white'>Password</th>
                  <th className='py-2 border border-white'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-green-100'>
                {passwordArray.map((item, index) => {
                  return <tr key={index}>
                    <td className='text-center  py-2 border border-white '>
                      <div className='flex justify-center items-center gap-2'>
                        <a href={item.site.startsWith("http://") || item.site.startsWith("https://")
                          ? item.site
                          : `http://${item.site}`}
                          target="_blank">{item.site}</a>
                        <img className='invert cursor-pointer left-0 w-6' onClick={() => { copyItem(item.site) }} src="src/assets/copy.svg" alt="" />
                      </div>

                    </td>
                    <td className='text-center py-2 border border-white'><div className='flex justify-center items-center gap-2'>{item.username}<img className='invert cursor-pointer left-0 w-6' onClick={() => { copyItem(item.username) }} src="src/assets/copy.svg" alt="" /></div></td>
                    <td className='text-center py-2 border border-white'><div className='flex justify-center items-center gap-2'>{item.password}<img className='invert cursor-pointer left-0 w-6' onClick={() => { copyItem(item.password) }} src="src/assets/copy.svg" alt="" /></div></td>
                   <td className="text-center py-2 border border-white flex items-center justify-center gap-4 hover:cursor-pointer">
                     <span className="flex items-center justify-center gap-4">
                        <Edit 
                            onClick={() => editPassword(item.id)}
                            className="cursor-pointer hover:text-green-600 transition-colors" 
                            size={22}
                            strokeWidth={2}
                        />
                       <Trash2 
                            onClick={() => deletePassword(item.id)}
                            className="cursor-pointer hover:text-red-600 transition-colors" 
                            size={22}
                            strokeWidth={2}
                       />
                     </span>
                    </td>

                  </tr>

                })}

              </tbody>
            </table>}
        </div>

      </div>
    </>
  )
}

export default Manager
