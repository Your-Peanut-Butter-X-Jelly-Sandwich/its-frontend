import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import AuthGuard from "@/common/HOCs/AuthGuard";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ITS",
  description: "ITS System",
};

function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <StoreProvider>
          <AuthGuard>
            <div className="h-screen">{children}</div>
          </AuthGuard>
        </StoreProvider>
      </body>
    </html>
  );
}

export default LocaleLayout;
