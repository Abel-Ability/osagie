import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '@/hooks/useTheme';

export default function SiteLayout() {
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();

  const openHireMe = (service = '') => {
    navigate('/contact', { state: service ? { service } : undefined });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isDark={isDark} toggleTheme={toggle} onHireMe={() => openHireMe()} />
      <main className="flex-1 pt-16">
        <Outlet context={{ openHireMe }} />
      </main>
      <Footer />
    </div>
  );
}
