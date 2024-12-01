'use client'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { useRouter } from 'next/navigation'

const index = () => {
  let router = useRouter()
  let [password, setPassword] = useState('')
  let [getpass, setpass] = useState('')


  // useEffect(() => {
  //   onAuthStateChanged(auth, (user: any) => {
  //     if (user) {
  //       setpass(user.password)
  //     } else {
  //       console.log('salom');

  //     }
  //   });
  // }, [])

  let enterPasswords = async () => {
    await onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setpass(user.email)
        console.log(user.email);
      } else {
        console.log('salom');

      }
    });
    if (password.trim().length > 0 && getpass && password === getpass) {
      // perform password validation and login logic here
      router.push('/')
    } else {
      alert('Password should not be empty')
    }
  }

  return (
    <div className='w-dvw h-dvh flex justify-center items-center'>
      <div className='flex flex-col gap-5 items-center'>
        <h1>Siz Tizimdan Ro'yxatdan o'tgansiz</h1>
        <input
          className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
          name="text"
          placeholder="Enter Ypur Email"
          type="email"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => enterPasswords()} className="btn">Tizizmga Kirish</button>
      </div>
    </div>
  )
}

export default index
