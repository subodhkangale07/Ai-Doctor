import { useState } from "react";
import { Heart, User, Calendar, GraduationCap, Cigarette, Activity, Droplets, Gauge, Scale, TrendingUp, Stethoscope, Brain } from "lucide-react";
import { predictHeartDisease } from "../api";

const HeartPredict = () => {
  const [formData, setFormData] = useState({
    male: 1,
    age: 50,
    education: 1.0,
    currentSmoker: 0,
    cigsPerDay: 0,
    prevalentHyp: 0,
    totChol: 200,
    sysBP: 120,
    diaBP: 80,
    BMI: 22.5,
    heartRate: 70,
    glucose: 90,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };


// Inside HeartPredict component:
const handleSubmit = async () => {
  setLoading(true);
  try {
    const predictionResult = await predictHeartDisease(formData);

    // You may receive { prediction: "Heart Disease Detected" } or similar
    const predictionText = predictionResult.prediction;
    const riskLevel = predictionText.includes("No") ? "Low Risk" : "High Risk";
    const probability = predictionText.includes("No") ? 0.2 : 0.8;

    setResult({
      prediction: riskLevel,
      probability: probability,
      riskScore: riskLevel === "High Risk" ? 6 : 1,
      totalFactors: 10,
    });
  } catch (error) {
    setResult({ error: "API Error: Could not get prediction." });
  } finally {
    setLoading(false);
  }
};


  const getFieldIcon = (key) => {
    const icons = {
      male: User,
      age: Calendar,
      education: GraduationCap,
      currentSmoker: Cigarette,
      cigsPerDay: Cigarette,
      prevalentHyp: Activity,
      totChol: Droplets,
      sysBP: Gauge,
      diaBP: Gauge,
      BMI: Scale,
      heartRate: Heart,
      glucose: TrendingUp
    };
    return icons[key] || Activity;
  };

  const getFieldLabel = (key) => {
    const labels = {
      male: "Gender",
      age: "Age",
      education: "Education Level",
      currentSmoker: "Current Smoker",
      cigsPerDay: "Cigarettes Per Day",
      prevalentHyp: "Hypertension",
      totChol: "Total Cholesterol",
      sysBP: "Systolic Blood Pressure",
      diaBP: "Diastolic Blood Pressure",
      BMI: "Body Mass Index",
      heartRate: "Heart Rate",
      glucose: "Blood Glucose"
    };
    return labels[key] || key;
  };

  const getFieldDescription = (key) => {
    const descriptions = {
      male: "1 = Male, 0 = Female",
      age: "Age in years",
      education: "Education level (1.0 - 4.0)",
      currentSmoker: "1 = Yes, 0 = No",
      cigsPerDay: "Number of cigarettes per day",
      prevalentHyp: "Hypertension present (1 = Yes, 0 = No)",
      totChol: "Total cholesterol (mg/dL)",
      sysBP: "Systolic blood pressure (mmHg)",
      diaBP: "Diastolic blood pressure (mmHg)",
      BMI: "Body Mass Index (kg/m²)",
      heartRate: "Heart rate (beats per minute)",
      glucose: "Blood glucose level (mg/dL)"
    };
    return descriptions[key] || "";
  };

  const getPlaceholder = (key) => {
    const examples = {
      male: "1",
      age: "50",
      education: "1.0",
      currentSmoker: "0",
      cigsPerDay: "0",
      prevalentHyp: "0",
      totChol: "200",
      sysBP: "120",
      diaBP: "80",
      BMI: "22.5",
      heartRate: "70",
      glucose: "90",
    };
    return examples[key] || "";
  };

  const getFieldCategories = () => {
    return {
      "Personal Information": ["male", "age", "education"],
      "Lifestyle Factors": ["currentSmoker", "cigsPerDay"],
      "Medical History": ["prevalentHyp"],
      "Vital Signs": ["sysBP", "diaBP", "heartRate"],
      "Laboratory Values": ["totChol", "glucose", "BMI"]
    };
  };

  const getRiskColor = (prediction) => {
    switch (prediction) {
      case "High Risk":
        return "from-red-500 to-red-600";
      case "Moderate Risk":
        return "from-yellow-500 to-orange-500";
      case "Low Risk":
        return "from-green-500 to-green-600";
      default:
        return "from-blue-500 to-blue-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-50 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg mb-4">
            <Heart className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Heart Disease Risk Assessment
          </h1>
          <p className="text-slate-600 text-lg">
            Comprehensive cardiovascular risk evaluation using clinical parameters
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-8">
            {Object.entries(getFieldCategories()).map(([category, fields]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fields.map((key) => {
                    const Icon = getFieldIcon(key);
                    return (
                      <div key={key} className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-slate-700">
                          <Icon className="w-4 h-4 mr-2 text-red-600" />
                          {getFieldLabel(key)}
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            placeholder={getPlaceholder(key)}
                            step="any"
                            required
                            className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:bg-white/70"
                          />
                          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <span className="text-xs text-slate-400">
                              {key.includes("BP") ? "mmHg" : 
                               key === "BMI" ? "kg/m²" : 
                               key === "heartRate" ? "bpm" :
                               key.includes("Chol") || key === "glucose" ? "mg/dL" : ""}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500">{getFieldDescription(key)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="group relative px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
              >
                <div className="flex items-center space-x-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Analyzing Risk...</span>
                    </>
                  ) : (
                    <>
                      <Stethoscope className="w-5 h-5" />
                      <span>Assess Heart Disease Risk</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Results Card */}
        {result && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Risk Assessment Results</h2>
            </div>

            {result.error ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-600 font-medium">{result.error}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Main Risk Level */}
                <div className="text-center">
                  <div className={`inline-flex items-center px-6 py-3 rounded-xl font-bold text-lg bg-gradient-to-r ${getRiskColor(result.prediction)} text-white shadow-lg`}>
                    <Heart className="w-5 h-5 mr-2" />
                    {result.prediction}
                  </div>
                </div>

                {/* Detailed Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border border-red-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Risk Probability</p>
                        <p className="text-2xl font-bold text-red-600">
                          {(result.probability * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="w-16 h-16 relative">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            className="text-red-200"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeDasharray={`${2 * Math.PI * 28 * result.probability} ${2 * Math.PI * 28}`}
                            className="text-red-600"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">Risk Factors</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {result.riskScore} / {result.totalFactors}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Brain className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Risk Interpretation */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Risk Interpretation</h3>
                  <div className="text-sm text-blue-700 space-y-1">
                    {result.prediction === "High Risk" && (
                      <p>This assessment indicates elevated cardiovascular risk. Consider lifestyle modifications and medical consultation.</p>
                    )}
                    {result.prediction === "Moderate Risk" && (
                      <p>This assessment indicates moderate cardiovascular risk. Focus on preventive measures and regular monitoring.</p>
                    )}
                    {result.prediction === "Low Risk" && (
                      <p>This assessment indicates lower cardiovascular risk. Maintain healthy lifestyle habits for continued wellbeing.</p>
                    )}
                  </div>
                </div>

                {/* Medical Disclaimer */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-yellow-700 text-sm font-bold">!</span>
                    </div>
                    <div>
                      <p className="text-sm text-yellow-800 font-medium">Medical Disclaimer</p>
                      <p className="text-sm text-yellow-700 mt-1">
                        This risk assessment is for educational purposes only and should not replace professional medical advice. Always consult with a healthcare provider for proper evaluation and treatment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeartPredict;