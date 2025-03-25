import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Profile() {
  const { user } = useAuth()
  const [userProfile, setUserProfile] = useState(null)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Mock data, would normally fetch this from backend
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUserProfile({
        id: user?.id || 'user123',
        name: 'Ravi Kumar',
        email: user?.email || 'ravi.kumar@example.com',
        phone: '+91 98765 43210',
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=150',
        joinedDate: '15 Aug 2023',
        completedCourses: 2,
        inProgressCourses: 3,
        totalHoursLearned: 86,
        achievements: [
          { id: 1, title: 'Quick Starter', description: 'Completed first course within a week', icon: '🚀', date: '20 Aug 2023' },
          { id: 2, title: 'Math Whiz', description: 'Scored 95% in Mathematics assessment', icon: '🧮', date: '10 Sep 2023' }
        ]
      });
      
      setEnrolledCourses([
        {
          id: 1,
          title: 'Mathematics for JEE Mains & Advanced',
          instructor: 'Dr. Rajesh Kumar',
          progress: 75,
          lastAccessed: '2 days ago',
          image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=150'
        },
        {
          id: 2,
          title: 'Complete Physics for NEET',
          instructor: 'Prof. Sunita Sharma',
          progress: 40,
          lastAccessed: '1 week ago',
          image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=150'
        },
        {
          id: 3,
          title: 'English Grammar and Composition',
          instructor: 'Ms. Priya Desai',
          progress: 30,
          lastAccessed: '3 days ago',
          image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=150'
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, [user]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">My Profile</h1>
        <p className="text-gray-600 dark:text-gray-300">
          View and manage your personal information
        </p>
      </div>
      
      {/* User Profile Card */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-shrink-0">
            <img 
              src={userProfile.avatar} 
              alt={userProfile.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
            />
          </div>
          
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{userProfile.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{userProfile.email}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-gray-500 dark:text-gray-400">Joined</span>
                <span className="font-medium text-gray-900 dark:text-white">{userProfile.joinedDate}</span>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <span className="text-gray-500 dark:text-gray-400">Courses Completed</span>
                <span className="font-medium text-gray-900 dark:text-white">{userProfile.completedCourses}</span>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <span className="text-gray-500 dark:text-gray-400">In Progress</span>
                <span className="font-medium text-gray-900 dark:text-white">{userProfile.inProgressCourses}</span>
              </div>
              
              <div className="flex flex-col items-center md:items-start">
                <span className="text-gray-500 dark:text-gray-400">Hours Learning</span>
                <span className="font-medium text-gray-900 dark:text-white">{userProfile.totalHoursLearned}</span>
              </div>
            </div>
          </div>
          
          <div className="flex-shrink-0">
            <Link to="/settings" className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
      
      {/* Enrolled Courses */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">My Courses</h2>
        
        <div className="grid gap-6">
          {enrolledCourses.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">You haven't enrolled in any courses yet.</p>
              <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
            </div>
          ) : (
            enrolledCourses.map(course => (
              <div key={course.id} className="card overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/4 md:w-1/5">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-32 sm:h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
                    />
                  </div>
                  
                  <div className="p-4 sm:p-6 flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{course.title}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">Last accessed: {course.lastAccessed}</span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Instructor: {course.instructor}</p>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-300">Progress</span>
                        <span className="font-medium text-gray-900 dark:text-white">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
                      <button className="btn btn-primary">Continue Learning</button>
                      <button className="btn bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600">View Course Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Achievements */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">My Achievements</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userProfile.achievements.length === 0 ? (
            <div className="card p-8 text-center col-span-2">
              <p className="text-gray-600 dark:text-gray-300">
                Complete courses and assessments to earn achievements.
              </p>
            </div>
          ) : (
            userProfile.achievements.map(achievement => (
              <div key={achievement.id} className="card p-4 flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-full text-2xl">
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{achievement.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Earned on {achievement.date}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Recommended Courses */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Recommended For You</h2>
        
        <div className="card p-6">
          <div className="text-center mb-4">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Based on your interests and learning history, we think you'll enjoy these courses:
            </p>
          </div>
          
          <div className="grid gap-4">
            <div className="flex border-b border-gray-200 dark:border-gray-700 pb-4 items-center">
              <img 
                src="https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=100" 
                alt="Chemistry Course" 
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-medium text-gray-900 dark:text-white">Chemistry for Class 12 CBSE</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Dr. Amit Verma</p>
              </div>
              <button className="btn btn-primary text-sm">View</button>
            </div>
            
            <div className="flex border-b border-gray-200 dark:border-gray-700 pb-4 items-center">
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=100" 
                alt="Computer Science Course" 
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-medium text-gray-900 dark:text-white">Computer Science for Class 12</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Ms. Anjali Gupta</p>
              </div>
              <button className="btn btn-primary text-sm">View</button>
            </div>
            
            <div className="flex items-center pt-2">
              <img 
                src="https://images.unsplash.com/photo-1596496181871-9681eacf9764?q=80&w=100" 
                alt="Mathematics Course" 
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-medium text-gray-900 dark:text-white">Mathematics for Class 10 CBSE</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Mr. Rakesh Patel</p>
              </div>
              <button className="btn btn-primary text-sm">View</button>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Link to="/courses" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
              Browse all courses
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
