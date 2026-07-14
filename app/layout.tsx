import { AuthProvider } from "@/lib/auth/auth-context";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";

export const metadata: Metadata = {
  title: "Pizza Town Sukkur — Best Pizza & Burgers",
  description: "Order online from Pizza Town Sukkur. 16 pizza flavours, loaded burgers, deals. Free home delivery.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased">
  <AuthProvider>
    <Navbar />
    <main>{children}</main>
    <Footer />
    <CartDrawer />
  </AuthProvider>
</body>
    </html>
  );
}
