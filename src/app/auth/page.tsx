'use client'
import { emit } from 'process'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../app/firebase";
import { useRouter } from 'next/navigation';

const index = () => {

    const routers = useRouter()
    let [values, setVal] = useState({ email: '', password: '' })

    let authoreth = () => {
        console.log(values);

        if (
            values.email.trim().length > 0 &&
            values.password.trim().length > 0
        ) {
            const registerUser = async (email: string, password: string) => {
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    console.log("Foydalanuvchi yaratildi:", userCredential.user);
                    if (userCredential.user.email) {
                        routers.push('/')
                    }
                } catch (error: any) {
                    console.error("Xatolik:", error.message);
                }
            };
            registerUser(values.email, values.password);
            routers.push('/')
        }
        // else ni qayta qilaman ozrodan keyin 
    }

    return (
        <div className='w-dvw h-dvh flex justify-center items-center'>
            <div className='flex flex-col gap-5'>
                <h1>
                    Siz Ro'yxatdan o'tmagansiz !
                </h1>
                <input
                    className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                    name="text"
                    placeholder="Enter email"
                    type="text"
                    value={values.email}
                    onChange={(e) => setVal({ ...values, email: e.target.value })}
                />
                <input
                    className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                    name="text"
                    placeholder="Enter password"
                    type="text"
                    value={values.password}
                    onChange={(e) => setVal({ ...values, password: e.target.value })}
                />
                <button onClick={() => authoreth()} className="btn">Ro'yxatdan o'tish</button>
            </div>
        </div>
    )
}

export default index
