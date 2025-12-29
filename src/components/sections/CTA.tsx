import React from 'react';
import Input from '../ui/Input';

const CTA = () => {
  return (
    <section id="contact" className="bg-gray py-20 sm:py-24 md:py-32 relative overflow-hidden">
      {/* Background text "Contact Us" */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <p className="text-[12rem] mb-164 font-extrabold bg-linear-to-b from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent opacity-60 leading-none select-none">Contact Us</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Form */}
          <div className="bg-transparent backdrop-blur-md border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg">
            <div className="relative z-10">
              <form className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    label="Name"
                    placeholder="Your name"
                    required
                  />
                  
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="Your email"
                    required
                  />
                </div>
                
                <Input
                  type="text"
                  id="company"
                  name="company"
                  label="Company"
                  placeholder="Your company name"
                  required
                />
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                    placeholder="Tell us about your needs..."
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg font-medium hover:bg-gray-800 transition-colors rounded-lg"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Right side - Reach out section */}
          <div className="text-gray-900">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Reach out
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              We're here to help and answer any questions you might have. We look forward to hearing from you.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 shrink-0"></div>
                <span className="text-gray-600">Personalized assistance</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 shrink-0"></div>
                <span className="text-gray-600">Timely response</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-gray-900 rounded-full mt-2 mr-3 shrink-0"></div>
                <span className="text-gray-600">Comprehensive support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
