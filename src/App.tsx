import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Dashboard from "@/pages/dashboard";
import Judgments from "@/pages/judgments";
import Upload from "@/pages/upload";
import Settings from "@/pages/settings";
import Help from "@/pages/help";
import JudgmentDetail from "./pages/judgment-detail";
import "./App.css";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen flex-col bg-background">
        <Header onMenuClick={() => setSidebarOpen((prev) => !prev)} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/judgments" element={<Judgments />} />
                <Route path="/judgments/:id" element={<JudgmentDetail />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help" element={<Help />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}
