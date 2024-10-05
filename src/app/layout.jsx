import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "./components/QueryProvider"; // Import the client-side QueryProvider

// Initialize fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Chisme-Client",
  description: "Chisme Social media app Client",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <header className="my-10 text-center">Chisme Social</header>

        {/* Main content area should expand to fill available space */}
        <QueryProvider>
          <main className="flex-grow">{children}</main> {/* Allow main to grow */}
        </QueryProvider>

        {/* Footer stays at the bottom */}
        <footer className="mt-auto my-10 text-center">&copy; Panoramix</footer>
      </body>
    </html>
  );
}
