import { useState } from "react";
import { 
    Plus, 
    X, 
    Search, 
    Stethoscope, 
    Brain, 
    AlertCircle, 
    Activity, 
    Apple, 
    Pill, 
    Dumbbell, 
    Shield, 
    ChevronRight, 
    FileText 
} from "lucide-react";
import { SYMPTOMS } from "../data/symptoms";
import { predictDiseaseFromSymptoms } from "../api";

// const predictDiseaseFromSymptoms = async (symptoms) => {
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     return {
//         predictions: [
//             {
//                 disease: "Cervical spondylosis",
//                 confidence: 0.08,
//                 percentage: 7.95,
//                 description: "Cervical spondylosis is a degenerative condition of the cervical spine.",
//                 diet: "Anti-inflammatory foods, Omega-3-rich foods, Fruits and vegetables, Whole grains",
//                 medication: "Pain relievers, Muscle relaxants, Physical therapy, Neck braces, Corticosteroids",
//                 precautions: [
//                     "use heating pad or cold pack",
//                     "exercise",
//                     "take otc pain reliver",
//                     "consult doctor"
//                 ],
//                 workout: "Include anti-inflammatory foods"
//             },
//             {
//                 disease: "Dimorphic hemmorhoids(piles)",
//                 confidence: 0.075,
//                 percentage: 7.5,
//                 description: "Dimorphic hemmorhoids(piles) is a condition characterized by swollen blood vessels in the rectum.",
//                 diet: "High-Fiber Diet, Hydration, Warm baths, Stool softeners",
//                 medication: "Nitroglycerin, Aspirin, Beta-blockers, Calcium channel blockers, Thrombolytic drugs",
//                 precautions: [
//                     "avoid fatty spicy food",
//                     "consume witch hazel",
//                     "warm bath with epsom salt",
//                     "consume alovera juice"
//                 ],
//                 workout: "Consume high-fiber foods"
//             },
//             {
//                 disease: "Gastroenteritis",
//                 confidence: 0.057,
//                 percentage: 5.66,
//                 description: "Gastroenteritis is an inflammation of the stomach and intestines, typically caused by a virus or bacteria.",
//                 diet: "Bland Diet, Bananas, Rice, Applesauce, Toast",
//                 medication: "Antibiotics, Antiemetic drugs, Antidiarrheal drugs, IV fluids, Probiotics",
//                 precautions: [
//                     "stop eating solid food for while",
//                     "try taking small sips of water",
//                     "rest",
//                     "ease back into eating"
//                 ],
//                 workout: "Stay hydrated"
//             }
//         ]
//     };
// };

const DiseasePredict = () => {
    const [symptomInput, setSymptomInput] = useState("");
    const [symptomList, setSymptomList] = useState([]);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAll, setShowAll] = useState(false);
    const [error, setError] = useState(null);

    const handleAddSymptom = () => {
        if (symptomInput.trim() && !symptomList.includes(symptomInput.trim())) {
            setSymptomList([...symptomList, symptomInput.trim()]);
            setSymptomInput("");
            setSearchQuery("");
        }
    };

    const handleRemoveSymptom = (symptom) => {
        setSymptomList(symptomList.filter((s) => s !== symptom));
    };

    const handleSubmit = async () => {
        if (symptomList.length === 0) return;

        setLoading(true);
        setResults(null);
        setError(null);

        try {
            const response = await predictDiseaseFromSymptoms(symptomList);
            console.log("API Response:", response);
            
            // Handle different response structures
            if (response && response.predictions && Array.isArray(response.predictions)) {
                setResults(response.predictions);
            } else if (Array.isArray(response)) {
                setResults(response);
            } else {
                console.error("Unexpected response structure:", response);
                setError("Unexpected response format from server");
                setResults([]);
            }
        } catch (error) {
            console.error("Prediction failed:", error);
            setError(error.message || "Failed to get prediction from server");
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const getConfidenceColor = (percentage) => {
        if (percentage >= 80) return "from-green-500 to-green-600";
        if (percentage >= 60) return "from-yellow-500 to-orange-500";
        return "from-red-500 to-red-600";
    };

    const getConfidenceTextColor = (percentage) => {
        if (percentage >= 80) return "text-green-600";
        if (percentage >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    const handleSymptomSelect = (symptom) => {
        if (!symptomList.includes(symptom)) {
            setSymptomList([...symptomList, symptom]);
        }
        setSearchQuery("");
        setSymptomInput("");
    };

    const filteredSymptoms = SYMPTOMS.filter(
        (symptom) =>
            symptom.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !symptomList.includes(symptom)
    );

    // Helper function to parse string arrays from backend
    const parseStringArray = (str) => {
        if (Array.isArray(str)) return str;
        if (typeof str === 'string') {
            // Try to parse as JSON array first
            try {
                const parsed = JSON.parse(str);
                if (Array.isArray(parsed)) return parsed;
            } catch (e) {
                // If not JSON, treat as comma-separated string
                return str.split(',').map(item => item.trim().replace(/^['"]|['"]$/g, ''));
            }
        }
        return [str];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg mb-4">
                        <Brain className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                        AI Symptom Checker
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Advanced medical AI for preliminary disease diagnosis based on symptoms
                    </p>
                </div>

                {/* Symptom Input Card */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex items-center mb-6">
                        <Search className="w-6 h-6 text-blue-600 mr-3" />
                        <h2 className="text-2xl font-bold text-slate-800">Enter Your Symptoms</h2>
                    </div>

                    {/* Input Section */}
                    <div className="space-y-4">
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white/70"
                                    placeholder="Enter a symptom (e.g., headache, fever, cough)"
                                    value={symptomInput}
                                    onChange={(e) => {
                                        setSymptomInput(e.target.value);
                                        setSearchQuery(e.target.value);
                                    }}
                                    onKeyDown={(e) => e.key === "Enter" && handleAddSymptom()}
                                />
                                
                                {/* Filtered Suggestions */}
                                {searchQuery.length > 0 && filteredSymptoms.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 bg-white border rounded-lg p-3 max-h-40 overflow-y-auto mt-2 shadow-md z-10">
                                        {filteredSymptoms.map((symptom, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => handleSymptomSelect(symptom)}
                                                className="cursor-pointer px-2 py-1 hover:bg-blue-100 rounded text-sm text-gray-700"
                                            >
                                                {symptom.replaceAll("_", " ")}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            </div>
                            
                            {/* <button
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                                onClick={handleAddSymptom}
                            >
                                <Plus className="w-4 h-4" />
                                Add
                            </button> */}
                        </div>

                        {/* Show All Symptoms Toggle */}
                        <div className="text-right">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                {showAll ? "Hide Symptoms List" : "See All Symptoms"}
                            </button>
                        </div>

                        {/* All Symptoms Grid */}
                        {showAll && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-4 bg-white rounded-lg border shadow-inner max-h-[300px] overflow-y-auto">
                                {SYMPTOMS.map((symptom, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSymptomSelect(symptom)}
                                        className="px-3 py-2 text-sm bg-slate-100 rounded hover:bg-blue-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={symptomList.includes(symptom)}
                                    >
                                        {symptom.replaceAll("_", " ")}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Symptom Tags */}
                    {symptomList.length > 0 && (
                        <div className="space-y-3 mt-6">
                            <h3 className="text-lg font-semibold text-slate-700">Selected Symptoms:</h3>
                            <div className="flex flex-wrap gap-2">
                                {symptomList.map((symptom, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm flex items-center gap-2 border border-blue-200 hover:bg-blue-200 transition-colors duration-200"
                                    >
                                        <Activity className="w-3 h-3" />
                                        {symptom}
                                        <button
                                            onClick={() => handleRemoveSymptom(symptom)}
                                            className="ml-1 p-0.5 hover:bg-blue-300 rounded-full transition-colors duration-200"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center mt-8">
                        <button
                            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
                            onClick={handleSubmit}
                            disabled={loading || symptomList.length === 0}
                        >
                            <div className="flex items-center space-x-2">
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Analyzing Symptoms...</span>
                                    </>
                                ) : (
                                    <>
                                        <Stethoscope className="w-5 h-5" />
                                        <span>Analyze Symptoms</span>
                                    </>
                                )}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                        <div className="flex items-start">
                            <AlertCircle className="w-6 h-6 text-red-600 mr-3 mt-0.5" />
                            <div>
                                <p className="text-sm text-red-800 font-medium mb-2">Error</p>
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Section */}
                {results && results.length > 0 && (
                    <div className="space-y-6">
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8">
                            <div className="flex items-center mb-6">
                                <FileText className="w-6 h-6 text-indigo-600 mr-3" />
                                <h2 className="text-2xl font-bold text-slate-800">Diagnosis Results</h2>
                            </div>

                            <div className="space-y-6">
                                {results.map((result, idx) => (
                                    <div 
                                        key={idx} 
                                        className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-200"
                                    >
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                                                    {idx + 1}
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-800">{result.disease}</h3>
                                            </div>
                                            <div className="flex items-center">
                                                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getConfidenceTextColor(result.percentage)} bg-white/70`}>
                                                    {result.percentage}% confidence
                                                </div>
                                            </div>
                                        </div>

                                        {/* Confidence Bar */}
                                        <div className="mb-4">
                                            <div className="w-full bg-slate-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full bg-gradient-to-r ${getConfidenceColor(result.percentage)} transition-all duration-500`}
                                                    style={{ width: `${result.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                            <div className="flex items-start">
                                                <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                                                <div>
                                                    <h4 className="font-semibold text-slate-800 mb-1">Description</h4>
                                                    <p className="text-slate-600 text-sm">{result.description}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Recommendations Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Diet */}
                                            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                                                <div className="flex items-start">
                                                    <Apple className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-semibold text-green-800 mb-2">Dietary Recommendations</h4>
                                                        <p className="text-green-700 text-sm">{result.diet}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Medication */}
                                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                                <div className="flex items-start">
                                                    <Pill className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-semibold text-blue-800 mb-2">Medication</h4>
                                                        <p className="text-blue-700 text-sm">{result.medication}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Workout */}
                                            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                                                <div className="flex items-start">
                                                    <Dumbbell className="w-5 h-5 text-orange-600 mr-2 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-semibold text-orange-800 mb-2">Exercise Guidelines</h4>
                                                        <p className="text-orange-700 text-sm">{result.workout}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Precautions */}
                                            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                                                <div className="flex items-start">
                                                    <Shield className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                                                    <div>
                                                        <h4 className="font-semibold text-red-800 mb-2">Precautions</h4>
                                                        <div className="space-y-1">
                                                            {result.precautions && result.precautions.length > 0 ? (
                                                                result.precautions.map((precaution, i) => (
                                                                    <div key={i} className="flex items-center text-sm text-red-700">
                                                                        <ChevronRight className="w-3 h-3 mr-1" />
                                                                        {precaution}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <p className="text-red-700 text-sm">No specific precautions noted</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Medical Disclaimer */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                            <div className="flex items-start">
                                <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                    <span className="text-yellow-700 text-sm font-bold">!</span>
                                </div>
                                <div>
                                    <p className="text-sm text-yellow-800 font-medium mb-2">Important Medical Disclaimer</p>
                                    <p className="text-sm text-yellow-700">
                                        This AI symptom checker is for educational and informational purposes only. It should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay seeking it because of something you have read here.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* No Results Message */}
                {results && results.length === 0 && !loading && (
                    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center">
                        <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Results Found</h3>
                        <p className="text-gray-500">
                            Unable to find any disease predictions for the selected symptoms. Please try different symptoms or consult a healthcare professional.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiseasePredict;