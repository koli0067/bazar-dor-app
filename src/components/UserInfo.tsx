'use client'

import { useState } from 'react'
import { useSession,  signOut } from '@/lib/auth-client'

const UserInfo = () => {
  const { data: session } = useSession()
  const user = session?.user

  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    setIsOpen(false)
    await signOut()
  }


  return (
    <div>
      {user ? (
        <div className="relative inline-block text-left">
          
          {/* প্রোফাইল বাটন: এখানে ক্লিক করলেই বক্সটি দেখাবে/লুকাবে */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex gap-2 py-1.5 px-3 rounded-xl hover:bg-gray-100 transition-all select-none focus:outline-none"
          >
            <div className="avatar">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200">
                <img 
                  alt="User Avatar" 
                  src={user?.image || "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"} 
                />
              </div>
            </div>
            
            <h2 className="text-[20px] font-semibold text-gray-800 flex items-center gap-1">
              {user?.name}
            </h2>
          </button>

          {/*isOpen সত্য হলে কেবল তখনই এই বক্সটি রেন্ডার হবে */}
          {isOpen && (
            <>
              {/* স্ক্রিনের বাইরে ক্লিক করলে ড্রপডাউন বন্ধ করার অদৃশ্য লেয়ার */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsOpen(false)} 
              />

              {/* ড্রপডাউন বক্স */}
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-50">
                
                {/* ইউজার ইনফো */}
                <div className="border-b border-gray-100 pb-3 mb-3">
                  <h3 className="font-bold text-gray-900 text-lg">{user?.name}</h3>
                  <p className="text-sm text-gray-400 font-normal break-all">{user?.email}</p>
                </div>

                {/* অপশনসমূহ */}
                <ul className="space-y-2 text-base font-medium">
                  <li>
                    <a 
                      href="/profile" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 py-2 px-2 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      👤 আমার প্রোফাইল
                    </a>
                  </li>
                  <li>
                    <button 
                      onClick={handleSignOut} 
                      className="flex items-center gap-2.5 py-2 px-2 text-red-500 hover:bg-red-50 rounded-xl w-full text-left transition-colors"
                    >
                      ↩ সাইন আউট
                    </button>
                  </li>
                </ul>

              </div>
            </>
          )}

        </div>
      ) : (
        <div className="flex items-center gap-2 sm:gap-3">
          <button className="px-3 py-1.5 text-sm sm:text-base">সাইন ইন</button>
          <button className="bg-green-700 py-1.5 px-4 rounded text-white text-sm sm:text-base">সাইন আপ</button>
        </div>
      )}
    </div>
  )
}

export default UserInfo