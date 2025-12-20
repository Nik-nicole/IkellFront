const Steps = () => {
  return (
    <section id="steps" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-15 py-8 sm:py-12 md:py-16 border-b border-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-white opacity-80"></div>
          <div className="absolute inset-0 bg-linear-to-r from-white via-transparent to-white opacity-60"></div>
          <img 
            src="https://i.pinimg.com/1200x/22/79/c4/2279c4869623936b4bb6f68e8a1439e0.jpg" 
            alt="" 
            className="w-full h-full object-cover opacity-30 blur-xs"
          />
        </div>
      </div>
     
      
      <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="ml-[10px] sm:ml-[20px] md:ml-[40px]">
          <div className="mb-4 sm:mb-6">
            <div className="inline-flex items-center rounded-full border border-gray-300 pr-1 py-1 bg-white/80 backdrop-blur-sm">
              <span className="ml-3 mr-2 p-1">
                Want service? Contact us
              </span>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight text-gray-900 mb-4 sm:mb-6 md:mb-8">
            Everything about <br /> your projects, at a glance
          </h1>

          <p className="text-sm sm:text-m md:text-sm text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-lg">
            Get full visibility into each project — who's involved, what they're working on, and how progress evolves in real time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
            
          </div>
        </div>
        
        <div className="flex justify-center md:justify-end">
          <img
            src="CardImage.png"
            alt=""
            className="w-150 h-80 object-cover mr-30 border border-gray-300 rounded-3xl"
          />
        </div>
      </div>
      
    
    </section>
    );
};

export default Steps;
