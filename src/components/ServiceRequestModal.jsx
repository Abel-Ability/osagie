import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const GAS_URL = "https://script.google.com/macros/s/AKfycbxgcL7dRlv4jptQOI7vh84IDnOxdBrm9racmGd5ThHLYsrQCxn1e2oPpTwo8mkc1T3f/exec?embed=true";

export default function ServiceRequestModal({ isOpen, onClose }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (iframeRef.current) iframeRef.current.src = "about:blank";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-card w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[85vh] max-md:h-[95vh]">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-navy">
          <h3 className="font-heading font-bold text-base md:text-lg text-gold">
            Service &amp; Training Request
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        <iframe
          ref={iframeRef}
          src={GAS_URL}
          className="flex-1 w-full border-0"
          title="Service and Training Request Form"
        />
      </div>
    </div>
  );
}
