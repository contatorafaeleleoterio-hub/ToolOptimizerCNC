/**
 * AdminLayout — root layout for all /admin/* routes
 * Sidebar + header + main content area via <Outlet />
 */

import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './admin-sidebar';
import { AdminHeader } from './admin-header';

export function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0F1419] text-white">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <AdminHeader />
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
