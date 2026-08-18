import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Send, ClipboardList, X } from "lucide-react";
import { useServiceRequest } from "@/context/ServiceRequestContext";

export default function FloatingFYPButton() {
  const { open } = useServiceRequest();
  const [expanded, setExpanded] = useState(false);

  const close = () => setExpanded(false);

  return (
    <>
      {/* ===== MOBILE ===== */}
      <div
        className="z-50 md:hidden"
        style={{ position: "fixed", bottom: "1.25rem", right: "1rem" }}
      >
        {expanded && (
          <div
            className="flex flex-col items-end"
            style={{ position: "absolute", bottom: "3.5rem", right: 0, gap: "0.625rem" }}
          >
            <Link
              to="/software"
              onClick={close}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "hsl(45 93% 58%)",
                color: "hsl(222 47% 20%)",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
                fontSize: "0.75rem",
                fontWeight: 600,
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
            >
              <GraduationCap style={{ width: 16, height: 16, flexShrink: 0 }} />
              Students
            </Link>
            <button
              onClick={() => { open(); close(); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "hsl(45 93% 58%)",
                color: "hsl(222 47% 20%)",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
                fontSize: "0.75rem",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              <Send style={{ width: 16, height: 16, flexShrink: 0 }} />
              Services
            </button>
            <button
              onClick={() => { open(); close(); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "hsl(45 93% 58%)",
                color: "hsl(222 47% 20%)",
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
                fontSize: "0.75rem",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              <ClipboardList style={{ width: 16, height: 16, flexShrink: 0 }} />
              Register
            </button>
          </div>
        )}
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "hsl(45 93% 58%)",
            color: "hsl(222 47% 20%)",
            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Quick links"
        >
          {expanded ? <X style={{ width: 20, height: 20 }} /> : <GraduationCap style={{ width: 20, height: 20 }} />}
        </button>
      </div>

      {/* ===== DESKTOP ===== */}
      <div
        className="z-50 hidden md:flex md:flex-col md:items-end"
        style={{ position: "fixed", top: "50%", right: "1rem", transform: "translateY(-50%)", gap: "0.5rem" }}
      >
        <Link
          to="/software"
          className="bg-gold text-navy inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-full shadow-lg hover:shadow-xl opacity-75 hover:opacity-100 transition-all whitespace-nowrap"
        >
          Uniabuja Student Tools
        </Link>
        <button
          onClick={open}
          className="bg-gold text-navy inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-full shadow-lg hover:shadow-xl opacity-75 hover:opacity-100 transition-all whitespace-nowrap"
        >
          Request a Service
        </button>
        <button
          onClick={open}
          className="bg-gold text-navy inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-full shadow-lg hover:shadow-xl opacity-75 hover:opacity-100 transition-all whitespace-nowrap"
        >
          Register Interest
        </button>
      </div>
    </>
  );
}
