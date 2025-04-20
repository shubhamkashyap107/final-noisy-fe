import React, { useState } from 'react'
import Navbar from './Navbar'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import axios from 'axios'
import { baseUrl } from '../utils/constants'
import { useNavigate } from 'react-router-dom'

const NewAuth = () => {
  const [isSignupPage, setIsSignupPage] = useState(false)
  const [emailId, setEmailId] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  return (
    <>
      <Navbar />

      {isSignupPage ? (
        <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-700">
          
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6 transition-all duration-300">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Welcome Back</h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
                <input 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text" 
                  placeholder="Enter your username" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>

              <div className="relative">
                <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                <input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-4 top-[46px] text-gray-500 cursor-pointer`}
                ></i>
              </div>
              <p className="text-sm text-gray-600 mt-4 text-right">
              Not a user?{" "}
              <span
                className="text-blue-600 font-medium cursor-pointer hover:underline"
                onClick={() => setIsSignupPage(true)}
              >
                Sign Up
              </span>{" "}
              now
              </p>

              <button
              onClick={() => {
                const login = async() => {
                  const res = await axios.post(baseUrl + "/auth/login", {username, password}, {withCredentials : true})
                  // console.log(res)
                  if(res.status == 200)
                  {
                    dispatch(addUser(res.data.data))
                    navigate("/home")
                  }
                }
                login()
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition"
            >
              Log In
            </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NewAuth



// import React, { useEffect, useRef, useState } from 'react'
// import Navbar from './Navbar'
// import axios from 'axios'
// import { baseUrl } from '../utils/constants'
// import toast from 'react-hot-toast'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { addUser } from '../utils/userSlice'


// const otpInputCount = 6

// const NewAuth = () => {
//   const [disableInput, setDisableInput] = useState(false)
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [email, setEmail] = useState("shubhamkashyap@acciojob.com")
//   const [otpInputArr, setOtpInputArr] = useState(new Array(otpInputCount).fill(""))
//   const otpInputsRef = useRef([])
//   const [showLastForm, setShowLastForm] = useState(false)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const backspaceHandler = (key, index) => {
//     if (key === "ArrowRight") {
//       otpInputsRef.current[index + 1]?.focus()
//     } else if (key === "ArrowLeft") {
//       otpInputsRef.current[index - 1]?.focus()
//     } else if (key === "Backspace" && !otpInputArr[index]) {
//       otpInputsRef.current[index - 1]?.focus()
//     }
//   }

//   const otpChangeHandler = (value, index) => {
//     if (isNaN(value)) return
//     const temp = [...otpInputArr]
//     const newVal = value.trim()
//     temp[index] = newVal.slice(-1)
//     setOtpInputArr(temp)
//     newVal && otpInputsRef.current[index + 1]?.focus()
//   }

//   useEffect(() => {
//     otpInputsRef.current.length && otpInputsRef.current[0].focus()
//   }, [disableInput])

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />

//       <div className="flex-grow flex justify-center items-center px-4 py-12 sm:py-0">
//         <div className="w-full sm:max-w-md bg-white sm:shadow-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300">
//           <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-gray-800">
//             {showLastForm ? "Enter your Details" : "Verify Your Email"}
//           </h2>

//           <div className="mb-6">
//             <input
//               disabled={disableInput}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="text"
//               placeholder="Email"
//               className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${disableInput ? "bg-gray-200" : "bg-white"}`}
//             />
//           </div>

//           {!showLastForm && disableInput && (
//             <>
//               <h3 className="text-md sm:text-lg font-medium text-center mb-2 text-gray-700">
//                 Enter OTP
//               </h3>
//               <div className="flex justify-between gap-2 my-4">
//                 {otpInputArr.map((item, index) => (
//                   <input
//                     onKeyDown={(e) => backspaceHandler(e.key, index)}
//                     ref={(input) => {
//                       otpInputsRef.current[index] = input
//                     }}
//                     value={item}
//                     onChange={(e) => otpChangeHandler(e.target.value, index)}
//                     key={index}
//                     className="border border-gray-300 rounded-lg h-12 w-10 sm:h-14 sm:w-14 text-xl text-center bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//                   />
//                 ))}
//               </div>
//               <p className="text-center text-sm text-red-500 font-medium mb-4">
//                 OTP is only valid for 5 minutes
//               </p>
//             </>
//           )}

//           {
//             showLastForm && (
//               <>
//               <div className="mb-4">
//                 <input
//                      value={username}
//                      onChange={(e) => {
//                        setUsername(e.target.value)
//                      }}
//                   type="text"
//                   placeholder="Username"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
//                 />
//               </div>
//               <div className="mb-6">
//                 <input
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value)
//                 }}
//                   type="password"
//                   placeholder="Password"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
//                 />
//               </div>
//               <button
//                 onClick={() => {
//                   async function signUpUser()
//                   {
//                     const res = await axios.post(baseUrl + "/auth/signup", {emailId : email, username, password}, {withCredentials : true})
//                     console.log(res)
//                     if(res.status == 200)
//                     {
//                      dispatch(addUser(res.data.data))
//                      navigate("/profile/edit")
//                     }
//                   }
//                   signUpUser()
//                 }}
//                 className="cursor-pointer w-full bg-green-600 text-white py-3 rounded-lg text-base sm:text-lg font-medium hover:bg-green-700 transition"
//               >
//                 Sign Up
//               </button>
//             </>

//             )
//           }

//           {!disableInput && <button
//             onClick={() => {
              
//                 setDisableInput(true)
//                 const getOTP = async () => {
//                   try {
//                     const resPromise = axios.get(`${baseUrl}/auth/verify-mail/${email}`);
//                     toast.promise(resPromise, {
//                       loading: 'Sending OTP...',
//                       success: () => `OTP Sent to ${email}`,
//                       error: 'Failed to send OTP',
//                     });
//                     await resPromise;
//                   } catch (err) {
//                     console.error(err);
//                   }
//                 };
//                 getOTP()
//             }}
//             className="cursor-pointer w-full bg-blue-600 text-white py-3 rounded-lg text-base sm:text-lg font-medium hover:bg-blue-700 transition"
//           >
//             Send OTP
//           </button>}

//           {
//             !showLastForm && disableInput && <button
//             onClick={async () => {
//                 try {
//                     const verifyMail = async () => {
//                         const res = await axios.get(baseUrl + "/auth/verify-otp/" + otpInputArr.join(""));
//                         if (res.status === 200) {
//                             setShowLastForm(true); // Show next form if OTP is correct
//                         }
//                     };
            
//                     await verifyMail(); // Await the function call
            
//                 } catch (error) {
//                     toast.error("Please Enter a valid OTP"); // Show error if something fails
//                 }
//             }}
            
//             className="cursor-pointer w-full bg-blue-600 text-white py-3 rounded-lg text-base sm:text-lg font-medium hover:bg-blue-700 transition"
//           >
//             Verify Email
//           </button>
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

// export default NewAuth
