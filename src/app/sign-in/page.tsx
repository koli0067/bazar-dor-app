
const SignUpPage = () => {
  return (
    <div>
       <div className="text-center pt-10">
            <h2 className="text-2xl font-semibold py-2">সাইন ইন</h2>
            <p className="text-gray-500">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
       </div>

       <div className=" mt-10 bg-[#f2f5f0] flex items-center justify-center">
      <form className="w-full max-w-[480px]">
        <fieldset className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 md:p-10 flex flex-col space-y-5">

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
    </div>
       
    </div>
  )
}

export default SignUpPage