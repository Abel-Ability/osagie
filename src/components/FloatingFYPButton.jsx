import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Send, ClipboardList } from "lucide-react";
import { useServiceRequest } from "@/context/ServiceRequestContext";

export default function FloatingFYPButton() {
  const { open } = useServiceRequest();

  const buttonClass =
    "bg-gold text-navy inline-flex items-center gap-2 sm:px-4 sm:py-2.5 text-sm font-semibold rounded-full shadow-lg hover:shadow-xl opacity-80 hover:opacity-100 transition-all whitespace-nowrap cursor-pointer";

  return (
    <div
      className="z-50 fixed top-1/2 right-3 sm:right-4 -translate-y-1/2 flex flex-col items-end gap-2 sm:gap-2.5"
      style={{ maxWidth: "calc(100vw - 1.5rem)" }}
    >
      <Link to="/software" className={buttonClass}>
        <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        <span className="hidden sm-inline">Uniabuja Student Tools</span>
      </Link>
      <button type="button" onClick={open} className={buttonClass}>
        <Send className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        <span className="hidden sm-inline">Request a Service</span>
      </button>
      <button type="button" onClick={open} className={buttonClass}>
        <ClipboardList className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
        <span className="hidden sm-inline">Register Interest</span>
      </button>
    </div>
  );
}