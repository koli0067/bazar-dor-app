import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <div>
        {/* Visual Icon / Emoji */}
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-3xl mx-auto">
          🔍
        </div>

        {/* Header Text */}
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-gray-900">পেজটি পাওয়া যায়নি</h2>
          <p className="text-xs text-gray-500 font-medium">
            আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা লিংকটি ভুল।
          </p>
        </div>

        {/* Back to Home Button */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-block w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  )
}