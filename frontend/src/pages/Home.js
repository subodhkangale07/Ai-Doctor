import React, { useState, useEffect } from 'react';
import { Heart, Brain, Stethoscope, Activity, ArrowRight, Shield, Zap, Users, CheckCircle, Star, Menu, X, BarChart3, TrendingUp } from 'lucide-react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const predictionServices = [
    {
      id: 'breast-cancer',
      title: 'Breast Cancer Prediction',
      description: 'Advanced risk assessment based on medical parameters and patient data',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-teal-500 to-cyan-600',
      features: ['Medical Data Analysis', 'Risk Assessment', 'Early Detection'],
      route: '/predict/breast'
    },
    {
      id: 'diabetes',
      title: 'Diabetes Prediction',
      description: 'Comprehensive diabetes risk evaluation using health metrics',
      icon: <Activity className="w-8 h-8" />,
      color: 'from-blue-500 to-indigo-600',
      features: ['Health Metrics', 'Risk Evaluation', 'Preventive Insights'],
      route: '/predict/diabetes'
    },
    {
      id: 'heart-disease',
      title: 'Heart Disease Analysis',
      description: 'Cardiovascular health assessment through clinical parameters',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-red-400 to-pink-500',
      features: ['Cardiac Assessment', 'Risk Factors', 'Health Monitoring'],
      route: '/predict/heart'
    },
    {
      id: 'symptom-disease',
      title: 'Symptom-Based Diagnosis',
      description: 'Multi-disease prediction based on symptom patterns and analysis',
      icon: <Stethoscope className="w-8 h-8" />,
      color: 'from-emerald-500 to-teal-600',
      features: ['Symptom Analysis', 'Pattern Recognition', 'Multiple Conditions'],
      route: '/predict/disease'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Predictions Made', icon: <TrendingUp className="w-6 h-6" /> },
    { number: '95%', label: 'Accuracy Rate', icon: <CheckCircle className="w-6 h-6" /> },
    { number: '10K+', label: 'Users Helped', icon: <Users className="w-6 h-6" /> },
    { number: '4', label: 'AI Models', icon: <Brain className="w-6 h-6" /> }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Cardiologist",
      content: "This platform has revolutionized how we approach early disease detection. The data-driven insights are remarkable.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Healthcare Administrator",
      content: "The user interface is intuitive and the predictions based on patient data are incredibly reliable.",
      rating: 5
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Internal Medicine",
      content: "The comprehensive analysis of health parameters provides valuable insights for patient care.",
      rating: 5
    }
  ];

  const handleNavigate = (route) => {
    window.location.href = route;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard(prev => (prev + 1) % predictionServices.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
{/* <div><Navbar/></div> */}
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-100/30 to-blue-100/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-800 mb-6">
              AI-Powered
              <span className="block bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                Health Predictions
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Enter your health data and symptoms to get instant, accurate disease predictions 
              powered by advanced machine learning algorithms.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <button 
                onClick={() => handleNavigate('/predict')}
                className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-teal-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Start Analysis</span>
              </button>
              <button className="border-2 border-teal-500 text-teal-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-teal-50 transition-all duration-300 flex items-center justify-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Learn More</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/60 backdrop-blur-md border-y border-blue-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-teal-500 to-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-2">{stat.number}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Our Prediction Models</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Advanced AI models that analyze your health data to provide accurate disease predictions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {predictionServices.map((service, index) => (
              <div
                key={service.id}
                className={`relative group cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                  activeCard === index ? 'scale-105' : ''
                }`}
                onMouseEnter={() => setActiveCard(index)}
              >
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-blue-200/50 hover:border-teal-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <div className={`bg-gradient-to-r ${service.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{service.title}</h3>
                  <p className="text-slate-600 mb-6">{service.description}</p>
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-teal-500" />
                        <span className="text-sm text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => handleNavigate(service.route)}
                    className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 rounded-full font-semibold hover:from-teal-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <span>Try Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">Why Choose MediPredict AI?</h2>
              <p className="text-slate-600 mb-8 text-lg">
                Our platform combines cutting-edge artificial intelligence with medical expertise to provide 
                accurate, fast, and reliable health predictions based on your data inputs.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Data-Driven Analysis', desc: 'Advanced algorithms that analyze your health parameters for accurate predictions' },
                  { title: 'Multiple Health Conditions', desc: 'Comprehensive platform covering various disease categories' },
                  { title: 'Instant Results', desc: 'Get health insights in seconds, not days' },
                  { title: 'User-Friendly Interface', desc: 'Simple data entry process that anyone can use' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-teal-500 to-blue-600 w-2 h-2 rounded-full mt-3"></div>
                    <div>
                      <h3 className="text-slate-800 font-semibold text-lg">{feature.title}</h3>
                      <p className="text-slate-600">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-4">How It Works</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <span>Enter your health data and symptoms</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <span>AI analyzes patterns using machine learning</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <span>Receive instant health predictions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">What Healthcare Professionals Say</h2>
            <p className="text-xl text-slate-600">Trusted by doctors and healthcare providers worldwide</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-blue-200/50 shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-slate-800">{testimonial.name}</div>
                  <div className="text-slate-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Check Your Health Status?</h2>
          <p className="text-xl text-teal-100 mb-8">
            Join thousands of users who trust MediPredict AI for accurate health predictions based on their data.
          </p>
          <button 
            onClick={() => handleNavigate('/predict')}
            className="bg-white text-teal-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Your Health Analysis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-2 rounded-xl">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">MediPredict AI</span>
              </div>
              <p className="text-slate-400">Revolutionizing healthcare through AI-powered health predictions.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => handleNavigate('/predict/breast')}>Breast Cancer Prediction</button></li>
                <li><button onClick={() => handleNavigate('/predict/diabetes')}>Diabetes Prediction</button></li>
                <li><button onClick={() => handleNavigate('/predict/heart')}>Heart Disease Analysis</button></li>
                <li><button onClick={() => handleNavigate('/predict/disease')}>Symptom Analysis</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-slate-400">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>GitHub</li>
                <li>Documentation</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 MediPredict AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;