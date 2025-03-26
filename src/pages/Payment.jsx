import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { 
  Elements, 
  CardElement, 
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';
import { useTheme } from '../context/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';

// Replace this with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_51O5yMMSFak32etc6MwJG5AKrDhyLMxddyrnGqKahGVKoaltQJHkISxUYJystDCeOsjFRKnRCsHaBGjAOc0GTrr9O00yvND1ir6');

function PaymentPage() {
  return (
    <div className="font-['Poppins'] max-w-4xl mx-auto py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Payment</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Secure payment gateway for course enrollment
        </p>
      </div>

      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { darkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [enrolledCourse, setEnrolledCourse] = useState(null);
  
  // Sample plans data (would come from backend in production)
  const plans = {
    monthly: {
      id: 'plan_monthly',
      name: 'Monthly Plan',
      price: 1499,
      interval: 'month',
      description: 'Full access to all courses for one month'
    },
    quarterly: {
      id: 'plan_quarterly',
      name: 'Quarterly Plan',
      price: 3999,
      interval: 'quarter',
      description: 'Full access to all courses for three months',
      savings: '11%'
    },
    yearly: {
      id: 'plan_yearly',
      name: 'Annual Plan',
      price: 14999,
      interval: 'year',
      description: 'Full access to all courses for one year',
      savings: '17%'
    }
  };

  // Get the course data from location state or fallback to available courses
  useEffect(() => {
    // In a real app, you would get this from location state passed by the Courses page
    // or fetch from an API using an ID from URL parameters
    
    // Check if there's course data passed in the location state
    if (location.state && location.state.course) {
      setEnrolledCourse(location.state.course);
    } else {
      // Fallback to sample course data
      // In production, you'd redirect to the courses page if no course is selected
      const availableCourses = [
        {
          id: 1,
          title: "Mathematics for JEE Mains & Advanced",
          description: "A comprehensive course covering all mathematics topics for JEE preparation with practice problems and mock tests.",
          instructor: "Dr. Rajesh Kumar",
          rating: 4.8,
          reviews: 240,
          price: 12999,
          image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb"
        },
        {
          id: 2,
          title: "Complete Physics for NEET",
          description: "Master the concepts of physics for NEET with detailed explanations, practice questions, and regular assessments.",
          instructor: "Prof. Sunita Sharma",
          rating: 4.9,
          reviews: 189,
          price: 11499,
          image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d"
        }
      ];
      
      // Use the first course as a fallback
      const mockCourse = availableCourses[Math.floor(Math.random() * availableCourses.length)];
      setEnrolledCourse(mockCourse);
    }
  }, [location]);

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };
  
  const handleApplyCoupon = () => {
    // Simulate API call to validate coupon
    setLoading(true);
    setTimeout(() => {
      if (couponCode.toLowerCase() === 'newuser20') {
        setAppliedCoupon({
          code: couponCode,
          discount: 20,
          discountType: 'percentage'
        });
        setError(null);
      } else {
        setError('Invalid coupon code');
        setAppliedCoupon(null);
      }
      setLoading(false);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    setLoading(true);
    setError(null);

    // Get a reference to a CardElement instance
    const cardElement = elements.getElement(CardElement);

    // Use Stripe.js to create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Simulate payment processing
    try {
      // In a real app, you'd send the paymentMethod.id to your server
      // and create a payment intent with your backend
      setTimeout(() => {
        setSucceeded(true);
        setLoading(false);
      }, 2000);
    } catch (err) {
      setError('Payment processing failed. Please try again.');
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    const basePrice = plans[selectedPlan].price;
    
    if (appliedCoupon && appliedCoupon.discountType === 'percentage') {
      const discount = (basePrice * appliedCoupon.discount) / 100;
      return basePrice - discount;
    }
    
    return basePrice;
  };

  // Format price in Indian Rupees
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: darkMode ? '#fff' : '#32325d',
        fontFamily: '"Poppins", sans-serif',
        '::placeholder': {
          color: darkMode ? '#aab7c4' : '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  if (succeeded) {
    return (
      <div className="backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/30 rounded-xl p-8 shadow-lg text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thank you for your payment. You now have access to your enrolled courses.
        </p>
        <a href="/courses" className="px-6 py-3 rounded-full backdrop-blur-sm bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 border border-blue-400/30 w-full sm:w-auto sm:inline-block">
          Start Learning
        </a>
      </div>
    );
  }

  if (!enrolledCourse) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-5 gap-8">
      {/* Left side - Payment form */}
      <div className="md:col-span-3">
        <div className="backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/30 rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Payment Details</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Card Information
              </label>
              <div className={`p-4 border rounded-lg mb-4 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
                <CardElement options={cardElementOptions} className='' />
              </div>
            </div>
            
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name on Card
                </label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2.5 text-black dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-2.5 text-black dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Billing Address
              </label>
              <input 
                type="text"
                required
                className="w-full px-4 py-2.5 text-black dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
                placeholder="Street Address"
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text"
                  required
                  className="w-full px-4 py-2.5 text-black dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="City"
                />
                <input 
                  type="text"
                  required
                  className="w-full px-4 py-2.5 text-black dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="PIN Code"
                />
              </div>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
                {error}
              </div>
            )}
            
            <button 
              type="submit"
              disabled={!stripe || loading}
              className="w-full px-6 py-3 rounded-full backdrop-blur-sm bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center border border-blue-400/30 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                `Pay ${formatPrice(calculateTotal())}`
              )}
            </button>
            
            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Your payment information is secured with SSL encryption
              </span>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right side - Order summary */}
      <div className="w-[450px] md:col-span-2">
        <div className="backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/30 rounded-xl p-6 shadow-lg sticky top-24">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
          
          {/* Enrolled course */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Enrolled Course</h3>
            <div className="flex items-start p-4 bg-gray-50/70 dark:bg-gray-700/50 rounded-lg mb-2">
              {enrolledCourse.image && (
                <div className="flex-shrink-0 mr-3">
                  <img 
                    src={enrolledCourse.image} 
                    alt={enrolledCourse.title} 
                    className="w-16 h-16 rounded-md object-cover"
                  />
                </div>
              )}
              <div className="flex-grow">
                <p className="font-medium text-gray-900 dark:text-white">{enrolledCourse.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{enrolledCourse.instructor}</p>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-400 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill={i < Math.floor(enrolledCourse.rating || 0) ? "currentColor" : "none"} stroke="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    {enrolledCourse.rating && <span className="ml-1 text-xs">{enrolledCourse.rating}</span>}
                  </span>
                  {enrolledCourse.reviews && (
                    <span className="text-xs ml-2 text-gray-500 dark:text-gray-400">({enrolledCourse.reviews} reviews)</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Plan selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Select Plan</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {Object.keys(plans).map(planId => (
                <button
                  key={planId}
                  type="button"
                  onClick={() => handlePlanChange(planId)}
                  className={`p-3 rounded-lg border text-center relative transition-all duration-300 ${
                    selectedPlan === planId 
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
                  }`}
                >
                  {plans[planId].savings && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full px-2 py-1">
                      Save {plans[planId].savings}
                    </span>
                  )}
                  <span className="block font-medium text-gray-900 dark:text-white">
                    {plans[planId].interval === 'month' ? 'Monthly' : 
                     plans[planId].interval === 'quarter' ? 'Quarterly' : 'Yearly'}
                  </span>
                  <span className="block text-blue-600 dark:text-blue-400 font-bold mt-1">
                    {formatPrice(plans[planId].price)}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {plans[selectedPlan].description}
            </p>
          </div>
          
          {/* Coupon */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Have a Coupon?</h3>
            <div className="flex mb-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                disabled={appliedCoupon || loading}
                placeholder="Enter coupon code"
                className="flex-grow px-4 py-2 text-black dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                disabled={!couponCode || appliedCoupon || loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg disabled:opacity-70"
              >
                {loading ? 'Applying...' : 'Apply'}
              </button>
            </div>
            {appliedCoupon && (
              <div className="flex items-center justify-between p-2 bg-green-100 dark:bg-green-900/30 rounded text-sm text-green-700 dark:text-green-300">
                <span>Coupon applied: {appliedCoupon.discount}% off</span>
                <button
                  type="button"
                  onClick={() => setAppliedCoupon(null)}
                  className="text-xs underline"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between mb-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>{formatPrice(plans[selectedPlan].price)}</span>
            </div>
            
            {appliedCoupon && (
              <div className="flex justify-between mb-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Discount ({appliedCoupon.discount}%)</span>
                <span>-{formatPrice((plans[selectedPlan].price * appliedCoupon.discount) / 100)}</span>
              </div>
            )}
            
            <div className="flex justify-between mb-2 text-sm text-gray-600 dark:text-gray-400">
              <span>GST (18%)</span>
              <span>Included</span>
            </div>
            
            <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
              <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">{formatPrice(calculateTotal())}</span>
            </div>
          </div>
              <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">{formatPrice(calculateTotal())}</span>
            </div>
          </div>
        </div>
  );
}

export default PaymentPage;