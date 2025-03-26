import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="font-['Poppins'] snap-y snap-mandatory">
      {/* Hero Section */}
        <section className="relative min-h-screen h-screen flex items-center snap-start snap-always">
          <div className="absolute inset-0 -z-10">
            <img 
          src="https://plus.unsplash.com/premium_photo-1661700257600-fe8f669604e7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Students studying" 
          className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/90 to-white dark:from-gray-900/90 dark:to-gray-900"></div>
          </div>
          
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 -mt-10">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[45px] md:leading-[50px] mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Empowering Students with Quality Education
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          Discover online and offline courses designed to help you excel in your academic journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/courses" className="btn btn-primary text-lg px-8 py-3 duration-300 hover:duration-300 hover:bg-purple-600 dark:hover:bg-purple-700 rounded-full">
            Explore Courses
          </Link>
          <Link to="/centers" className="btn bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-blue-500 dark:text-blue-400 text-lg px-8 py-3 rounded-full">
            Find Nearby Centers
          </Link>
            </div>
            <div className="absolute bottom-8 left-0 right-0 flex justify-center ">
          <div className="flex flex-col items-center text-gray-600 dark:text-gray-300 animate-bounce">
            <p className="mb-2 text-sm font-medium">Scroll to discover more</p>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
            </div>
          </div>
        </section>
          
        {/* Features Section */}
        <section className="py-12 min-h-screen h-screen flex items-center snap-start snap-always">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Choose Vastavik Tuitions?</h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">We provide comprehensive learning solutions</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Expert Educators</h3>
            <p className="text-gray-600 dark:text-gray-300">Learn from highly qualified and experienced teachers who are experts in their fields.</p>
          </div>
          
          <div className="card text-center">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Flexible Learning</h3>
            <p className="text-gray-600 dark:text-gray-300">Choose between online and offline courses based on your preferences and schedule.</p>
          </div>
          
          <div className="card text-center">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Interactive Learning</h3>
            <p className="text-gray-600 dark:text-gray-300">Engage with interactive lessons and materials designed to enhance understanding and retention.</p>
          </div>
            </div>
          </div>
        </section>
      
      {/* Testimonials Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800 rounded-xl min-h-screen h-screen flex items-center snap-start snap-always">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What Our Students Say</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Success stories from our community</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-xl">R</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Rahul Singh</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">JEE Advanced, 2023</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "The mathematics courses here helped me tackle the toughest problems in JEE. I'm now studying at IIT Bombay!"
              </p>
              <div className="flex mt-3 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            {/* ... existing testimonial cards ... */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-xl">P</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Priya Patel</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">NEET, 2023</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "The biology and chemistry courses were incredibly detailed. The teachers were always available to clear my doubts."
              </p>
              <div className="flex mt-3 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold text-xl">A</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Ananya Sharma</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Class 10 CBSE, 2023</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "I improved my grades significantly after joining the weekend classes. The study materials are excellent!"
              </p>
              <div className="flex mt-3 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill={i < 4 ? "currentColor" : "none"} stroke="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="min-h-screen h-screen flex items-center snap-start snap-always">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 w-full">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of students who have transformed their academic performance with our courses.
          </p>
          <Link to="/register" className="btn btn-primary text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform transition-transform hover:scale-105">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
