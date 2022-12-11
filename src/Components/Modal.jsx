import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, ref as strRef, uploadBytesResumable } from "@firebase/storage"
import { database, storage } from "../FirebaseConfig"
import { ref, set } from 'firebase/database'
import { setModal } from '../app/AuthReducer'

function Modal() {
    const [progress, setProgress] = useState(0)
    const { user, videos } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [video, setvideo] = useState({
        banner: "",
        video: "",
        name: "",
        profile: user.photo,
        channel: user.username
    })

    useEffect(() => {
        setTimeout(() => {
            if(progress === 100) {
                setProgress(0)
            }
        }, 1000)   
    })

    const uploadFiles = (file, isBanner) => {
        if (!file) return;
        const storageRef = strRef(storage,`/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapsot) => {
            const prog = Math.round(snapsot.bytesTransferred / snapsot.totalBytes * 100)
            setProgress(prog)
            console.log("start progress")
        }, (err) => console.log(err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
                isBanner ? setvideo((prev) => ({...prev, banner: url})) : setvideo((prev) => ({...prev, video: url}))
            })
        })
    }

    const uploadDataFromRealtimeDatabas = () => {
        set(ref(database, "videos/"), [...videos, video]).then(() => {
            dispatch(setModal())
            setvideo({
                banner: "",
                video: "",
                name: "",
                profile: user.photo,
                channel: user.username
            })
        })
    }

    const postVideo = async(e) => {
        e.preventDefault()
        if (video.banner !== "" && video.video !== "" && video.name !== "") {
            uploadDataFromRealtimeDatabas()
            setProgress(0)
        }
    }

  return (
    <div className='absolute h-full w-full flex items-center justify-center z-0'>
        <form onSubmit={(e) => postVideo(e)} className="w-[50%] h-[50%] relative flex z-10 flex-col items-center justify-center px-32 py-7 bg-hover rounded-xl gap-3">
            <h1 className='absolute z-20 text-white right-5 top-3 font-bold text-xl cursor-pointer hover:text-blackText animate-bounce' onClick={() => {
                dispatch(setModal())
                setvideo({
                    banner: "",
                    video: "",
                    name: "",
                    profile: user.photo,
                    channel: user.username
                })
            }}>X</h1>
            <Dropzone
            disabled={progress > 0}
                multiple={false}
                onDrop={(file) => uploadFiles(file[0], true)}
            >
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className='py-4 text-white bg-background hover:opacity-60 cursor-pointer w-full px-3 rounded-xl flex items-center'>
                        <input {...getInputProps()} />
                        {!video?.banner ? (
                            <p>Add Banner Picture Here</p>
                        ) : (
                            <h3 className='text-blue'>banner eklendi</h3>
                        )}
                    </div>
                )}
            </Dropzone>            
            <Dropzone
            disabled={progress > 0}
                multiple={false}
                onDrop={(file) => uploadFiles(file[0], false)}
            >
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className='py-4 text-white bg-background hover:opacity-60 cursor-pointer w-full px-3 rounded-xl flex items-center'>
                        <input {...getInputProps()} />
                        {!video?.video ? (
                            <p>Add Video Here</p>
                        ) : (
                            <h3 className='text-blue'>video eklendi</h3>
                        )}
                    </div>
                )}
            </Dropzone>            
            <input value={video.name} onChange={(e) => setvideo((prev) => ({...prev, name: e.target.value}))} required type="text" className='w-full py-4 rounded-xl bg-background outline-none px-3 text-white' placeholder='Enter Video Name'/>
            <button type='submit' disabled={progress > 0} className='bg-blue text-semibold px-5 py-3 hover:opacity-80 rounded-xl text-white'>{progress > 0 ? `${progress}%`:"Videoyu Paylaş"}</button>
        </form>
    </div>
  )
}

export default Modal