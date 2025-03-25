import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

function Teachers() {
  const { darkMode } = useTheme()
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  
  // Mock data, would normally be fetched from backend
  useEffect(() => {
    // Simulating a fetch request
    setTimeout(() => {
      const mockTeachers = [
        {
          id: 1,
          name: "Dr. Rajesh Kumar",
          photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=300",
          qualification: "PhD in Mathematics, IIT Delhi",
          experience: "15+ years",
          specialization: ["JEE Mathematics", "Calculus", "Algebra"],
          bio: "Dr. Rajesh Kumar is a distinguished educator with a passion for making complex mathematical concepts accessible to students. With over 15 years of teaching experience, he has helped thousands of students achieve success in competitive exams.",
          rating: 4.8,
          reviews: 240,
          available: "Online & Offline",
          subjects: ["Mathematics"],
          classes: ["11th", "12th", "JEE"]
        },
        {
          id: 2,
          name: "Prof. Sunita Sharma",
          photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300",
          qualification: "MSc in Physics, Delhi University",
          experience: "12+ years",
          specialization: ["NEET Physics", "Mechanics", "Electromagnetism"],
          bio: "Professor Sunita Sharma is known for her innovative teaching methods and deep understanding of physics. She simplifies complex topics and focuses on conceptual clarity with practical applications.",
          rating: 4.9,
          reviews: 189,
          available: "Online Only",
          subjects: ["Physics"],
          classes: ["11th", "12th", "NEET"]
        },
        {
          id: 3,
          name: "Dr. Amit Verma",
          photo: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=300",
          qualification: "PhD in Chemistry, BHU",
          experience: "10+ years",
          specialization: ["Organic Chemistry", "CBSE Chemistry", "Competitive Exams"],
          bio: "Dr. Amit Verma brings chemistry to life with his engaging teaching style. He emphasizes laboratory techniques and practical understanding alongside theoretical knowledge.",
          rating: 4.7,
          reviews: 156,
          available: "Offline Only",
          subjects: ["Chemistry"],
          classes: ["9th", "10th", "11th", "12th"]
        },
        {
          id: 4,
          name: "Ms. Priya Desai",
          photo: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=300",
          qualification: "MA in English Literature, Oxford University",
          experience: "8+ years",
          specialization: ["English Grammar", "Literature", "Communication Skills"],
          bio: "Ms. Priya Desai is passionate about developing strong language skills in students. Her teaching emphasizes practical usage, vocabulary building, and effective communication.",
          rating: 4.6,
          reviews: 122,
          available: "Online Only",
          subjects: ["English"],
          classes: ["All Classes"]
        },
        {
          id: 5,
          name: "Dr. Neha Singh",
          photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300",
          qualification: "PhD in Biology, AIIMS",
          experience: "11+ years",
          specialization: ["Human Physiology", "Botany", "NEET Biology"],
          bio: "Dr. Neha Singh is dedicated to helping students master biology through visual learning, case studies, and practical examples. Her approach focuses on connecting concepts to real-world applications.",
          rating: 4.8,
          reviews: 178,
          available: "Online & Offline",
          subjects: ["Biology"],
          classes: ["11th", "12th", "NEET"]
        },
        {
          id: 6,
          name: "Mr. Rakesh Patel",
          photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300",
          qualification: "MTech in Computer Science, IIT Bombay",
          experience: "9+ years",
          specialization: ["Programming", "Data Structures", "Algorithms"],
          bio: "Mr. Rakesh Patel combines his industry experience and teaching skills to prepare students for both academic excellence and real-world applications in computer science.",
          rating: 4.9,
          reviews: 145,
          available: "Online & Offline",
          subjects: ["Computer Science"],
          classes: ["11th", "12th", "Degree Level"]
        },
        {
          id: 7,
          name: "Mrs. Anjali Gupta",
          photo: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=300",
          qualification: "MSc in Mathematics, IIT Kanpur",
          experience: "14+ years",
          specialization: ["Algebra", "Geometry", "Olympiad Training"],
          bio: "Mrs. Anjali Gupta has a gift for making mathematics enjoyable and accessible to students of all abilities. Her patient approach and clear explanations help students build confidence in their mathematical abilities.",
          rating: 4.7,
          reviews: 203,
          available: "Offline Only",
          subjects: ["Mathematics"],
          classes: ["8th", "9th", "10th"]
        },
        {
          id: 8,
          name: "Mr. Vikram Desai",
          photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300",
          qualification: "MSc in Science Education, Delhi University",
          experience: "7+ years",
          specialization: ["General Science", "Environmental Studies"],
          bio: "Mr. Vikram Desai specializes in making science fun and engaging for younger students, using demonstrations, activities, and real-world connections to foster a love for scientific inquiry.",
          rating: 4.8,
          reviews: 167,
          available: "Online & Offline",
          subjects: ["Science"],
          classes: ["6th", "7th", "8th"]
        }
      ];
      
      setTeachers(mockTeachers);
      setLoading(false);
    }, 1000);
  }, []);
  
  const filterTeachers = (filter) => {
    setActiveFilter(filter);
  };
  
  const filteredTeachers = teachers.filter(teacher => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'online') return teacher.available.includes('Online');
    if (activeFilter === 'offline') return teacher.available.includes('Offline');
    return teacher.subjects.includes(activeFilter);
  });
  
  return (
    <div className="font-['Poppins']">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Our Expert Teachers</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Learn from the best educators in their fields
        </p>
      </div>
      
      {/* Filters */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 min-w-max pb-2">
          <button 
            onClick={() => filterTeachers('all')} 
            className={`px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm ${
              activeFilter === 'all' 
                ? 'bg-blue-600/90 text-white shadow-lg' 
                : 'bg-gray-200/70 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 hover:bg-gray-300/70 dark:hover:bg-gray-600/70'
            }`}
          >
            All Teachers
          </button>
          <button 
            onClick={() => filterTeachers('online')} 
            className={`px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm ${
              activeFilter === 'online' 
                ? 'bg-blue-600/90 text-white shadow-lg' 
                : 'bg-gray-200/70 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 hover:bg-gray-300/70 dark:hover:bg-gray-600/70'
            }`}
          >
            Online Available
          </button>
          <button 
            onClick={() => filterTeachers('offline')} 
            className={`px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm ${
              activeFilter === 'offline' 
                ? 'bg-blue-600/90 text-white shadow-lg' 
                : 'bg-gray-200/70 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 hover:bg-gray-300/70 dark:hover:bg-gray-600/70'
            }`}
          >
            Offline Available
          </button>
          <button 
            onClick={() => filterTeachers('Mathematics')} 
            className={`px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm ${
              activeFilter === 'Mathematics' 
                ? 'bg-blue-600/90 text-white shadow-lg' 
                : 'bg-gray-200/70 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 hover:bg-gray-300/70 dark:hover:bg-gray-600/70'
            }`}
          >
            Mathematics
          </button>
          <button 
            onClick={() => filterTeachers('Physics')} 
            className={`px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm ${
              activeFilter === 'Physics' 
                ? 'bg-blue-600/90 text-white shadow-lg' 
                : 'bg-gray-200/70 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 hover:bg-gray-300/70 dark:hover:bg-gray-600/70'
            }`}
          >
            Physics
          </button>
          <button 
            onClick={() => filterTeachers('Chemistry')} 
            className={`px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm ${
              activeFilter === 'Chemistry' 
                ? 'bg-blue-600/90 text-white shadow-lg' 
                : 'bg-gray-200/70 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 hover:bg-gray-300/70 dark:hover:bg-gray-600/70'
            }`}
          >
            Chemistry
          </button>
          <button 
            onClick={() => filterTeachers('Biology')} 
            className={`px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm ${
              activeFilter === 'Biology' 
                ? 'bg-blue-600/90 text-white shadow-lg' 
                : 'bg-gray-200/70 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 hover:bg-gray-300/70 dark:hover:bg-gray-600/70'
            }`}
          >
            Biology
          </button>
        </div>
      </div>
      
      {/* Teachers Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">
          <p>Error loading teachers. Please try again later.</p>
        </div>
      ) : filteredTeachers.length === 0 ? (
        <div className="text-center py-10 text-gray-600 dark:text-gray-300">
          <p>No teachers found with the selected filter. Please try a different category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeachers.map(teacher => (
            <div 
              key={teacher.id} 
              className={`backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/30 shadow-xl rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
                  <div className="relative">
                    <img 
                      src={teacher.photo} 
                      alt={teacher.name} 
                      className="w-24 h-24 object-cover rounded-full border-4 border-white/50 dark:border-gray-700/50 shadow-lg"
                    />
                    <div className={`absolute -bottom-2 -right-2 text-xs text-center font-bold px-2 py-1 rounded-full shadow-md ${
                      teacher.available.includes('Online') && teacher.available.includes('Offline')
                        ? 'bg-purple-500/80 backdrop-blur-sm text-white'
                        : teacher.available.includes('Online')
                          ? 'bg-green-500/80 backdrop-blur-sm text-white'
                          : 'bg-blue-500/80 backdrop-blur-sm text-white'
                    }`}>
                      {teacher.available}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold">{teacher.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{teacher.qualification}</p>
                    
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-400 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill={i < Math.floor(teacher.rating) ? "currentColor" : "none"} stroke="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-sm">{teacher.rating}</span>
                      </span>
                      <span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>({teacher.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{teacher.bio}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {teacher.specialization.map((spec, index) => (
                      <span key={index} className="bg-blue-100/70 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded backdrop-blur-sm">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-4 mt-auto space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Experience:</span>
                    <span className="font-medium">{teacher.experience}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Classes:</span>
                    <span className="font-medium">{teacher.classes.join(", ")}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Subjects:</span>
                    <span className="font-medium">{teacher.subjects.join(", ")}</span>
                  </div>
                  
                  <button className="w-full bg-blue-600/90 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-300 font-medium shadow-md hover:shadow-lg">
                    Schedule a Session
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Join Our Team Section */}
      <section className="mt-16 py-10 px-6 backdrop-blur-md bg-gray-50/80 dark:bg-gray-800/80 border border-white/20 dark:border-gray-700/30 rounded-xl shadow-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Join Our Teaching Team</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Are you passionate about teaching and helping students achieve their academic goals? 
            We're always looking for talented educators to join our team.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 font-medium shadow-md hover:shadow-lg">
            Apply as a Teacher
          </button>
        </div>
      </section>
    </div>
  )
}

export default Teachers
