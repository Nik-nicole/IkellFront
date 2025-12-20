export default function Hero() {
  return (
    <section id="hero" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-15 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 border-b border-gray-200">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="absolute left-12 top-0 w-px bg-gray-200 h-170.5 hidden md:block"></div>
        <div className="absolute left-301.5 top-0 w-px bg-gray-200 h-170.5 hidden md:block"></div> 
        
        <div className="ml-[10px] sm:ml-[20px] md:ml-[40px] order-2 md:order-1">
          <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center rounded-full border border-gray-300 pr-1 py-1">
              <span className="ml-1 p-1 sm:p-2 inline-flex items-center rounded-full bg-gray-800 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white">
                Want service? Contact us
              </span>
              <a href="#contact" className="p-1 sm:p-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-500">
                Contact →
              </a>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-medium leading-tight text-gray-900 mb-4 sm:mb-6 md:mb-8">
            One platform <br /> workflow<span className="text-blue-600"> simplified</span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-lg">
            A single platform to connect teams, streamline workflows, and deliver results across multiple projects and companies.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
            <button className="rounded-full bg-black text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-medium hover:bg-gray-800 transition-colors">
              Start now
            </button>
            <button className="rounded-full border border-gray-300 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-medium hover:bg-gray-50 transition-colors">
              Book a Demo
            </button>
          </div>
        </div>
        
        <div className="relative -mt-8 sm:-mt-12 md:-mt-16 order-1 md:order-2">
          <img 
            src="/HeroB.png" 
            alt="" 
            className="w-full h-auto transition-transform duration-300"
          />
        </div>
      </div>
      <div className="absolute left-0 right-0 top-154 border-t border-gray-200 hidden md:block"></div>
    </section>
  )
}
