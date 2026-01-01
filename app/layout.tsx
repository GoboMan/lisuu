import "./globals.css";
import Sidebar from "@/components/layout/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="ja">
      <body>
        <div className="flex flex-row min-h-screen">
          { /**** sidebar ****/ }
          <Sidebar />

          { /**** content ****/ }
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}