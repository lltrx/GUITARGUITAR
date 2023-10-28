"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {motion} from "framer-motion"

export default function Login() {

  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })


  useEffect(() => {
    if (localStorage.getItem('user') !== null || localStorage.getItem('user') !== undefined) {
      localStorage
    }
  }, [])

  const handleChange = (e) => {
    setFormState({
        ...formState,
        [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('api/customers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json()

    const user = data.find((user) => user.email === formState.email)

    if (!user || formState.password !== "password") {
      alert('Invalid email or password')
      return
    }

    const userJson = JSON.stringify(user)

    localStorage.setItem('user', userJson)

    alert('Logged in successfully')

    window.location.href = '/orders'
  }



  return (
      <div className="relative flex top-0 left-0 w-screen h-screen">
        <video
          id="background-video"
          loop
          autoPlay
          muted
          className="w-full h-full object-cover z-0"
        >
          <source src="guitarguitar.mp4" type="video/mp4" />
        </video>
        <div className="absolute w-full h-full inset-0 bg-black bg-opacity-70 z-10" />
        <div className="absolute flex justify-center items-center w-screen h-screen top-0 left-0 z-20">
          <div className="flex flex-col items-center justify-center bg-primary text-white px-20 py-16 rounded-3xl">
          <div className="mx-auto">
            <div className="flex justify-center">
              <Image src="/logo.png" alt="logo" width={200} height={200} />
            </div>
            <form className="pt-8" onSubmit={handleSubmit}>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-8 text-gray-700 sm:text-base sm:leading-7">
                  <div className="relative">
                    <input autoComplete="off" id="email" name="email" type="text" value={formState.email} onChange={handleChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 rounded-3xl p-6" placeholder="Email address" />
                    <label htmlFor="email" className="absolute pl-5 left-0 -top-0.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-3.5 transition-all peer-focus:-top-0.5 peer-focus:text-secondary peer-focus:text-sm">Email Address</label>
                  </div>
                  <div className="relative">
                    <input autoComplete="off" id="password" name="password" type="password" value={formState.password} onChange={handleChange} className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 rounded-3xl p-6" placeholder="Password" />
                    <label htmlFor="password" className="absolute pl-5 left-0 -top-0.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-3.5 transition-all peer-focus:-top-0.5 peer-focus:text-secondary peer-focus:text-sm">Password</label>
                  </div>
                  <div className="flex relative justify-center pt-10">
                    <button type="submit" className="bg-primary text-white text-lg border-secondary border-2 rounded-3xl px-4 py-1 hover:transition-all ease-in-out hover:bg-secondary hover:px-10 duration-200">Log In</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>

  )
}
