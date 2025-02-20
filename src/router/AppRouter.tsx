import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import "../App.css";

const Flow = lazy(() => import("../components/Home/Flow"));
const Charts = lazy(() => import("../components/Charts/Charts"));

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Suspense fallback={<div>Yükleniyor...</div>}>
          <Routes>
            <Route path="/" element={<Flow />} />
            <Route path="/charts" element={<Charts />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default AppRouter;
