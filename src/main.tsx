import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { SettingsPage } from './pages/settings-page';
import { HistoryPage } from './pages/history-page';
import { MobilePage } from './pages/mobile-page';
import { ViewportRedirect } from './components/viewport-redirect';
import './index.css';

const baseUrl = import.meta.env.BASE_URL || '/ToolOptimizerCNC/';
const basename = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename || '/'}>
      <ViewportRedirect />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mobile" element={<MobilePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
