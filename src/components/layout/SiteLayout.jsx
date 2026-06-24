import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import HireMeModal from './HireMeModal';
import { useTheme } from '@/hooks/useTheme';

export default function SiteLayout() {
  const { isDark, toggle } = useTheme();
  const [hireOpen, setHireOpen] = useState(false);
  const [prefillService, setPrefillService] = useState('');

  const openHireMe = (service = '') => {
    setPrefillService(service);
    setHireOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isDark={isDark} toggleTheme={toggle} onHireMe={() => openHireMe()} />
      <main className="flex-1 pt-16">
        <Outlet context={{ openHireMe }} />
      </main>
      <Footer />
      <HireMeModal open={hireOpen} onOpenChange={setHireOpen} prefillService={prefillService} />
    </div>
  );
}