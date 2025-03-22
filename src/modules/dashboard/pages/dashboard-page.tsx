'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

import { Separator } from '@/shared/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import { AppHeader } from '@/shared/layouts/app-header';
import { ContentLayout } from '@/shared/layouts/content-layout';

import { Dashboard } from '../components/dashboard';
import { DashboardHeader } from '../components/dashboard-header';
import { DashboardSidebar } from '../components/dashboard-sidebar';

export const DashboardPage = () => {
  useEffect(() => {
    // Show welcome toast when dashboard loads
    toast.success('Welcome to your dashboard!', {
      description: 'Your interactive dashboard is ready',
      duration: 5000
    });
  }, []);

  return (
    <ContentLayout>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <AppHeader>
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DashboardHeader />
          </AppHeader>
          <div className="flex flex-col gap-4 p-2 h-max max-h-[calc(100vh-4rem)] overflow-auto">
            <Dashboard />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ContentLayout>
  );
};
