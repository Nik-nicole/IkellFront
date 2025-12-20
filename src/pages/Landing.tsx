import Navbar from "../components/layout/Navbar"
import Hero from "../components/sections/Hero"
import Steps from "../components/sections/Steps"
import QuickSetup from "../components/sections/QuickSetup"

import CTA from "../components/sections/CTA"
import Footer from "../components/layout/Footer"

export default function Landing() {
  return (
    <div className="bg-[#f8fafb] min-h-screen relative">
      <div className="absolute left-0 top-0 h-full w-px bg-gray-200"></div>
      <div className="absolute right-0 top-0 h-full w-px bg-gray-200"></div>
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Steps />
        <QuickSetup />
       
        <CTA />
        <Footer />
      </div>
    </div>
  )
}
