/**
 * Main App Component
 * Integrates all modules with routing and navigation.
 * Refactored for performance with code splitting (lazy loading).
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navigation/Navbar';
import { MobileNav } from './components/navigation/MobileNav';
import { Footer } from './components/navigation/Footer';
import { GlobalEmergencyLayer } from './components/emergency/GlobalEmergencyLayer.jsx';
import { ReportSessionProvider } from './components/report/sessionContext.jsx';
import { LoadingSpinner } from './components/common/LoadingSpinner/LoadingSpinner';
import './App.css';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const LessonsPage = lazy(() => import('./pages/lessons/LessonsPage').then(module => ({ default: module.LessonsPage })));
const LessonDetail = lazy(() => import('./pages/lessons/LessonDetail').then(module => ({ default: module.LessonDetail })));
const ReportPage = lazy(() => import('./pages/report/ReportPage').then(module => ({ default: module.ReportPage })));

// Emergency Pages
const Helplines = lazy(() => import('./pages/emergency/Helplines').then(module => ({ default: module.Helplines })));
const ChatSupport = lazy(() => import('./pages/emergency/ChatSupport').then(module => ({ default: module.ChatSupport })));
const Donations = lazy(() => import('./pages/emergency/Donations').then(module => ({ default: module.Donations })));
const Resources = lazy(() => import('./pages/emergency/Resources').then(module => ({ default: module.Resources })));

// Settings Pages
const SafetySettings = lazy(() => import('./pages/settings/SafetySettings').then(module => ({ default: module.SafetySettings })));

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <main className="app__main">
          <ReportSessionProvider>
            <Suspense fallback={
              <div className="app__loading">
                <LoadingSpinner size="lg" label="Loading..." />
              </div>
            }>
              <Routes>
                {/* Home */}
                <Route path="/" element={<Home />} />

                {/* Digital Literacy */}
                <Route path="/literacy" element={<LessonsPage />} />
                <Route path="/literacy/lesson/:id" element={<LessonDetail />} />
                <Route path="/lessons" element={<LessonsPage />} />
                <Route path="/lessons/:id" element={<LessonDetail />} />

                {/* Anonymous Reporting */}
                <Route path="/report" element={<ReportPage />} />

                {/* Emergency Hub */}
                <Route path="/emergency/helplines" element={<Helplines />} />
                <Route path="/emergency/chat" element={<ChatSupport />} />
                <Route path="/emergency/donations" element={<Donations />} />
                <Route path="/emergency/resources" element={<Resources />} />

                {/* Safety Settings */}
                <Route path="/settings" element={<SafetySettings />} />
                <Route path="/settings/safety" element={<SafetySettings />} />

                {/* Emergency Hub Default */}
                <Route path="/emergency" element={<Helplines />} />
              </Routes>
            </Suspense>
          </ReportSessionProvider>
        </main>

        <Footer />
        <MobileNav />
        <GlobalEmergencyLayer />
      </div>
    </BrowserRouter>
  );
}

export default App;
