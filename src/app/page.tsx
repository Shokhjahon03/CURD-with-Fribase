'use client'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button, Modal, Textarea } from "flowbite-react";
import { deleteUser } from "firebase/auth";
import { signOut } from "firebase/auth";
export default function Home() {
  const firebaseConfig = {
    apiKey: "AIzaSyB-WhwGhsGmxwsRT3AoCV4Fai24yKCLJ_s",
    authDomain: "newcrud-27d18.firebaseapp.com",
    projectId: "newcrud-27d18",
    storageBucket: "newcrud-27d18.firebasestorage.app",
    messagingSenderId: "96041695226",
    appId: "1:96041695226:web:5c648a6bfbcef68d169643",
    measurementId: "G-RD7GEZ6BXP"
  };
  const app = initializeApp(firebaseConfig);

  // Auth xizmatini olish
  const auth = getAuth(app);
  const [id, setId] = useState<number | string>('')
  let [err, setErr] = useState({ open: false, title: '' })
  let [val, setVal] = useState<any>({ email: '', password: '' })
  let [postss, sepostss] = useState<any>([])
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const router = useRouter();
  const [postVal, setPostVal] = useState<{ title: string, body: string }>({ title: '', body: '' })
  const [editPostVal, setEditPostVal] = useState<{ id: number, title: string, body: string }>({ id: 0, title: '', body: '' })



  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setVal({ email: user.email, password: user.password })
        console.log("Hozirgi foydalanuvchi:", user);
        // router.push('/login')
      } else {
        router.push('/auth')
      }
    });
  }, [])

  // Tizimga kirgan foydalanuvchi ma'lumotini olish
  const user = auth.currentUser;





  const logoutUser = async () => {
    if (user) {
      // Foydalanuvchi hisobini o'chirish
      deleteUser(user)
        .then(() => {
          alert("Foydalanuvchi hisob muvaffaqiyatli o'chirildi.");
        })
        .catch((error) => {
          console.log("Hisobni o'chirishda xato yuz berdi:", error);
        });
    } else {
      console.log("Foydalanuvchi tizimga kirmagan.");
    }
  };

  // // Misol uchun:
  // logoutUser();

  const registerUser = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Foydalanuvchi yaratildi:", userCredential.user);
    } catch (error: any) {
      console.error("Xatolik:", error.message);
    }
  };

  // Misol uchun:
  // registerUser("danotgan@example.com", "password1");

  // useEffect(() => {
  //   if (val.email && val.password) {
  //     console.log(val)
  //   } else {
  //     console.log('salom');

  //     // router.push('/auth')
  //   }
  // }, [])
  let getPost = async () => {
    try {
      let res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      let data = await res.data
      sepostss(data)
    } catch (error) {
      alert(error)
    }
  }
  useEffect(() => {
    getPost()
  }, [])

  const handlecreate = async () => {
    if (
      postVal.title && postVal.body
    ) {
      try {
        let res = await axios.post('https://jsonplaceholder.typicode.com/posts', postVal)
        let data = await res.data
        sepostss([...postss, data])
        setOpenModal(false)
        setPostVal({ title: '', body: '' })
        setErr({ ...err, open: false })
      } catch (error) {
        alert(error)
      }
    } else {
      setErr({ open: true, title: 'Xatolik!' })
    }
  }

  const hendaldelete = async (id: number) => {
    try {
      let res = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      let data = await res.data
      sepostss(postss.filter((e: any) => e.id !== id))
    } catch (error) {
      alert(error)
    }
  }

  const getEditVal = async (id: number) => {
    try {
      let res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      let data = await res.data
      setEditPostVal(data)
      setId(data.id)
      setOpenEditModal(true)
    } catch (error) {
      alert(error)
    }
  }


  const hendaledit = async (id: number | string) => {
    try {
      let res = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, editPostVal)
      let data = await res.data
      sepostss(postss.map((e: any) => e.id === id ? data : e))
      setOpenEditModal(false)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <main className="flex w-dvw flex-col items-center p-10">
      <div className="max-w-[1200px] flex flex-col gap-5 items-center h-auto w-full">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-[20px] font-bold">Posts:</h1>
          <div className=" flex gap-4">
            <Button onClick={() => setOpenModal(true)}>Yaratish</Button>
            <Button onClick={() => logoutUser()}>Tizimdan chiqish</Button>
          </div>
        </div>
        <div className="w-full flex justify-center flex-wrap gap-5">
          {
            postss ?
              postss.map((e: any, i: number) => (

                <div key={i} className="notification">
                  <div className="notiglow"></div>
                  <div className="notiborderglow"></div>
                  <div className="notititle">{e.title}</div>
                  <div className="notibody">{e.body}</div>
                  <div className="notibody flex gap-5">
                    <Button onClick={() => hendaldelete(e.id)}>
                      o'chirish
                    </Button>
                    <Button
                      onClick={() => getEditVal(e.id)}>
                      taxrir qilish
                    </Button>
                  </div>
                </div>

              ))
              :
              <>
                <div className="text-center">Loading...</div>
              </>
          }
          <Modal className=" border-white" dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header className=" text-white  border-white">Add</Modal.Header>
            <Modal.Body className="bg-black  border-white">
              <div className="space-y-6 flex flex-col w-full items-center">
                <input
                  className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                  name="text"
                  placeholder="Post title"
                  type="text"
                  value={postVal.title}
                  onChange={(e) => setPostVal({ ...postVal, title: e.target.value })}
                />
                <Textarea value={postVal.body} onChange={(e) => setPostVal({ ...postVal, body: e.target.value })} id="comment" className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]" placeholder="Post body..." required rows={4} />
              </div>
            </Modal.Body>
            <Modal.Footer className="bg-black">
              <Button onClick={() => handlecreate()}>I accept</Button>
              <Button color="gray" onClick={() => {
                setOpenModal(false)
                setErr({ ...err, open: false })
              }}>
                Decline
              </Button>
              {err.open ? <p className=" text-red-600">{err.title}</p> : null}
            </Modal.Footer>
          </Modal>
          <Modal className=" border-white" dismissible show={openEditModal} onClose={() => setOpenEditModal(false)}>
            <Modal.Header className=" text-white  border-white">Edit</Modal.Header>
            <Modal.Body className="bg-black  border-white">
              <div className="space-y-6 flex flex-col w-full items-center">
                <input
                  className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
                  name="text"
                  placeholder="Post title"
                  type="text"
                  value={editPostVal.title}
                  onChange={(e) => setEditPostVal({ ...editPostVal, title: e.target.value })}
                />
                <Textarea
                  value={editPostVal.body}
                  onChange={(e) => setEditPostVal({ ...editPostVal, body: e.target.value })} id="comment" className="bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]" placeholder="Post body..." required rows={4} />
              </div>
            </Modal.Body>
            <Modal.Footer className="bg-black">
              <Button onClick={() => hendaledit(id)}>I accept</Button>
              <Button color="gray" onClick={() => setOpenEditModal(false)}>
                Decline
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </main>
  );
}
