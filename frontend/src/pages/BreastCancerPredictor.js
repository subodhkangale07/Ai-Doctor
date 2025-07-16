import { useState } from 'react';
import { Brain, Activity, Heart, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import axios from 'axios';

const BreastCancerPredict = () => {
  const [formData, setFormData] = useState({
    smoothness_mean: '',
    symmetry_mean: '',
    fractal_dimension_mean: '',
    texture_se: '',
    area_se: '',
    smoothness_se: '',
    compactness_se: '',
    concavity_se: '',
    concave_points_se: '',
    symmetry_se: '',
    fractal_dimension_se: '',
    texture_worst: '',
    area_worst: '',
    smoothness_worst: '',
    concave_points_worst: '',
    symmetry_worst: '',
    fractal_dimension_worst: ''
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const getExampleValue = (key) => {
    const examples = {
      smoothness_mean: "0.1",
      symmetry_mean: "0.18",
      fractal_dimension_mean: "0.06",
      texture_se: "1.5",
      area_se: "50.3",
      smoothness_se: "0.006",
      compactness_se: "0.03",
      concavity_se: "0.04",
      concave_points_se: "0.02",
      symmetry_se: "0.02",
      fractal_dimension_se: "0.003",
      texture_worst: "27.0",
      area_worst: "185.2",
      smoothness_worst: "0.14",
      concave_points_worst: "0.09",
      symmetry_worst: "0.3",
      fractal_dimension_worst: "0.08"
    };

    return examples[key] || "0.0";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general error message when user starts fixing issues
    if (result === "Please fix the errors above before submitting") {
      setResult(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const value = formData[key].trim();
      if (!value) {
        newErrors[key] = 'This field is required';
        isValid = false;
      } else if (isNaN(value) || value === '') {
        newErrors[key] = 'Please enter a valid number';
        isValid = false;
      } else if (parseFloat(value) < 0) {
        newErrors[key] = 'Value must be positive';
        isValid = false;
      }
    });

    setErrors(newErrors);
    
    // If there are errors, show a general error message
    if (!isValid) {
      setResult("Please fix the errors above before submitting");
    }
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Show error message when validation fails
      setResult("Please fix the errors above before submitting");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      // Simulate API call for demo
      setTimeout(() => {
        const predictions = ["Benign", "Malignant"];
        const randomResult = predictions[Math.floor(Math.random() * predictions.length)];
        setResult(randomResult);
        setLoading(false);
      }, 2000);

      // Actual API call (commented out for demo)
      
      const response = await axios.post('https://ai-doctor-ho60.onrender.com/breast_predict', {
        ...formData,
        ...Object.fromEntries(Object.entries(formData).map(([k, v]) => [k, parseFloat(v)]))
      });
      setResult(response.data.prediction);
      
    } catch (error) {
      setResult("Error in prediction");
      console.error(error);
      setLoading(false);
    }
  };

  // Group fields by category for better organization
  const fieldGroups = {
    "Mean Values": [
      'smoothness_mean', 'symmetry_mean', 'fractal_dimension_mean'
    ],
    "Standard Error": [
      'texture_se', 'area_se', 'smoothness_se', 'compactness_se', 
      'concavity_se', 'concave_points_se', 'symmetry_se', 'fractal_dimension_se'
    ],
    "Worst Values": [
      'texture_worst', 'area_worst', 'smoothness_worst', 
      'concave_points_worst', 'symmetry_worst', 'fractal_dimension_worst'
    ]
  };

  // Check if form has any data and is valid
  const hasData = Object.values(formData).some(value => value.trim() !== '');
  const isFormValid = Object.values(formData).every(value => {
    const trimmedValue = value.trim();
    return trimmedValue !== '' && !isNaN(trimmedValue) && parseFloat(trimmedValue) >= 0;
  }) && Object.values(formData).every(value => value.trim() !== '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-3 rounded-2xl shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Breast Cancer Prediction
          </h1>
          <p className="text-slate-600 text-lg">
            Advanced AI-powered diagnostic assistance for healthcare professionals
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-blue-200/50 p-8">
          <div className="space-y-8">
            {Object.entries(fieldGroups).map(([groupName, fields]) => (
              <div key={groupName} className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Activity className="w-5 h-5 text-teal-600" />
                  <h3 className="text-xl font-semibold text-slate-800">{groupName}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fields.map((key) => (
                    <div key={key} className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">
                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="number"
                        step="any"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        required
                        placeholder={`e.g. ${getExampleValue(key)}`}
                        className={`w-full px-4 py-3 rounded-full border bg-white/80 backdrop-blur-md text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 hover:shadow-md ${
                          errors[key] ? 'border-red-500' : 'border-blue-200/50'
                        }`}
                      />
                      {errors[key] && (
                        <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <div className="pt-6 border-t border-blue-200/50">
              <button
                type="submit"
                disabled={loading || !isFormValid}
                onClick={handleSubmit}
                className={`w-full py-4 px-8 rounded-full font-semibold text-lg transition-all duration-300 transform shadow-lg flex items-center justify-center space-x-2 ${
                  loading || !isFormValid
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
                    : 'bg-gradient-to-r from-teal-500 to-blue-600 text-white hover:from-teal-600 hover:to-blue-700 hover:scale-105'
                }`}
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5" />
                    <span>Run Prediction</span>
                  </>
                )}
              </button>
              {!isFormValid && (
                <div className="text-center mt-3">
                  {!hasData ? (
                    <p className="text-slate-500 text-sm">
                      Please fill in all required fields to run the prediction
                    </p>
                  ) : (
                    <p className="text-red-500 text-sm">
                      Please fix the errors above before submitting
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Result Display */}
          {result && (
            <div className="mt-8 pt-6 border-t border-blue-200/50">
              <div className={`p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 ${
                result === "Benign" 
                  ? "bg-green-50/80 border-green-200/50 text-green-800" 
                  : result === "Malignant"
                  ? "bg-red-50/80 border-red-200/50 text-red-800"
                  : result === "Please fix the errors above before submitting"
                  ? "bg-red-50/80 border-red-200/50 text-red-800"
                  : "bg-yellow-50/80 border-yellow-200/50 text-yellow-800"
              }`}>
                <div className="flex items-center space-x-3">
                  {result === "Benign" ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">
                      {result === "Please fix the errors above before submitting" ? "Validation Error" : "Prediction Result"}
                    </h3>
                    <p className="text-lg font-medium mt-1">{result}</p>
                  </div>
                </div>
                
                {result !== "Please fix the errors above before submitting" && (
                  <div className="mt-4 p-4 bg-white/60 rounded-xl">
                    <p className="text-sm text-slate-700">
                      <strong>Note:</strong> This prediction is for educational purposes only. 
                      Always consult with qualified healthcare professionals for medical diagnosis and treatment decisions.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-blue-200/50 hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-2 rounded-full">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">AI-Powered</h3>
            </div>
            <p className="text-slate-600">Advanced machine learning algorithms trained on extensive medical datasets for accurate predictions.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-blue-200/50 hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-2 rounded-full">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Real-time Analysis</h3>
            </div>
            <p className="text-slate-600">Instant processing and analysis of medical parameters for quick diagnostic insights.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-blue-200/50 hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-2 rounded-full">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Patient Care</h3>
            </div>
            <p className="text-slate-600">Supporting healthcare professionals in providing better patient care through data-driven insights.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreastCancerPredict;