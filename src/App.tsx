import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Dashboard from "@/components/dashboard";
import Cases from "@/components/cases";
import Upload from "@/components/upload";
import Settings from "@/components/settings";
import Help from "@/components/help";
import JudgmentDetail from "./components/judgment-detail";
import "./App.css";

export default function App() {

  return (
    <Router>
      <div className="flex h-screen flex-col bg-background">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/cases" element={<Cases />} />
                <Route path="/cases/:id" element={<JudgmentDetail />} />
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
