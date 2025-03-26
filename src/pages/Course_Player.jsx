import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function Course_Player() {
  const { courseId, videoId } = useParams();
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const videoPlayerRef = useRef(null);
  
  // State variables
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [comment, setComment] = useState('');
  const [doubt, setDoubt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // Mock data - Would be fetched from backend in production
  useEffect(() => {
    // Simulate API call to fetch course details
    setTimeout(() => {
      const mockCourse = {
        id: 1,
        title: 'Mathematics for JEE Mains & Advanced',
        instructor: 'Dr. Rajesh Kumar',
        totalVideos: 42,
        totalDuration: '36 hours',
        completedVideos: 15,
        rating: 4.8,
        enrollmentDate: '12 Jul 2023',
        lastWatched: 'Yesterday',
        progress: 35,
        description: `This comprehensive course is designed to help you master all the mathematical concepts required for JEE Mains and Advanced examinations. Dr. Rajesh Kumar, with his 15+ years of experience in training students for competitive exams, guides you through the entire syllabus with crystal clear explanations and numerous solved problems.

The course covers topics such as Algebra, Calculus, Coordinate Geometry, Trigonometry, Vectors, 3D Geometry, and more. Each concept is explained from the basics and gradually moves to advanced level problems that appear in JEE examinations.`,
        videos: [
          {
            id: 'v1',
            title: 'Introduction to Calculus',
            description: 'This lecture introduces the fundamental concepts of calculus, including limits, continuity, and the idea of derivatives.',
            duration: '48:22',
            thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
            videoUrl: 'https://www.youtube.com/embed/WsQQvHm4lSw',
            completed: true,
            likes: 243,
            dislikes: 5,
            lastWatchedAt: '32:15',
            materials: [
              { name: 'Calculus_Intro.pdf', size: '2.4 MB', url: '#' },
              { name: 'Limits_Practice_Problems.pdf', size: '1.8 MB', url: '#' }
            ],
            comments: [
              { 
                id: 'c1', 
                user: 'Amit Singh', 
                text: 'This explanation of limits really cleared my doubts. Thank you!', 
                time: '2 days ago',
                likes: 12 
              },
              { 
                id: 'c2', 
                user: 'Priya Sharma', 
                text: 'I was struggling with continuity, but now I understand it perfectly.', 
                time: '1 week ago',
                likes: 8 
              }
            ]
          },
          {
            id: 'v2',
            title: 'Differentiation Techniques',
            description: 'Learn various techniques for differentiation including the chain rule, product rule, and quotient rule with practical examples.',
            duration: '56:14',
            thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
            videoUrl: 'https://www.youtube.com/embed/xPos_zMj0IQ',
            completed: true,
            likes: 186,
            dislikes: 3,
            lastWatchedAt: '56:14',
            materials: [
              { name: 'Differentiation_Techniques.pdf', size: '3.2 MB', url: '#' },
              { name: 'Chain_Rule_Examples.pdf', size: '1.5 MB', url: '#' }
            ],
            comments: [
              { 
                id: 'c3', 
                user: 'Rahul Verma', 
                text: 'The chain rule explanation was brilliant!', 
                time: '3 days ago',
                likes: 15 
              }
            ]
          },
          {
            id: 'v3',
            title: 'Applications of Derivatives',
            description: 'Explore how derivatives are used in real-world applications including rate of change, optimization, and curve sketching.',
            duration: '01:12:36',
            thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
            videoUrl: 'https://www.youtube.com/embed/eUDxDtSLtiA',
            completed: false,
            likes: 172,
            dislikes: 2,
            lastWatchedAt: '24:10',
            materials: [
              { name: 'Applications_of_Derivatives.pdf', size: '4.1 MB', url: '#' },
              { name: 'Optimization_Problems.pdf', size: '2.7 MB', url: '#' }
            ],
            comments: [
              { 
                id: 'c4', 
                user: 'Neha Patel', 
                text: 'The optimization problems were very well explained. Can you recommend more practice problems?', 
                time: '1 day ago',
                likes: 7 
              }
            ]
          },
          {
            id: 'v4',
            title: 'Introduction to Integration',
            description: 'This lecture covers the basics of integration as the reverse of differentiation and introduces various integration techniques.',
            duration: '58:45',
            thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
            videoUrl: 'https://www.youtube.com/embed/oHfw-oHbGsU',
            completed: false,
            likes: 143,
            dislikes: 4,
            lastWatchedAt: '0:00',
            materials: [
              { name: 'Integration_Basics.pdf', size: '3.6 MB', url: '#' },
              { name: 'Integration_Formulas.pdf', size: '1.2 MB', url: '#' }
            ],
            comments: []
          },
          {
            id: 'v5',
            title: 'Definite Integrals',
            description: 'Learn about definite integrals, their properties, and applications in calculating areas and volumes.',
            duration: '01:04:28',
            thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
            videoUrl: 'https://www.youtube.com/embed/ob7TQjDJKMo',
            completed: false,
            likes: 128,
            dislikes: 3,
            lastWatchedAt: '0:00',
            materials: [
              { name: 'Definite_Integrals.pdf', size: '3.9 MB', url: '#' },
              { name: 'Area_Under_Curves.pdf', size: '2.5 MB', url: '#' }
            ],
            comments: []
          }
        ]
      };

      setCourse(mockCourse);

      // Set current video based on the URL parameter or default to first video
      const video = mockCourse.videos.find(v => v.id === videoId) || mockCourse.videos[0];
      setCurrentVideo(video);
      
      // Calculate course progress
      const completedCount = mockCourse.videos.filter(v => v.completed).length;
      const newProgress = Math.round((completedCount / mockCourse.videos.length) * 100);
      setProgress(newProgress);
      
      setLoading(false);
    }, 1000);
  }, [courseId, videoId]);

  // Mark video as completed when it ends
  const handleVideoEnded = () => {
    if (course && currentVideo) {
      // Update local state
      const updatedVideos = course.videos.map(v => 
        v.id === currentVideo.id ? { ...v, completed: true } : v
      );
      
      setCourse({ ...course, videos: updatedVideos });
      
      // Calculate new progress
      const completedCount = updatedVideos.filter(v => v.completed).length;
      const newProgress = Math.round((completedCount / updatedVideos.length) * 100);
      setProgress(newProgress);
      
      // In a real app, you'd send this to the backend
      toast.success("Video completed! Progress updated.");
    }
  };

  // Play next video in playlist
  const playNextVideo = () => {
    if (course && currentVideo) {
      const currentIndex = course.videos.findIndex(v => v.id === currentVideo.id);
      if (currentIndex < course.videos.length - 1) {
        const nextVideo = course.videos[currentIndex + 1];
        setCurrentVideo(nextVideo);
        navigate(`/course/${courseId}/video/${nextVideo.id}`);
      } else {
        toast("You've reached the end of the course!");
      }
    }
  };

  // Handle like/dislike actions
  const handleLike = () => {
    if (disliked) setDisliked(false);
    setLiked(!liked);
    
    // In a real app, you'd send this to the backend
    if (!liked) {
      toast.success("Added to liked videos");
    }
  };

  const handleDislike = () => {
    if (liked) setLiked(false);
    setDisliked(!disliked);
  };

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    if (!comment.trim()) return;
    
    // In a real app, you'd send this to the backend and get an updated list
    const newComment = {
      id: `c${Date.now()}`,
      user: user?.name || 'You',
      text: comment,
      time: 'Just now',
      likes: 0
    };
    
    const updatedVideo = {
      ...currentVideo,
      comments: [newComment, ...currentVideo.comments]
    };
    
    setCurrentVideo(updatedVideo);
    setComment('');
    toast.success("Comment added successfully!");
  };

  // Handle AI doubt solver
  const handleDoubtSubmit = async (e) => {
    e.preventDefault();
    
    if (!doubt.trim()) return;
    
    setAiLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      // In a real app, this would be an API call to an AI service
      const mockResponses = [
        "Based on the video content, to solve this problem you need to apply the chain rule for differentiation. First, identify the outer function and the inner function, then calculate their individual derivatives. Finally, multiply them together.",
        "This concept relates to finding the critical points of a function. You should set the derivative equal to zero and solve for the variable. Then check the second derivative to determine if it's a maximum, minimum, or inflection point.",
        "The error in your approach might be in the application of the integration by parts formula. Remember, for ∫u·dv, the formula is u·v - ∫v·du. Try assigning u and dv differently and attempt the integration again."
      ];
      
      setAiResponse(mockResponses[Math.floor(Math.random() * mockResponses.length)]);
      setAiLoading(false);
    }, 1500);
  };

  const clearAiResponse = () => {
    setAiResponse('');
    setDoubt('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="font-['Poppins'] min-h-screen">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Main Content */}
          <div className="lg:flex-grow lg:w-3/4">
            {/* Video Player */}
            <div className="w-full bg-black relative overflow-hidden rounded-lg shadow-lg">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  ref={videoPlayerRef}
                  src={currentVideo.videoUrl}
                  title={currentVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onEnded={handleVideoEnded}
                ></iframe>
              </div>
            </div>

            {/* Video Info & Controls */}
            <div className="p-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{currentVideo.title}</h1>
              
              <div className="flex flex-wrap items-center justify-between mt-2 mb-4">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                  <span>{currentVideo.duration}</span>
                  <span>•</span>
                  <span>{course.instructor}</span>
                </div>
                
                <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                  <button 
                    onClick={handleLike}
                    className={`flex items-center space-x-1 ${
                      liked ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                    } hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={liked ? "0" : "2"} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>{liked ? currentVideo.likes + 1 : currentVideo.likes}</span>
                  </button>
                  
                  <button 
                    onClick={handleDislike}
                    className={`flex items-center ${
                      disliked ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                    } hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={disliked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={disliked ? "0" : "2"} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                    </svg>
                    <span>{disliked ? currentVideo.dislikes + 1 : currentVideo.dislikes}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>Share</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span>Save</span>
                  </button>
                </div>
              </div>

              {/* Course Progress */}
              <div className="mb-4 backdrop-blur-md bg-white/10 dark:bg-gray-800/20 rounded-xl p-4 border border-white/20 dark:border-gray-700/30 shadow-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Course Progress</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${progress}%`}}></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{course.completedVideos} of {course.totalVideos} lessons completed</span>
                  <span>Enrolled: {course.enrollmentDate}</span>
                </div>
              </div>

              {/* Tabs for Description, Comments, Doubts, Materials */}
              <div className="mb-4">
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab('description')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'description'
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      Description
                    </button>
                    <button
                      onClick={() => setActiveTab('comments')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'comments'
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      Comments
                    </button>
                    <button
                      onClick={() => setActiveTab('doubts')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'doubts'
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      AI Doubt Solver
                    </button>
                    <button
                      onClick={() => setActiveTab('materials')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'materials'
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      Study Materials
                    </button>
                  </nav>
                </div>
              </div>

              {/* Tab Content */}
              <div className="backdrop-blur-md bg-white/20 dark:bg-gray-800/30 rounded-xl p-6 border border-white/20 dark:border-gray-700/30 shadow-lg mb-8">
                {/* Description Tab */}
                {activeTab === 'description' && (
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300">
                      {showFullDescription 
                        ? currentVideo.description 
                        : `${currentVideo.description.substring(0, 150)}${currentVideo.description.length > 150 ? '...' : ''}`
                      }
                    </p>
                    {currentVideo.description.length > 150 && (
                      <button 
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="text-blue-600 dark:text-blue-400 mt-2 text-sm font-medium hover:underline"
                      >
                        {showFullDescription ? 'Show less' : 'Show more'}
                      </button>
                    )}
                    
                    <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">About this course</h3>
                    <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
                  </div>
                )}

                {/* Comments Tab */}
                {activeTab === 'comments' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                      {currentVideo.comments.length} Comments
                    </h3>
                    
                    <form onSubmit={handleCommentSubmit} className="mb-6">
                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                          {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="relative">
                            <textarea
                              rows={3}
                              className="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                              placeholder="Add a comment..."
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              required
                            ></textarea>
                          </div>
                          <div className="mt-2 flex justify-end">
                            <button
                              type="submit"
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                    
                    {currentVideo.comments.length > 0 ? (
                      <div className="space-y-6">
                        {currentVideo.comments.map(com => (
                          <div key={com.id} className="flex space-x-4">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                              {com.user.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium text-gray-900 dark:text-white">{com.user}</h4>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{com.time}</span>
                              </div>
                              <p className="text-gray-700 dark:text-gray-300 mt-1">{com.text}</p>
                              <div className="mt-2 flex items-center space-x-4">
                                <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                  </svg>
                                  {com.likes}
                                </button>
                                <button className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm">Reply</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-gray-500 dark:text-gray-400">Be the first to comment on this video!</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Doubts Tab */}
                {activeTab === 'doubts' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">AI Doubt Solver</h3>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">
                      Ask any question related to this video and our AI tutor will help you with the solution.
                    </p>
                    
                    <form onSubmit={handleDoubtSubmit} className="mb-6">
                      <div className="relative">
                        <textarea
                          rows={3}
                          className="w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          placeholder="Describe your doubt or question..."
                          value={doubt}
                          onChange={(e) => setDoubt(e.target.value)}
                          required
                        ></textarea>
                      </div>
                      <div className="mt-2 flex justify-end">
                        <button
                          type="submit"
                          disabled={aiLoading}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400"
                        >
                          {aiLoading ? 'Processing...' : 'Ask AI Tutor'}
                        </button>
                      </div>
                    </form>
                    
                    {aiLoading && (
                      <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                      </div>
                    )}
                    
                    {aiResponse && (
                      <div className="backdrop-blur-lg bg-blue-50/70 dark:bg-blue-900/30 rounded-xl p-6 border border-blue-200/50 dark:border-blue-700/30 shadow-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center mb-4">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mr-3">
                              AI
                            </div>
                            <h4 className="font-medium text-gray-900 dark:text-white">AI Tutor</h4>
                          </div>
                          <button 
                            onClick={clearAiResponse}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div className="pl-12">
                          <p className="text-gray-800 dark:text-gray-200">{aiResponse}</p>
                          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            Was this response helpful? <button className="text-blue-600 dark:text-blue-400 hover:underline ml-1">Yes</button> · <button className="text-blue-600 dark:text-blue-400 hover:underline ml-1">No</button>
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Common Questions</h4>
                      <div className="space-y-2">
                        <button 
                          onClick={() => setDoubt("How do I find critical points of a function?")}
                          className="w-full text-left p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          How do I find critical points of a function?
                        </button>
                        <button
                          onClick={() => setDoubt("Can you explain the chain rule with an example?")}
                          className="w-full text-left p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          Can you explain the chain rule with an example?
                        </button>
                        <button
                          onClick={() => setDoubt("What's the difference between a local and global maximum?")}
                          className="w-full text-left p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          What's the difference between a local and global maximum?
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Materials Tab */}
                {activeTab === 'materials' && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Study Materials</h3>
                    <p className="mb-6 text-gray-700 dark:text-gray-300">
                      Download these resources to supplement your learning.
                    </p>
                    
                    {currentVideo.materials.length > 0 ? (
                      <div className="space-y-4">
                        {currentVideo.materials.map((material, index) => (
                          <div 
                            key={index}
                            className="flex items-center justify-between p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center">
                              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="text-gray-900 dark:text-white font-medium">{material.name}</h4>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">{material.size}</p>
                              </div>
                            </div>
                            <a 
                              href={material.url}
                              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Download
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-gray-500 dark:text-gray-400">No study materials available for this video.</p>
                      </div>
                    )}
                    
                    <div className="mt-8 p-4 rounded-lg bg-blue-50/70 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-700/30">
                      <h4 className="text-blue-800 dark:text-blue-300 font-medium mb-2">Additional Resources</h4>
                      <p className="text-blue-700 dark:text-blue-400 text-sm">
                        Check out our resource library for more study materials, practice questions, and exam papers.
                      </p>
                      <a 
                        href="#" 
                        className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Visit Resource Library
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="lg:w-1/4 lg:min-w-[350px] border-l border-gray-200 dark:border-gray-700">
            <div className="h-full overflow-y-auto backdrop-blur-md bg-white/20 dark:bg-gray-800/20 border-white/20 dark:border-gray-700/30">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 backdrop-blur-xl bg-white/80 dark:bg-gray-800/80 z-10">
                <h2 className="font-bold text-xl text-gray-900 dark:text-white">{course.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {course.totalVideos} lessons • {course.totalDuration}
                </p>
              </div>
              
              <div className="p-2">
                {course.videos.map((video, index) => (
                  <div 
                    key={video.id}
                    onClick={() => {
                      setCurrentVideo(video);
                      navigate(`/course/${courseId}/video/${video.id}`);
                    }}
                    className={`flex p-2 rounded-lg cursor-pointer ${
                      currentVideo.id === video.id 
                        ? 'bg-blue-100/70 dark:bg-blue-900/30' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700/30'
                    }`}
                  >
                    <div className="relative mr-3 flex-shrink-0">
                      <div className="h-20 w-32 bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden">
                        {video.thumbnail && (
                          <img 
                            src={video.thumbnail} 
                            alt={video.title} 
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      {video.completed && (
                        <div className="absolute bottom-1 right-1 bg-green-500 rounded-full p-1" title="Completed">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className={`text-sm font-medium ${
                        currentVideo.id === video.id 
                          ? 'text-blue-800 dark:text-blue-400' 
                          : 'text-gray-900 dark:text-white'
                      } line-clamp-2`}>
                        {index + 1}. {video.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {video.lastWatchedAt !== '0:00' && video.lastWatchedAt ? `Last watched: ${video.lastWatchedAt}` : 'Not started'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course_Player;
