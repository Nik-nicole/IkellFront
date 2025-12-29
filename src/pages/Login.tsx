import React, { useState } from 'react';
import Input from '../components/ui/Input';

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

function PasswordInput({ label, error, className = '', ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full px-4 py-3 pr-12 bg-white/80 backdrop-blur-sm border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 text-sm sm:text-base ${className}`}
          type={showPassword ? 'text' : 'password'}
          {...props}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafb] relative overflow-hidden">
      
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white/5 backdrop-blur-md border border-gray-200/20 rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <img 
              src="/logo pagina.png" 
              alt="Company Logo" 
              className="w-20 h-20 mx-auto mb-4 rounded-lg"
            />
            <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-600 mt-2">Sign in if you already have an account</p>
          </div>
          
          <form className="space-y-6">
            <Input
              type="email"
              id="email"
              name="email"
              label="Email"
              placeholder="your@email.com"
              required
            />
            
            <PasswordInput
              id="password"
              name="password"
              label="Password"
              placeholder="••••••••"
              required
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-gray-900 hover:text-gray-700">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gray-900 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors rounded-lg"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-gray-900 hover:text-gray-700">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}