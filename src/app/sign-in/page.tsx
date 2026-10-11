import SignInFrom from "./SignInFrom"


const SignUpPage = () => {

  return (
    <div>
       <div className="text-center pt-10">
            <h2 className="text-2xl font-semibold py-2">সাইন ইন</h2>
            <p className="text-gray-500">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
       </div>

       <div className=" mt-10 bg-[#f2f5f0] flex items-center justify-center">
            <SignInFrom></SignInFrom>
       </div>
       
    </div>
  )
}

export default SignUpPage