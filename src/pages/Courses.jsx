import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

function Courses() {
  const { darkMode } = useTheme()
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  
  // Mock data, would normally be fetched from backend
  useEffect(() => {
    // Simulating a fetch request
    setTimeout(() => {
      const mockCourses = [
        {
          id: 1,
          title: "Mathematics for JEE Mains & Advanced",
          description: "A comprehensive course covering all mathematics topics for JEE preparation with practice problems and mock tests.",
          instructor: "Dr. Rajesh Kumar",
          rating: 4.8,
          reviews: 240,
          price: 12999,
          duration: "6 months",
          level: "Advanced",
          type: "online",
          category: "jee",
          image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
          popular: true
        },
        {
          id: 2,
          title: "Complete Physics for NEET",
          description: "Master the concepts of physics for NEET with detailed explanations, practice questions, and regular assessments.",
          instructor: "Prof. Sunita Sharma",
          rating: 4.9,
          reviews: 189,
          price: 11499,
          duration: "5 months",
          level: "Intermediate",
          type: "online",
          category: "neet",
          image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
          popular: true
        },
        {
          id: 3,
          title: "Chemistry for Class 12 CBSE",
          description: "A structured approach to learning all chemistry concepts for Class 12 CBSE board exam preparation.",
          instructor: "Dr. Amit Verma",
          rating: 4.7,
          reviews: 156,
          price: 8999,
          duration: "4 months",
          level: "Intermediate",
          type: "offline",
          category: "cbse",
          image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6",
          popular: false
        },
        {
          id: 4,
          title: "English Grammar and Composition",
          description: "Improve your English language skills with this comprehensive course covering grammar, vocabulary, and writing.",
          instructor: "Ms. Priya Desai",
          rating: 4.6,
          reviews: 122,
          price: 6999,
          duration: "3 months",
          level: "Beginner",
          type: "online",
          category: "language",
          image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d",
          popular: false
        },
        {
          id: 5,
          title: "Biology for Class 11 CBSE",
          description: "A detailed course covering all biology topics for Class 11 CBSE with visual aids and practical sessions.",
          instructor: "Dr. Neha Singh",
          rating: 4.8,
          reviews: 178,
          price: 9499,
          duration: "4 months",
          level: "Intermediate",
          type: "offline",
          category: "cbse",
          image: "https://images.unsplash.com/photo-1530210124550-912dc1381cb8",
          popular: true
        },
        {
          id: 6,
          title: "Mathematics for Class 10 CBSE",
          description: "Build a strong foundation in mathematics for Class 10 CBSE board exams with practice and problem-solving techniques.",
          instructor: "Mr. Rakesh Patel",
          rating: 4.7,
          reviews: 203,
          price: 7999,
          duration: "4 months",
          level: "Beginner",
          type: "offline",
          category: "cbse",
          image: "https://images.unsplash.com/photo-1596496181871-9681eacf9764",
          popular: true
        },
        {
          id: 7,
          title: "Computer Science for Class 12",
          description: "Learn programming concepts, data structures, and algorithms for Class 12 computer science.",
          instructor: "Ms. Anjali Gupta",
          rating: 4.9,
          reviews: 145,
          price: 9999,
          duration: "5 months",
          level: "Intermediate",
          type: "online",
          category: "cbse",
          image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
          popular: false
        },
        {
          id: 8,
          title: "Science for Class 8",
          description: "A fun and interactive course covering physics, chemistry, and biology concepts for Class 8 students.",
          instructor: "Mr. Vikram Desai",
          rating: 4.8,
          reviews: 167,
          price: 5999,
          duration: "3 months",
          level: "Beginner",
          type: "offline",
          category: "middle-school",
          image: "https://images.unsplash.com/photo-1567306226440-2fe5a95b4e98",
          popular: false
        }
      ];
      
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Filter courses based on type and search term
  useEffect(() => {
    if (courses.length > 0) {
      let result = courses;
      
      // Apply type filter
      if (filter !== 'all') {
        result = result.filter(course => course.type === filter);
      }
      
      // Apply search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(course => 
          course.title.toLowerCase().includes(term) || 
          course.description.toLowerCase().includes(term) ||
          course.instructor.toLowerCase().includes(term) ||
          course.category.toLowerCase().includes(term)
        );
      }
      
      setFilteredCourses(result);
    }
  }, [filter, searchTerm, courses]);
  
  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Course Card Component
  const CourseCard = ({ course }) => (
    <div className="card overflow-hidden flex flex-col h-full">
      <div className="relative h-48 mb-4">
        <img 
          src={course.image || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6'} 
          alt={course.title} 
          className="w-full h-full object-cover rounded-t-lg"
        />
        {course.popular && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">
            Popular
          </div>
        )}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-900 to-transparent h-12"></div>
        <div className="absolute bottom-3 left-3">
          <span className={`${
            course.type === 'online' 
              ? 'bg-green-600 dark:bg-green-500' 
              : 'bg-blue-600 dark:bg-blue-500'
          } text-white text-xs px-2 py-1 rounded-full`}>
            {course.type === 'online' ? 'Online' : 'Offline'}
          </span>
          <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded-full ml-2">
            {course.category}
          </span>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{course.title}</h3>
      
      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 flex-grow">{course.description}</p>
      
      <div className="flex items-center mb-2">
        <span className="text-yellow-500 flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill={i < Math.floor(course.rating) ? "currentColor" : "none"} stroke="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-1 text-sm">{course.rating}</span>
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({course.reviews} reviews)</span>
      </div>
      
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {course.duration}
      </div>
      
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        {course.instructor}
      </div>
      
      <div className="flex items-center justify-between mt-auto">
        <span className="font-bold text-gray-900 dark:text-white">₹{course.price.toLocaleString()}</span>
        <button className="btn btn-primary">Enroll Now</button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Explore Our Courses</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Find the perfect course to enhance your learning journey
        </p>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search courses..."
            className="input pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        <div className="flex space-x-2 w-full md:w-auto">
          <button 
            onClick={() => setFilter('all')} 
            className={`px-4 py-2 rounded-md ${
              filter === 'all' 
                ? 'bg-blue-600 text-white dark:bg-blue-500' 
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('online')} 
            className={`px-4 py-2 rounded-md ${
              filter === 'online' 
                ? 'bg-blue-600 text-white dark:bg-blue-500' 
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Online
          </button>
          <button 
            onClick={() => setFilter('offline')} 
            className={`px-4 py-2 rounded-md ${
              filter === 'offline' 
                ? 'bg-blue-600 text-white dark:bg-blue-500' 
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Offline
          </button>
        </div>
      </div>
      
      {/* Course Listings */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-600">
          <p>Error loading courses. Please try again later.</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-10 text-gray-600 dark:text-gray-300">
          <p>No courses found matching your criteria. Try a different search or filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
      
      {/* FAQ Section */}
      <section className="mt-16 py-10 px-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">How do I enroll in a course?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              You can enroll in a course by clicking the "Enroll Now" button on the course card. You'll need to be logged in to complete the enrollment process.
            </p>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">What's the difference between online and offline courses?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Online courses are delivered through our digital platform and can be accessed from anywhere. Offline courses are conducted at our physical centers and require in-person attendance.
            </p>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Can I get a refund if I'm not satisfied with a course?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, we offer a 7-day satisfaction guarantee. If you're not satisfied with the course within the first week, you can request a full refund.
            </p>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Do you provide study materials with the courses?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes, all our courses come with comprehensive study materials, practice questions, and assessments to enhance your learning experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Courses
