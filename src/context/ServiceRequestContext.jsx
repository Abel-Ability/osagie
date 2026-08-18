import React, { createContext, useContext, useState, useCallback } from 'react';

const ServiceRequestContext = createContext(null);

export function useServiceRequest() {
  return useContext(ServiceRequestContext);
}

export function ServiceRequestProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ServiceRequestContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ServiceRequestContext.Provider>
  );
}
