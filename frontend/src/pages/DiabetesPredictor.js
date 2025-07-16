import { useState } from "react";
import { predictDiabetes } from "../api";

const DiabetesPredict = () => {
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    Insulin: "",
    BMI: "",
    Age: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setResult(null);

  try {
    const payload = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
    );

    const response = await predictDiabetes(payload);

    // Expected backend response: { prediction, probability_diabetic, decision_score }
    setResult(response);
  } catch (error) {
    setResult({ error: "Something went wrong during prediction." });
  } finally {
    setLoading(false);
  }
};


  // 🔧 Helper to show example values
  const getExampleValue = (key) => {
    const examples = {
      Pregnancies: "2",
      Glucose: "120",
      BloodPressure: "70",
      Insulin: "85",
      BMI: "28.5",
      Age: "35"
    };
    return examples[key] || "0";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Diabetes Risk Prediction
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your health parameters to get an AI-powered diabetes risk assessment
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-blue-200/50 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="any"
                      name={key}
                      value={value}
                      onChange={handleChange}
                      placeholder={`e.g. ${getExampleValue(key)}`}
                      required
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 bg-white/70 backdrop-blur-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:border-blue-300 placeholder-gray-400"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-teal-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:from-blue-700 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  "Predict Diabetes Risk"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-8 animate-fade-in">
            {result.error ? (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                  <p className="text-red-700 font-semibold">{result.error}</p>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-green-800 mb-4">Prediction Results</h2>
                  
                  {/* Main Prediction */}
                  <div className="bg-white/80 rounded-xl p-6 mb-6 shadow-inner">
                    <p className="text-3xl font-bold text-green-700 mb-2">
                      {result.prediction}
                    </p>
                    <p className="text-gray-600">Risk Assessment</p>
                  </div>

                  {/* Additional Metrics */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {result.probability_diabetic && (
                      <div className="bg-white/70 rounded-xl p-6 shadow-inner border border-blue-100">
                        <div className="text-center">
                          <p className="text-sm font-semibold text-gray-600 mb-2">Diabetes Probability</p>
                          <div className="mb-4">
                            <p className="text-3xl font-bold text-blue-600 mb-1">
                              {(result.probability_diabetic * 100).toFixed(1)}%
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                              <div 
                                className={`h-3 rounded-full transition-all duration-1000 ${
                                  result.probability_diabetic < 0.3 ? 'bg-green-500' : 
                                  result.probability_diabetic < 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${(result.probability_diabetic * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 space-y-1">
                            <div className="flex justify-between">
                              <span className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                Low Risk: 0-30%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="flex items-center">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                                Moderate Risk: 30-70%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="flex items-center">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                                High Risk: 70-100%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {result.decision_score && (
                      <div className="bg-white/70 rounded-xl p-6 shadow-inner border border-purple-100">
                        <div className="text-center">
                          <p className="text-sm font-semibold text-gray-600 mb-2">AI Decision Score</p>
                          <div className="mb-4">
                            <p className="text-3xl font-bold text-purple-600 mb-1">
                              {result.decision_score.toFixed(3)}
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-3 mt-2 relative">
                              <div className="absolute left-1/2 top-0 w-0.5 h-3 bg-gray-400 transform -translate-x-0.5"></div>
                              <div 
                                className={`h-3 rounded-full transition-all duration-1000 ${
                                  result.decision_score < -0.5 ? 'bg-green-500' : 
                                  result.decision_score < 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ 
                                  width: `${Math.abs(result.decision_score) * 50}%`,
                                  marginLeft: result.decision_score < 0 ? `${50 - Math.abs(result.decision_score) * 50}%` : '50%'
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 space-y-1">
                            <div className="flex justify-between">
                              <span className="flex items-center">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                Healthy: &lt; -0.5
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="flex items-center">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                                Borderline: -0.5 to 0.5
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="flex items-center">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                                At Risk: &gt; 0.5
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Health Recommendations */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-sm">💡</span>
                        </div>
                        Understanding Your Results
                      </h3>
                      <div className="space-y-2 text-sm text-blue-700">
                        <p><strong>Probability Score:</strong> Shows likelihood of diabetes (0-100%)</p>
                        <p><strong>Decision Score:</strong> AI confidence level (-2 to +2 range)</p>
                        <p><strong>Lower scores</strong> indicate healthier metabolic profile</p>
                        <p><strong>Higher scores</strong> suggest increased monitoring needed</p>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-sm">🎯</span>
                        </div>
                        Health Recommendations
                      </h3>
                      <div className="space-y-2 text-sm text-green-700">
                        <p>• <strong>Regular Exercise:</strong> 150 min/week moderate activity</p>
                        <p>• <strong>Balanced Diet:</strong> Focus on whole grains, lean proteins</p>
                        <p>• <strong>Weight Management:</strong> Maintain healthy BMI (18.5-24.9)</p>
                        <p>• <strong>Regular Checkups:</strong> Monitor blood glucose levels</p>
                      </div>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <p className="text-sm text-yellow-800">
                      <strong>Important:</strong> This is an AI prediction for reference only. 
                      Please consult with a healthcare professional for proper medical diagnosis and treatment.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default DiabetesPredict;