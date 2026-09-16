import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AILab from "./pages/AILab";
import Architecture from "./pages/Architecture";
import ImpactAndCost from "./pages/ImpactAndCost";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-lab" element={<AILab />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/impact-and-cost" element={<ImpactAndCost />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
