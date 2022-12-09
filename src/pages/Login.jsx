import React from 'react'
import { useDispatch } from 'react-redux'
import { GoogleLogin, auth } from "../FirebaseConfig"
import { setUser } from "../app/AuthReducer"

function Login() {
  const dispatch = useDispatch()

  const handleLogin = async() => {
    try {
      await GoogleLogin()
      setTimeout(() => {
        const user = auth.currentUser
        dispatch(setUser({
          username: user.displayName,
          email: user.email,
          photo: user.photoURL
        }))
      }, 500);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='h-screen flex items-center justify-center bg-background'>
      <button
      className='px-10 py-4 bg-blue/50 hover:bg-hover transition-all duration-300 text-white rounded-xl'
      onClick={() => handleLogin()}
      >Log in With Google</button>
    </div>
  )
}

export default Login