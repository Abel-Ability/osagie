import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingFYPButton from '@/components/FloatingFYPButton';
import ServiceRequestModal from '@/components/ServiceRequestModal';
import { ServiceRequestProvider, useServiceRequest } from '@/context/ServiceRequestContext';
import { useTheme } from '@/lib/ThemeProvider';

function LayoutInner() {
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();
  const { isOpen, close } = useServiceRequest();

  const openHireMe = (service = '') => {
    navigate('/contact', { state: service ? { service } : undefined });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isDark={dark} toggleTheme={toggle} onHireMe={() => openHireMe()} />
      <FloatingFYPButton />
      <main className="flex-1 pt-16">
        <Outlet context={{ openHireMe }} />
      </main>
      <Footer />
      <ServiceRequestModal isOpen={isOpen} onClose={close} />
    </div>
  );
}

export default function SiteLayout() {
  return (
    <ServiceRequestProvider>
      <LayoutInner />
    </ServiceRequestProvider>
  );
}
