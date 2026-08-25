import "./globals.css";

export const metadata = {
  title: "AEON PPM Training",
  description: "PPM Training Web App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
