import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "./Header";
import GlobalRouteGuard from "../components/GlobalRouteGuard"; // Adjust path
export const metadata = {
  title: "CS³ | Interactive Visualizer",
  description: "Advanced Computer Science 3D Visualizer",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}
    >
      <body className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 selection:bg-blue-500 selection:text-white">
        <Header />
        <main className="flex-1 relative overflow-hidden bg-slate-950">
          {/* Automatically gates every route dynamically */}
          <GlobalRouteGuard>{children}</GlobalRouteGuard>
        </main>
      </body>
    </html>
  );
}
