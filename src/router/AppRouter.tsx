import { BrowserRouter as Router, Route, Routes } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Flow from "../components/Home/Flow";
import Charts from "../components/Charts/Charts";
import "../App.css";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Flow />} />
          <Route path="/charts" element={<Charts />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
