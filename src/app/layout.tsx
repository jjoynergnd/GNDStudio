import "../globals.css";
import { ReactNode } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900">
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-y-auto">
            <Header />
            <main className="p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
