"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="mb-6 text-sm" style={{ color: "#8c7180" }} aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5">
        <li>
          <Link
            href="/"
            className="transition-colors"
            style={{ color: "#8c7180" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f8eef3")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8c7180")}
          >
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span>/</span>
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors"
                style={{ color: "#8c7180" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#f8eef3")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8c7180")}
              >
                {item.label}
              </Link>
            ) : (
              <span style={{ color: "#f8eef3" }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
