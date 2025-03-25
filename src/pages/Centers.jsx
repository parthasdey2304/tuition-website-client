import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'

function Centers() {
  const [centers, setCenters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCenter, setSelectedCenter] = useState(null)
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 }) // Default to Delhi, India
  
  // Replace with your Google Maps API key
  const googleMapsApiKey = "YOUR_GOOGLE_MAPS_API_KEY" 
  
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
    setMapCenter(center.location);
  };
  
  const handleMarkerClick = (center) => {
    setSelectedCenter(center);
  };
  
  const mapContainerStyle = {
    width: '100%',
    height: '500px'
  };
  
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Our Learning Centers</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Find a TuitionHub center near you for in-person learning
        </p>
      </div>
      
      {/* Map Section */}
      <div className="mb-12 rounded-xl overflow-hidden shadow-md">
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={11}
            options={{
              styles: [
                { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
              ]
            }}
          >
            {centers.map(center => (
              <Marker
                key={center.id}
                position={center.location}
                onClick={() => handleMarkerClick(center)}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }}
              />
            ))}
            
            {selectedCenter && (
              <InfoWindow
                position={selectedCenter.location}
                onCloseClick={() => setSelectedCenter(null)}
              >
                <div className="p-2 max-w-xs">
                  <h3 className="font-medium text-gray-900">{selectedCenter.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{selectedCenter.address}</p>
                  <button className="text-sm text-blue-600 mt-2" onClick={() => handleCenterClick(selectedCenter)}>
                    View Details
                  </button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>
      
      {/* Centers Listing */}
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
              className={`card overflow-hidden flex flex-col md:flex-row gap-4 ${
                selectedCenter?.id === center.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleCenterClick(center)}
            >
              <div className="md:w-1/3">
                <img 
                  src={center.image} 
                  alt={center.name} 
                  className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                />
              </div>
              
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{center.name}</h3>
                
                <div className="mb-3">
                  <div className="flex items-start mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{center.address}</p>
                  </div>
                  
                  <div className="flex items-center mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{center.phone}</p>
                  </div>
                  
                  <div className="flex items-center mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{center.email}</p>
                  </div>
                  
                  <div className="flex items-start mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{center.openingHours}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subjects offered:</p>
                  <div className="flex flex-wrap gap-1">
                    {center.subjects.map((subject, index) => (
                      <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-auto flex justify-between">
                  <button className="btn bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 dark:bg-transparent dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700">
                    Get Directions
                  </button>
                  <button className="btn btn-primary">
                    Book a Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Contact Section */}
      <section className="mt-16 py-10 px-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Can't Find a Center Near You?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We're continuously expanding our network of learning centers across India. 
            Contact us to suggest a new location or inquire about our online learning options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary px-6 py-3">
              Contact Us
            </button>
            <button className="btn bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-blue-500 dark:text-blue-400 px-6 py-3">
              Explore Online Courses
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Centers
