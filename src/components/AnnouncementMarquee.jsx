import React, { useState, useEffect } from "react";

const SHEET_ID = "1XVtPducoN5a5G3urICKX7v9GocdG1ApcztJOioDyXdw";
const SHEET_TAB = "Announcements";
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_TAB)}`;

// Columns: active | title | body | category | publishedat | link
// Set active to "no" / "false" / "0" to hide a row without deleting it.
// Optional "link" column: URL to open when the announcement is clicked.

function isDark() {
  return document.documentElement.classList.contains("dark");
}

function isEnabled(value) {
  const v = (value || "").trim().toLowerCase();
  return v === "" || v === "yes" || v === "true" || v === "1";
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        row.push(field);
        field = "";
      } else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++;
        row.push(field);
        field = "";
        rows.push(row);
        row = [];
      } else {
        field += ch;
      }
    }
  }
  row.push(field);
  if (row.some((f) => f.trim() !== "")) rows.push(row);
  return rows;
}

function MarqueeItem({ item, dark }) {
  const navy = dark ? "hsl(222 20% 85%)" : "hsl(222 47% 20%)";
  const navyMuted = dark ? "hsl(222 20% 70%)" : "hsl(222 47% 20% / 0.7)";
  const badgeBg = dark ? "hsl(222 20% 25%)" : "hsl(222 47% 20%)";
  const badgeFg = dark ? "hsl(45 93% 58%)" : "hsl(142 70% 35%)";

  const Tag = item.link ? "a" : "span";
  const linkProps = item.link
    ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Tag
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        whiteSpace: "nowrap",
        flexShrink: 0,
        textDecoration: "none",
        cursor: item.link ? "pointer" : "default",
        borderRadius: "6px",
        padding: "2px 4px",
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) => {
        if (item.link) e.currentTarget.style.background = dark ? "hsl(142 40% 25%)" : "hsl(45 93% 75%)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
      {...linkProps}
    >
      <span
        style={{
          borderRadius: "9999px",
          background: badgeBg,
          color: badgeFg,
          padding: "3px 12px",
          fontSize: "12px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          lineHeight: 1.6,
        }}
      >
        {item.category}
      </span>
      <span
        style={{
          fontWeight: 600,
          fontSize: "15px",
          lineHeight: 1,
          color: navy,
        }}
      >
        {item.title}
      </span>
      <span
        style={{
          fontSize: "14px",
          color: navyMuted,
        }}
      >
        {item.body}
      </span>
      {item.link && (
        <span
          style={{
            fontSize: "12px",
            fontWeight: 600,
            color: dark ? "hsl(45 93% 58%)" : "hsl(142 70% 35%)",
            marginLeft: "0.25rem",
            whiteSpace: "nowrap",
          }}
        >
          Register →
        </span>
      )}
    </Tag>
  );
}

export default function AnnouncementMarquee() {
  const [items, setItems] = useState([]);
  const [darkMode, setDarkMode] = useState(isDark());

  useEffect(() => {
    let cancelled = false;
    fetch(SHEET_URL, { cache: "no-store" })
      .then((res) => (res.ok ? res.text() : null))
      .then((csv) => {
        if (cancelled || !csv) return;
        const rows = parseCsv(csv);
        if (rows.length < 2) return;
        const headers = rows[0].map((h) => h.trim().toLowerCase());
        const activeIdx = headers.indexOf("active");
        const titleIdx = headers.indexOf("title");
        const bodyIdx = headers.indexOf("body");
        const categoryIdx = headers.indexOf("category");
        const linkIdx = headers.indexOf("link");
        if (titleIdx === -1) return;
        const parsed = rows
          .slice(1)
          .filter((r) => activeIdx === -1 || isEnabled(r[activeIdx]))
          .map((r, i) => ({
            id: `sheet-${i}`,
            title: r[titleIdx] || "",
            body: r[bodyIdx] || "",
            category: r[categoryIdx] || "Announcement",
            link: linkIdx !== -1 ? (r[linkIdx] || "").trim() : "",
          }))
          .filter((item) => item.title.trim() !== "");
        if (!cancelled) setItems(parsed);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => setDarkMode(isDark()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  const duration = Math.max(items.length * 12, 40);
  const bgColor = darkMode ? "hsl(142 40% 18%)" : "hsl(45 93% 85%)";
  const height = darkMode ? "40px" : "38px";

  return (
    <>
      <style>{`@keyframes marquee-rtl{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <div
        style={{
          background: bgColor,
          overflow: "hidden",
          height,
        }}
      >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          width: "max-content",
          animation: `marquee-rtl ${duration}s linear infinite`,
          willChange: "transform",
          maskImage:
            "linear-gradient(to right, transparent, black 2.5%, black 97.5%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 2.5%, black 97.5%, transparent)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.animationPlayState = "paused")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.animationPlayState = "running")
        }
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            gap: "1.5rem",
            paddingRight: "1.5rem",
          }}
        >
          {items.map((item) => (
            <MarqueeItem key={item.id} item={item} dark={darkMode} />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            gap: "1.5rem",
            paddingRight: "1.5rem",
          }}
          aria-hidden="true"
        >
          {items.map((item) => (
            <MarqueeItem key={`${item.id}-copy`} item={item} dark={darkMode} />
          ))}
        </div>
      </div>
      </div>
    </>
  );
}
