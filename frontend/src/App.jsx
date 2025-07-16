import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BreastCancerPredict from './pages/BreastCancerPredictor';
import DiabetesPredict from './pages/DiabetesPredictor';
import DiseasePredict from './pages/SymptomDiseasePredictor';
import HeartPredict from './pages/HeartDiseasePredictor';
import PredictHub from './pages/PredictHub';
import HomePage from './pages/Home';
import PneumoniaPredict from './pages/PneumoniaPredict';
import NotFoundPage from './pages/NotFound';


function App() {
  return (
    <div>

      <Navbar />
      <Routes>
        <Route path="/predict" element={<PredictHub />} />
        <Route path="/" element={<HomePage />} />

        <Route path="/predict/breast" element={<BreastCancerPredict />} />
        <Route path="/predict/diabetes" element={<DiabetesPredict />} />
        <Route path="/predict/disease" element={<DiseasePredict />} />
        <Route path="/predict/heart" element={<HeartPredict />} />
        <Route path="/predict/pneumonia" element={<PneumoniaPredict />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>

    </div>
  );
}
export default App;
