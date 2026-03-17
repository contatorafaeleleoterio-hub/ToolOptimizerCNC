import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { SettingsPage } from './pages/settings-page';
import { HistoryPage } from './pages/history-page';
import { MobilePage } from './pages/mobile-page';
import { ViewportRedirect } from './components/viewport-redirect';
import './index.css';

const ArchitecturePage = lazy(() => import('./pages/architecture-page'));

// Admin area — lazy loaded so it doesn't impact main bundle
const AdminLayout = lazy(() =>
  import('./admin/layout/admin-layout').then((m) => ({ default: m.AdminLayout }))
);
const AdminDashboardPage = lazy(() => import('./admin/pages/admin-dashboard-page'));
const AdminTasksPage     = lazy(() => import('./admin/pages/admin-tasks-page'));
const AdminInboxPage     = lazy(() => import('./admin/pages/admin-inbox-page'));
const AdminErrorsPage    = lazy(() => import('./admin/pages/admin-errors-page'));
const AdminUsagePage     = lazy(() => import('./admin/pages/admin-usage-page'));
const AdminAnalyticsPage = lazy(() => import('./admin/pages/admin-analytics-page'));
const AdminFlagsPage     = lazy(() => import('./admin/pages/admin-flags-page'));
const AdminChangelogPage = lazy(() => import('./admin/pages/admin-changelog-page'));
const AdminHealthPage    = lazy(() => import('./admin/pages/admin-health-page'));

const AdminFallback = <div className="min-h-screen bg-[#0F1419]" />;

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
        <Route
          path="/architecture"
          element={
            <Suspense fallback={<div className="min-h-screen bg-background-dark" />}>
              <ArchitecturePage />
            </Suspense>
          }
        />
        {/* Admin area */}
        <Route
          path="/admin"
          element={
            <Suspense fallback={AdminFallback}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route index element={<Suspense fallback={AdminFallback}><AdminDashboardPage /></Suspense>} />
          <Route path="tasks"     element={<Suspense fallback={AdminFallback}><AdminTasksPage /></Suspense>} />
          <Route path="inbox"     element={<Suspense fallback={AdminFallback}><AdminInboxPage /></Suspense>} />
          <Route path="errors"    element={<Suspense fallback={AdminFallback}><AdminErrorsPage /></Suspense>} />
          <Route path="usage"     element={<Suspense fallback={AdminFallback}><AdminUsagePage /></Suspense>} />
          <Route path="analytics" element={<Suspense fallback={AdminFallback}><AdminAnalyticsPage /></Suspense>} />
          <Route path="flags"     element={<Suspense fallback={AdminFallback}><AdminFlagsPage /></Suspense>} />
          <Route path="changelog" element={<Suspense fallback={AdminFallback}><AdminChangelogPage /></Suspense>} />
          <Route path="health"    element={<Suspense fallback={AdminFallback}><AdminHealthPage /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
