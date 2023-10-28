"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import {motion, useAnimation} from "framer-motion"

export default function Login() {

  const [formState, setFormState] = useState({
    email: '',
    password: ''
  })

  const formAnimation = useAnimation()
  const bgAnimation = useAnimation()
  const imageAnimation = useAnimation()

  useEffect(() => {
    console.log(localStorage.getItem('user'))
    if (localStorage.getItem('user') !== null || localStorage.getItem('user') !== undefined) {
      localStorage.removeItem('user')
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

    formAnimation.start({
      scale: 0,
      opacity: 0,
      transition: {duration: 0}
    })

    const scaleY = window.innerHeight / 400
    const scaleX = window.innerWidth / 500
    const scale = Math.max(scaleX, scaleY)

    bgAnimation.start({
      scale: scale,
      transition: {x: {duration: 1}, y: {duration: 2}}
    })

    imageAnimation.start({
      scale: 2,
      y:100,
      transition: {duration: 1}
    })

    setTimeout(() => {

      window.location.href = '/orders'

    }, 3000)

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
        <div className="relative flex flex-col w-5/6 sm:2/3 lg:w-1/2 max-w-[500px] h-[400px] items-center justify-center text-white py-16 rounded-3xl">
        <motion.div animate={bgAnimation} layout className="absolute w-full h-full bg-primary rounded-3xl" />
          <div className="mx-auto w-full">
            <motion.div animate={imageAnimation} className="absolute w-full flex justify-center">
              <Image src="/logo.png" alt="logo" width={200} height={200} />
            </motion.div>
            <motion.div animate={formAnimation}>
              <form className="pt-8 px-5 md:px-10" onSubmit={handleSubmit}>
                <div className="divide-y divide-gray-200">
                  <div className="pt-8 text-base leading-6 space-y-8 text-gray-700 sm:text-base sm:leading-7">
                    <div className="relative flex justify-center">
                      <input autoComplete="off" id="email" name="email" type="text" value={formState.email} onChange={handleChange} className="peer placeholder-transparent w-4/5 h-10 border-b-2 border-gray-300 text-gray-900 transition-all focus:outline-none focus:w-full focus:border-2 focus:border-secondary rounded-3xl p-6" placeholder="Email address" />
                      <label htmlFor="email" className="absolute pl-7 left-8 -top-5 text-secondary text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-3.5 transition-all peer-focus:-top-5 peer-focus:left-0 peer-focus:text-secondary peer-focus:text-sm">Email Address</label>
                    </div>
                    <div className="relative flex justify-center">
                      <input autoComplete="off" id="password" name="password" type="password" value={formState.password} onChange={handleChange} className="peer placeholder-transparent w-4/5 h-10 border-b-2 border-gray-300 text-gray-900 transition-all focus:outline-none focus:w-full focus:border-2 focus:border-secondary rounded-3xl p-6" placeholder="Password" />
                      <label htmlFor="password" className="absolute pl-7 left-8 -top-5 text-secondary text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-3.5 transition-all peer-focus:-top-5 peer-focus:left-0 peer-focus:text-secondary peer-focus:text-sm">Password</label>
                    </div>
                    <div className="flex relative justify-center pt-5">
                      <button type="submit" className="bg-primary text-white text-lg border-secondary border-2 rounded-3xl px-4 py-1 hover:transition-all ease-in-out hover:bg-secondary hover:px-10 duration-200">Log In</button>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
      </div>
      </div>
    </div>

  )
}
