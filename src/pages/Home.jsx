import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Components/Modal'
import Navbar from '../Components/Navbar'
import { child, get, ref } from "firebase/database"
import { setVideos } from "../app/AuthReducer"
import { database } from '../FirebaseConfig'
import { useNavigate } from 'react-router-dom'

function Home() {
    const { videos, modal } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      const db = ref(database)
      get(child(db, "/")).then((sp) => {
        if(sp.exists()) {
            dispatch(setVideos(sp.val().videos))
        } else {
            console.log("no data result")
        }
      })
    }, [modal]);

  return (
    <div className='relative h-auto min-h-screen flex flex-col bg-background'>
      <Navbar/>
      {modal ? <Modal/>:null}
      <div className="w-full grid grid-cols-5 pt-7 gap-4">
        {videos?.map((video) => (
          <div onClick={() => navigate(`/Video/${video.name}`)} className='w-[330px] cursor-pointer hover:scale-105 transition-all duration-300 h-[300px] flex-shrink-0 p-3 rounded-xl bg-hover mb-10 mx-3 flex flex-col gap-3'>
            <img src={video.banner} className="w-full h-full rounded-xl"/>
            <h3 className='text-white font-semibold text-[16px] w-full text-center h-auto'>{video.name}</h3>
            <div className="h-[50px] flex items-center gap-3">
              <img src={video.profile} className="w-8 h-8 rounded-full hover:opacity-80"/>
              <p className='text-white text-sm'>{video.channel}</p>
            </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Home