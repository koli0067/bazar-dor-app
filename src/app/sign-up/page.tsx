import SignUpForm from "./SignUpForm"

const SignUpPage = () => {
  return (
    <div>
      <div className="text-center pt-10">
        <h2 className="text-2xl font-semibold py-2">অ্যাকাউন্ট তৈরি করুন</h2>
        <p className="text-gray-500">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </div>

      <div className="mt-10 bg-[#f2f5f0] flex items-center justify-center">
       
        <SignUpForm />
      </div>
    </div>
  )
}

export default SignUpPage