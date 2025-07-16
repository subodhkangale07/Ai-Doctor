import { Link } from "react-router-dom";
import { Heart, Activity, Stethoscope, Brain, ArrowRight, TrendingUp, Shield, BarChart3, Image } from 'lucide-react';

const features = [
  {
    title: "Disease from Symptoms",
    description: "Predict possible diseases from a comprehensive list of symptoms using advanced AI analysis.",
    link: "/predict/disease",
    icon: <Stethoscope className="w-8 h-8" />,
    color: "from-emerald-500 to-teal-600",
    bgColor: "from-emerald-50 to-teal-50"
  },
  {
    title: "Diabetes Prediction",
    description: "Comprehensive diabetes risk assessment based on your health metrics and lifestyle factors.",
    link: "/predict/diabetes",
    icon: <Activity className="w-8 h-8" />,
    color: "from-blue-500 to-indigo-600",
    bgColor: "from-blue-50 to-indigo-50"
  },
  {
    title: "Breast Cancer Detection",
    description: "Advanced AI analysis to predict tumor classification and assess cancer risk factors.",
    link: "/predict/breast",
    icon: <Heart className="w-8 h-8" />,
    color: "from-pink-500 to-rose-600",
    bgColor: "from-pink-50 to-rose-50"
  },
  {
    title: "Heart Disease Prediction",
    description: "Cardiovascular health assessment through comprehensive risk factor analysis.",
    link: "/predict/heart",
    icon: <Heart className="w-8 h-8" />,
    color: "from-red-500 to-pink-600",
    bgColor: "from-red-50 to-pink-50"
  },
  {
  title: "Pneumonia Detection",
  description: "Detect pneumonia using chest X-ray image analysis through deep learning.",
  link: "/predict/pneumonia",
  icon: <Image className="w-8 h-8" />, // Make sure to import `Image` from lucide-react or replace with your own icon
  color: "from-blue-500 to-cyan-600",
  bgColor: "from-blue-50 to-cyan-50"
},

];

const PredictHub = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Header Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-100/30 to-blue-100/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 mb-6 border border-blue-200/50 shadow-lg">
            <Brain className="w-6 h-6 text-teal-600" />
            <span className="text-slate-700 font-semibold">AI Health Prediction Dashboard</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Choose Your 
            <span className="block bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Health Analysis
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Select from our comprehensive AI models to get accurate health predictions based on your data
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white/60 backdrop-blur-md border-y border-blue-200/50 py-8 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex items-center justify-center space-x-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              <span className="text-slate-700 font-semibold">95% Accuracy</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-slate-700 font-semibold">Secure & Private</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <span className="text-slate-700 font-semibold">Real-time Analysis</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Brain className="w-5 h-5 text-indigo-600" />
              <span className="text-slate-700 font-semibold">AI-Powered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="group relative overflow-hidden bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-blue-200/50 hover:border-teal-300 transition-all duration-500 hover:shadow-xl transform hover:scale-105"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative p-8">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                {/* Title */}
                <h2 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-teal-700 transition-colors duration-300">
                  {feature.title}
                </h2>
                
                {/* Description */}
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <div className={`inline-flex items-center space-x-2 text-sm font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                    <span>Start Analysis</span>
                  </div>
                  <div className={`p-2 rounded-full bg-gradient-to-r ${feature.color} text-white shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:translate-x-1`}>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
              
              {/* Hover Animation Line */}
              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Access Bar */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Need Help Choosing?
          </h3>
          <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
            Not sure which analysis to start with? Our symptom-based diagnosis can help identify the most relevant prediction model for your needs.
          </p>
          <Link
            to="/predict/disease"
            className="inline-flex items-center space-x-2 bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Stethoscope className="w-5 h-5" />
            <span>Start with Symptom Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-slate-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-teal-400" />
            <span className="text-slate-300">Your health data is secure and never stored</span>
          </div>
          <p className="text-slate-400 text-sm">
            All predictions are for informational purposes only. Please consult with healthcare professionals for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictHub;