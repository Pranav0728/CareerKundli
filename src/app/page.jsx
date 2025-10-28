'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Page() {
  const { data: session } = useSession()

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-indigo-800 dark:text-indigo-400 mb-6">
            Discover Your Career Destiny
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Upload your resume and let our AI analyze your career path, predict your future opportunities, and create your personalized career horoscope.
          </p>
          <Link 
            href="/analyze" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Analyze My Resume
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">How CareerKundli Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📄</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Upload Resume</h3>
            <p className="text-gray-600 dark:text-gray-300">Simply upload your resume in PDF format and our AI will extract all the relevant information.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">AI Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">Our advanced AI analyzes your skills, experience, and achievements to understand your career trajectory.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🔮</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Career Horoscope</h3>
            <p className="text-gray-600 dark:text-gray-300">Receive a personalized career prediction and horoscope that guides your next professional steps.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to see your career future?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have discovered new opportunities with CareerKundli.
          </p>
          {session ? (
            <Link 
              href="/analyze" 
              className="bg-white text-indigo-600 hover:bg-indigo-50 font-medium py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Analyze My Resume
            </Link>
          ) : (
            <div className="space-x-4">
              <Link 
                href="/analyze" 
                className="bg-white text-indigo-600 hover:bg-indigo-50 font-medium py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Try Now
              </Link>
              <Link 
                href="/signin" 
                className="bg-indigo-800 hover:bg-indigo-900 text-white font-medium py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}