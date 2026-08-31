import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "./Header";
import GlobalRouteGuard from "../components/GlobalRouteGuard";
import AuthProvider from "../components/AuthProvider";

export const metadata = {
  title: "CS³ | Interactive Visualizer",
  description: "Advanced Computer Science & AI Visualizer",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}
    >
      <body
        suppressHydrationWarning
        className="flex h-screen w-screen flex-col overflow-hidden bg-slate-950 selection:bg-cyan-500 selection:text-white"
      >
        <AuthProvider>
          <Header />

          <main className="relative flex-1 overflow-hidden bg-slate-950">
            <GlobalRouteGuard>{children}</GlobalRouteGuard>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
