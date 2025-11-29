/**
 * Main App Component
 * Integrates all modules with routing and navigation.
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navigation/Navbar';
import { MobileNav } from './components/navigation/MobileNav';

// Pages
import { Home } from './pages/Home';
import { Helplines, ChatSupport, Donations, Resources } from './pages/emergency';
import { SafetySettings } from './pages/settings';

// Placeholder pages (to be created by Person B & C or imported)
import { LessonsPage } from './pages/lessons/LessonsPage';
import { ReportPage } from './pages/report/ReportPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        
        <main className="app__main">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />
            
            {/* Digital Literacy (Person B) */}
            <Route path="/literacy" element={<LessonsPage />} />
            <Route path="/literacy/lesson/:id" element={<LessonsPage />} />
            
            {/* Anonymous Reporting (Person C) */}
            <Route path="/report" element={<ReportPage />} />
            
            {/* Emergency Hub (Person D) */}
            <Route path="/emergency/helplines" element={<Helplines />} />
            <Route path="/emergency/chat" element={<ChatSupport />} />
            <Route path="/emergency/donations" element={<Donations />} />
            <Route path="/emergency/resources" element={<Resources />} />
            
            {/* Safety Settings (Person E) */}
            <Route path="/settings" element={<SafetySettings />} />
            <Route path="/settings/safety" element={<SafetySettings />} />
            
            {/* Emergency Hub Default */}
            <Route path="/emergency" element={<Helplines />} />
          </Routes>
        </main>
        
        <MobileNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
