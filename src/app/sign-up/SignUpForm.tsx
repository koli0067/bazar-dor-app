'use client'

import React from "react"
import { signUp } from "@/lib/auth-client"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"

const SignUpForm = () => {

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData.entries()) as Record<string, string>

    // পাসওয়ার্ড ম্যাচ করছে কিনা তা চেক করা
    if (user.password !== user.confirmPassword) {
      toast.error('পাসওয়ার্ড দুটি মেলেনি!')
      return
    }

    const { data, error } = await signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      callbackURL: '/'
    })

    if (data) {
      console.log(data)
      toast.success('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!')
      redirect('/')
    }

    if (error) {
      console.log(error)
      toast.error('কিছু একটা ঝামেলা হয়েছে!')
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-[480px]">
      <fieldset className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 md:p-10 flex flex-col space-y-5">

        {/* নাম */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            নাম
          </label>
          <input
            name="name"
            type="text"
            placeholder="আপনার পুরো নাম লিখুন"
            className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-gray-800 placeholder:text-gray-400"
            required
          />
        </div>

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

        {/* পাসওয়ার্ড নিশ্চিত করুন */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            name="confirmPassword"
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
          অ্যাকাউন্ট তৈরি করুন
        </button>

      </fieldset>
    </form>
  )
}

export default SignUpForm