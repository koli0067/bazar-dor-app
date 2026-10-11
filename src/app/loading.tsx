import React from 'react'

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 font-sans">
      <div className="flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-emerald-600"></span>
      </div>
      <p className="text-sm font-medium text-gray-500 animate-pulse">
        বাজারের তথ্য লোড হচ্ছে...
      </p>
    </div>
  )
}