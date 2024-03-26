import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Equinox-IIITL info",
  description: "Information about the event of the Equinox IIITL",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
