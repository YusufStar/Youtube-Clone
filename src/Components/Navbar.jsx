import React from 'react'
import logo from "./Logo.svg"
import { MdOutlineVideoCall } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from "../app/AuthReducer"
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate();

  return (
    <div className='w-full h-auto py-3 px-7 flex items-center justify-between bg-background'>
        <div className="h-auto w-full"><img onClick={() => navigate("/")} src={logo} className="h-[20px] cursor-pointer w-[90px]w"/></div>
          <input type="text" className='relative rounded-3xl caret-text ml-[32px] custom-p2 flex items-center bg-background border border-primary text-white w-full h-[40px] outline-none' placeholder='Ara'/>
        <div className="h-auto w-full gap-5 flex items-center justify-end">
          <MdOutlineVideoCall onClick={() => dispatch(setModal())} size={40} className="cursor-pointer p-2 hover:bg-hover rounded-full" color='#fff'/>
          <img src={user?.photo} alt={user?.username} className="w-[30px] h-[30px] rounded-full cursor-pointer hover:bg-primaryText"/>
        </div>
    </div>
  )
}

export default Navbar