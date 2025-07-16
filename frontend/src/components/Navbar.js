import React, { useState } from 'react';
import { Activity, Brain, Heart, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  // Navigate to different pages (for actual routing)
  const navigate = (path) => {
    window.location.href = path;
  };

  // Handle navigation based on type
  const handleNavigation = (target) => {
    if (target.startsWith('#')) {
      // Scroll to section on same page
      scrollToSection(target.substring(1));
    } else {
      // Navigate to different page
      navigate(target);
    }
  };

  return (
    <nav className="relative z-50 bg-white/90 backdrop-blur-md border-b border-blue-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-2 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">MediPredict AI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('/predict')}
              className="text-slate-700 hover:text-teal-600 transition-colors font-medium"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavigation('#about')}
              className="text-slate-700 hover:text-teal-600 transition-colors font-medium"
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation('#testimonials')}
              className="text-slate-700 hover:text-teal-600 transition-colors font-medium"
            >
              Testimonials
            </button>
            <button 
              onClick={() => handleNavigation('/predict')}
              className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-2 rounded-full hover:from-teal-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
            >
              Get Started
            </button>
          </div>

          <button 
            className="md:hidden text-slate-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-blue-200/50 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => handleNavigation('/predict')}
              className="block w-full text-left px-3 py-2 text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavigation('#about')}
              className="block w-full text-left px-3 py-2 text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation('#testimonials')}
              className="block w-full text-left px-3 py-2 text-slate-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            >
              Testimonials
            </button>
            <button 
              onClick={() => handleNavigation('/predict')}
              className="w-full text-left px-3 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg mt-2 hover:from-teal-600 hover:to-blue-700 transition-all duration-300 font-medium"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}