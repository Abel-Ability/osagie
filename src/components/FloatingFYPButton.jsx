import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Send, ClipboardList } from "lucide-react";
import { useServiceRequest } from "@/context/ServiceRequestContext";

export default function FloatingFYPButton() {
  const { open } = useServiceRequest();

  const buttonClass =
    "bg-gold text-navy inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-full shadow-lg hover:shadow-xl opacity-80 hover:opacity-100 transition-all whitespace-nowrap cursor-pointer";

  return (
    <div
      className="z-50 fixed top-1/2 right-3 sm:right-4 -translate-y-1/2 flex flex-col items-end gap-2 sm:gap-2.5"
      style={{ maxWidth: "calc(100vw - 1.5rem)" }}
    >
      <Link to="/software" className={buttonClass}>
        <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
        <span className="truncate">Uniabuja Student Tools</span>
      </Link>
      <button type="button" onClick={open} className={buttonClass}>
        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
        <span className="truncate">Request a Service</span>
      </button>
      <button type="button" onClick={open} className={buttonClass}>
        <ClipboardList className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
        <span className="truncate">Register Interest</span>
      </button>
    </div>
  );
}