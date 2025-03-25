import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

function Centers() {
  const { darkMode } = useTheme()
  const [centers, setCenters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCenter, setSelectedCenter] = useState(null)
  
  // Mock data, would normally be fetched from backend
  useEffect(() => {
    // Simulating a fetch request
    setTimeout(() => {
      const mockCenters = [
        {
          id: 1,
          name: "TuitionHub - Delhi Central",
          address: "123 Connaught Place, New Delhi, Delhi 110001",
          phone: "+91 98765 43210",
          email: "delhi.central@tuitionhub.com",
          openingHours: "Monday - Saturday: 9:00 AM - 8:00 PM",
          subjects: ["Mathematics", "Physics", "Chemistry", "Biology"],
          facilities: ["Air Conditioned Classrooms", "Library", "Computer Lab", "Study Area"],
          location: { lat: 28.6292, lng: 77.2183 },
          image: "https://images.unsplash.com/photo-1543622748-5ee7237e8565?q=80&w=500"
        },
        {
          id: 2,
          name: "TuitionHub - Noida Campus",
          address: "A-45, Sector 62, Noida, Uttar Pradesh 201301",
          phone: "+91 98765 43211",
          email: "noida@tuitionhub.com",
          openingHours: "Monday - Saturday: 8:00 AM - 9:00 PM",
          subjects: ["JEE Preparation", "NEET Preparation", "Computer Science"],
          facilities: ["Digital Classrooms", "Science Lab", "Cafeteria", "Free Wi-Fi"],
          location: { lat: 28.6139, lng: 77.3580 },
          image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=500"
        },
        {
          id: 3,
          name: "TuitionHub - Gurugram Branch",
          address: "Tower C, DLF Cyber City, Gurugram, Haryana 122002",
          phone: "+91 98765 43212",
          email: "gurugram@tuitionhub.com",
          openingHours: "Monday - Sunday: 9:00 AM - 7:00 PM",
          subjects: ["CBSE Classes 6-10", "ICSE Classes 6-10", "Olympiad Training"],
          facilities: ["Smart Boards", "Activity Room", "Parent Lounge", "Indoor Sports"],
          location: { lat: 28.4595, lng: 77.0266 },
          image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=500"
        },
        {
          id: 4,
          name: "TuitionHub - South Delhi",
          address: "M-12, Greater Kailash Part I, New Delhi, Delhi 110048",
          phone: "+91 98765 43213",
          email: "southdelhi@tuitionhub.com",
          openingHours: "Monday - Saturday: 8:30 AM - 7:30 PM",
          subjects: ["English Language", "IELTS Preparation", "Personality Development"],
          facilities: ["Language Lab", "Reference Library", "Counseling Center"],
          location: { lat: 28.5380, lng: 77.2310 },
          image: "https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=500"
        },
        {
          id: 5,
          name: "TuitionHub - Faridabad Center",
          address: "SCO-19, Sector 15, Faridabad, Haryana 121007",
          phone: "+91 98765 43214",
          email: "faridabad@tuitionhub.com",
          openingHours: "Monday - Friday: 9:00 AM - 8:00 PM, Saturday: 9:00 AM - 6:00 PM",
          subjects: ["Mathematics", "Science", "Social Studies", "Hindi"],
          facilities: ["Audiovisual Room", "Play Area", "Art Corner"],
          location: { lat: 28.4089, lng: 77.3178 },
          image: "https://images.unsplash.com/photo-1594312915251-48db9280c8f1?q=80&w=500"
        }
      ];
      
      setCenters(mockCenters);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleCenterClick = (center) => {
    setSelectedCenter(center);
  };

  return (
    <div className="font-['Poppins']">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Our Learning Centers</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Find a TuitionHub center near you for in-person learning
        </p>
      </div>
      
      {/* Embedded Google Maps with Glassmorphism */}
      <div className="mb-12 backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/30 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Find Us on the Map</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Visit our main center in Kolkata at Lions Calcutta (Greater) Vidya Mandir
          </p>
        </div>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d461.0524700954741!2d88.40794657147073!3d22.413221425928363!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a026df95de474cb%3A0xe4899eaabe023dee!2sLions%20Calcutta%20(Greater)%20Vidya%20Mandir!5e0!3m2!1sen!2sin!4v1742918168574!5m2!1sen!2sin" 
          width="100%" 
          height="500" 
          style={{border:0}} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        ></iframe>
      </div>
      
      {/* Centers Listing with Glassmorphism */}
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Our Centers Across India</h2>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">
          <p>Error loading centers. Please try again later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {centers.map(center => (
            <div 
              key={center.id} 
              className={`backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/30 shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                selectedCenter?.id === center.id ? 'ring-2 ring-blue-500' : ''
              } ${darkMode ? 'text-white' : 'text-gray-900'}`}
              onClick={() => handleCenterClick(center)}
            >
              <div className="md:w-1/3 relative overflow-hidden">
                <img 
                  src={center.image} 
                  alt={center.name} 
                  className="w-full h-48 md:h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r"></div>
              </div>
              
              <div className="md:w-2/3 p-6">
                <h3 className="text-xl font-semibold mb-2">{center.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{center.address}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{center.phone}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{center.email}</p>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{center.openingHours}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium mb-1">Subjects offered:</p>
                  <div className="flex flex-wrap gap-1">
                    {center.subjects.map((subject, index) => (
                      <span key={index} className="bg-blue-100/70 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded backdrop-blur-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto flex justify-between gap-2">
                  <button className="px-4 py-2 rounded-full backdrop-blur-sm bg-white/20 border border-blue-500/50 text-blue-600 dark:text-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-all duration-300 flex items-center gap-1 shadow-sm hover:shadow transform hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Get Directions
                  </button>
                  <button className="px-4 py-2 rounded-full backdrop-blur-sm bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-1 border border-blue-400/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book a Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Contact Section with Glassmorphism */}
      <section className="mt-16 py-10 px-6 backdrop-blur-md bg-gray-50/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/30 rounded-xl shadow-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Can't Find a Center Near You?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We're continuously expanding our network of learning centers across India. 
            Contact us to suggest a new location or inquire about our online learning options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 rounded-full backdrop-blur-sm bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2 border border-blue-400/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </button>
            <button className="px-6 py-3 rounded-full backdrop-blur-sm bg-white/20 border border-blue-500/50 text-blue-600 dark:text-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow transform hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Explore Online Courses
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Centers
