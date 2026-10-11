'use client'

import { useState } from 'react'
import { useSession, signOut, updateUser } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

const ProfilePage = () => {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const user = session?.user

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSignOut = async () => {
    await signOut()
  }

  
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage('')

    const formData = new FormData(e.currentTarget)
    const updatedData = Object.fromEntries(formData.entries()) as { name: string }

    if (!updatedData.name || !updatedData.name.trim()) {
      setMessage('দয়া করে একটি নাম লিখুন।')
      return
    }

    setLoading(true)

    try {
      const { error } = await updateUser({
        name: updatedData.name,
      })

      if (error) {
        setMessage('আপডেট করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।')
      } else {
        setMessage('নাম সফলভাবে আপডেট হয়েছে!')
        
     
        router.refresh()
        window.location.reload()
      }
    } catch (err) {
      console.error('Update Error:', err)
      setMessage('কিছু একটা ভুল হয়েছে।')
    } finally {
      setLoading(false)
    }
  }

  if (isPending) {
    return <div className="p-8 text-center text-gray-500 font-sans">লোড হচ্ছে...</div>
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 font-sans">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h2>
        <p className="text-gray-500 text-sm mt-1">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-amber-700 flex-shrink-0 flex items-center justify-center font-bold text-2xl text-white">
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{user?.name || 'ব্যবহারকারী'}</h3>
            <p className="text-gray-500 text-sm">{user?.email || ''}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-500 hover:bg-red-50 rounded-xl text-sm font-medium transition-all"
        >
          <span>←</span> সাইন আউট
        </button>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-800">তথ্য পরিবর্তন করুন</h3>

        {message && (
          <p className={`text-sm ${message.includes('সফল') ? 'text-emerald-600' : 'text-red-500'}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">নাম</label>
            <input
              type="text"
              name="name" 
              defaultValue={user?.name || ''}
              placeholder="আপনার নাম লিখুন"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-medium rounded-xl transition-all shadow-sm"
          >
            {loading ? 'আপডেট হচ্ছে...' : 'আপডেট'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProfilePage