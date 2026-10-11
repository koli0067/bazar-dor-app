'use client'

import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "@/lib/auth-client"
import toast from "react-hot-toast"
import Link from "next/link";

const SignInFrom = () => {
  
    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault()
  
      const formData = new FormData(e.currentTarget)
      const user = Object.fromEntries(formData.entries()) as {
        email: string
        password: string
        
      }


        const { data, error } = await signIn.email({      
            email: user.email,
            password: user.password,
            callbackURL: '/'
          })
      
          if (data) {
           
            toast.success('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!')
            
          }
      
          if (error) {
           
            toast.error('কিছু একটা ঝামেলা হয়েছে!')
          }
        }

        const handleGoogleSignIn = async() => {
            await signIn.social({
                provider: "google",
            });
        }

        const handleGithubSignIn = async() => {
           await signIn.social({
            provider: "github"
        })
        }


  return (
    <div>
    <div  className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 md:p-10 flex flex-col space-y-5">
      <form onSubmit={onSubmit} className="w-full max-w-[480px]">
        <fieldset>

          {/* ইমেইল */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              ইমেইল
            </label>
            <input
              name="email"
              type="email"
              placeholder="name@example.com"
              className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-gray-800 placeholder:text-gray-400"
              required
            />
          </div>

          {/* পাসওয়ার্ড */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-gray-800 placeholder:text-gray-400"
              required
            />
          </div>

          {/* সাবমিট বাটন */}
          <button
            type="submit"
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 mt-2 text-base active:scale-[0.98]"
          >
            সাইন ইন
          </button>

        </fieldset>
      </form>

      <div className="relative flex py-2 items-center justify-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-sm text-gray-500 font-medium">অথবা</span>
          <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="flex gap-4 justify-center">
        {/* Google বাটন */}
        <button 
          onClick={handleGoogleSignIn} 
          className="btn flex items-center gap-2 border rounded-[10px] border-gray-300 px-4 py-2 hover:bg-gray-50 transition-all text-sm font-medium"
        >
          <FaGoogle className="text-red-500 text-base" />
          <span>Google দিয়ে চালিয়ে যান</span>
        </button>

        {/* GitHub বাটন */}
        <button 
          onClick={handleGithubSignIn} 
          className="btn flex items-center gap-2 border rounded-[10px] border-gray-300 px-4 py-2 hover:bg-gray-50 transition-all text-sm font-medium"
        >
          <FaGithub className="text-gray-900 text-lg" />
          <span>GitHub দিয়ে চালিয়ে যান</span>
        </button>
      </div>
    

      <p className="text-center">অ্যাকাউন্ট আছে?
         <Link href={'/sign-up'} className="text-green-500 hover:underline">সাইন আপ করুন</Link>
      </p>
    </div>
     
      <div className="mt-5 text-center text-gray-500 hover:text-gray-800">
        <Link href={'/'}>← হোম পেজে ফিরে যান</Link>
      </div>
    </div>
  )
}

export default SignInFrom