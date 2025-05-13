import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import axios from 'axios'
import { baseUrl } from '../utils/constants'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import validator from "validator"

const NewAuth = () => {
  const [isSignupPage, setIsSignupPage] = useState(false)
  const [disableInput, setDisableInput] = useState(false)
  const [showLastForm, setShowLastForm] = useState(false)
  const [emailId, setEmailId] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const otpInputCount = 6
  const [otpInputArr, setOtpInputArr] = useState(new Array(otpInputCount).fill(""))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const otpInputsRef = useRef([])


    const otpChangeHandler = (value, index) => {
    if (isNaN(value)) return
    const temp = [...otpInputArr]
    const newVal = value.trim()
    temp[index] = newVal.slice(-1)
    setOtpInputArr(temp)
    newVal && otpInputsRef.current[index + 1]?.focus()
  }

  useEffect(() => {
    otpInputsRef.current.length && otpInputsRef.current[0].focus()
  }, [disableInput])


  const backspaceHandler = (key, index) => {
        if (key === "ArrowRight") {
          otpInputsRef.current[index + 1]?.focus()
        } else if (key === "ArrowLeft") {
          otpInputsRef.current[index - 1]?.focus()
        } else if (key === "Backspace" && !otpInputArr[index]) {
          otpInputsRef.current[index - 1]?.focus()
        }
      }
  

      return (
        <>
          <Navbar />
      
          {isSignupPage ? (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
              <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6 transition-all duration-300">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h2>
      
                <div className="space-y-4">
                  {/* Email Input */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                    <input
                      disabled={disableInput}
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                      type="email"
                      placeholder="Enter your email"
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                        disableInput ? "bg-gray-200" : "bg-white"
                      }`}
                    />
                  </div>
      
                  {/* OTP Inputs */}
                  {!showLastForm && disableInput && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-center">Enter OTP</h3>
                      <div className="flex justify-between gap-2">
                        {otpInputArr.map((item, index) => (
                          <input
                            key={index}
                            value={item}
                            ref={(input) => (otpInputsRef.current[index] = input)}
                            onKeyDown={(e) => backspaceHandler(e.key, index)}
                            onChange={(e) => otpChangeHandler(e.target.value, index)}
                            className="border border-gray-300 rounded-lg h-12 w-10 sm:h-14 sm:w-14 text-xl text-center bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        ))}
                      </div>
                      <div className='flex justify-between'>

                      <p className=" text-sm text-red-500 font-medium">
                        OTP valid for 5 minutes
                      </p>

                      <p className="text-sm text-gray-600 ">
                        Already a user?{" "}
                        <span
                        onClick={() => {
                          setIsSignupPage(false)
                        }}
                         className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer font-medium">
                          Log In
                        </span>{" "}
                        instead
                      </p>
                      
                      
                      </div>
                    </div>
                  )}
      
                  {/* Send OTP Button */}
                  {!disableInput && (
                    <>
                      <p className="text-sm text-gray-600 text-right">
                        Already a user?{" "}
                        <span
                        onClick={() => {
                          setIsSignupPage(false)
                        }}
                         className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer font-medium">
                          Log In
                        </span>{" "}
                        instead
                      </p>
      
                      <button
                        onClick={() => {
                          if(!validator.isEmail(emailId))
                          {
                            toast.error("Please enter a valid email")
                            return
                          }
                          
                          const getOTP = async () => {
                            try {
                              const resPromise = axios.get(`${baseUrl}/auth/verify-mail/${emailId}`);
                              toast.promise(resPromise, {

                                loading: 'Sending OTP...',
                                success: () => {
                                  `OTP Sent to ${emailId}`
                                      setDisableInput(true);
                                    },
                                error: "User already exists",
                              });
                              await resPromise;
                            } catch (err) {
                              // console.error(err);
                            }
                          };
                          getOTP();
                        }}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition"
                      >
                        Send OTP
                      </button>
                    </>
                  )}
      
                  {/* Verify OTP Button */}
                  {!showLastForm && disableInput && (
                    <button
                      onClick={async () => {
                        try {
                          const verifyMail = async () => {
                            const res = await axios.get(`${baseUrl}/auth/verify-otp/${otpInputArr.join('')}`);
                            if (res.status === 200) {
                              setShowLastForm(true);
                            }
                          };
                          await verifyMail();
                        } catch (error) {
                          toast.error("Please Enter a valid OTP");
                        }
                      }}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg text-base font-medium hover:bg-blue-700 transition"
                    >
                      Verify Email
                    </button>
                  )}
      
                  {/* Final Signup Form */}
                  {showLastForm && (
                    <>
                      {/* Username Input */}
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
                        <input
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          type="text"
                          placeholder="Enter your username"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
                        />
                      </div>
      
                      {/* Password Input with Eye Icon */}
                      <div className="relative">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        />
                        <i
                          onClick={() => setShowPassword(!showPassword)}
                          className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-4 top-[46px]  text-gray-500 cursor-pointer`}
                        ></i>
                      </div>


                      <p className="text-sm text-gray-600 text-right">
                        Already a user?{" "}
                        <span
                        onClick={() => {
                          setIsSignupPage(false)
                        }}
                         className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer font-medium">
                          Log In
                        </span>{" "}
                        instead
                      </p>
      
                      {/* Signup Button */}
                      <button
                      onClick={async () => {
                        try {
                          const res = await axios.post(
                            `${baseUrl}/auth/signup`,
                            { emailId, username, password },
                            { withCredentials: true }
                          );
                          console.log(res);
                          if (res.status === 200) {
                            dispatch(addUser(res.data.data));
                            navigate("/profile/edit");
                          }
                        } catch (error) {
                          toast.error("User already exists, please try a different username");
                        }
                      }}
                      className="w-full bg-green-600 text-white py-3 rounded-lg text-base font-medium hover:bg-green-700 transition"
                    >
                      Sign Up
                    </button>

                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
              <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6 transition-all duration-300">
                <h2 className="text-2xl font-semibold text-center text-gray-800">Welcome Back</h2>
      
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      placeholder="Enter your username"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>
      
                  <div className="relative">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
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
                      const login = async () => {
                        try {
                        const res = await axios.post(baseUrl + "/auth/login", { username, password }, { withCredentials: true });
                        if (res.status === 200) {
                          dispatch(addUser(res.data.data));
                          navigate("/home");
                        }
                        } catch (error) {
                          toast.error(error.response.data.error)
                        }
    
                
                      };
                      login();
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
      );
      
}

export default NewAuth

