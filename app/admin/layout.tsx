import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/common/AdminShell";
import "./admin-theme.css";

export const metadata: Metadata = {
  title: "Pizza Town Admin",
  description: "Manage orders, menu, and operations for Pizza Town.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={
        {
          "--font-admin-display": "Arial, sans-serif",
          "--font-admin-body": "Arial, sans-serif",
          "--font-admin-mono": "monospace",
        } as React.CSSProperties
      }
    >
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
