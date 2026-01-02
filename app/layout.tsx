import "./globals.css";
import Sidebar from "@/components/layout/sidebar";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <div className="flex flex-row min-h-screen">
          { /**** sidebar ****/ }
          <Sidebar />

          { /**** content ****/ }
          <main className="flex-1">
            {children}
          </main>
        </div>

        { /**** toaster ****/ }
        <Toaster richColors position="top-right" duration={2000} />
      </body>
    </html>
  );
}