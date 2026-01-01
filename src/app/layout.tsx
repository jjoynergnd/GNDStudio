import "../globals.css";
import { ReactNode } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { ProjectProvider } from "../context/ProjectContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900">
        <ProjectProvider>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-y-auto">
              <Header />
              <main className="px-8 pt-4 pb-8">{children}</main>
            </div>
          </div>
        </ProjectProvider>
      </body>
    </html>
  );
}
