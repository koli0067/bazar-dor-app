
import Image from "next/image"
import Navlink from "./Navlink"

const Header = () => {

  const date = new Date().toLocaleDateString('bn-BD', {
    dateStyle: 'full',
  })

  return (
   <header className="bg-white">
      <div className="max-w-7xl mx-auto container py-5 px-4 ">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          
          <div className="flex justify-center items-center gap-3 sm:text-left">
            <div className="bg-green-700 p-3 text-white rounded-2xl shrink-0">
              <Image 
                src="/logo-icon.png" 
                height={30} 
                width={30} 
                alt="logo" 
                className="rounded-lg shrink-0" 
                priority
              />
            </div>
              <div>
                  <h2 className="text-xl sm:text-2xl font-bold pb-1">বাজার দর</h2>
                  <p className="text-sm sm:text-base font-normal">{date}</p>
              </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
              <button className="px-3 py-1.5 text-sm sm:text-base">সাইন ইন</button>
              <button className="bg-green-700 py-1.5 px-4 rounded text-white text-sm sm:text-base">সাইন আপ</button>
          </div>

      </div>

      <Navlink></Navlink>
      </div>
   </header>
  )
}

export default Header