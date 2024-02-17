import type { Metadata } from "next";
import HeaderStudent from "@/components/Header/HeaderStudent";

export const metadata: Metadata = {
  title: "ITS Students",
  description: "ITS Students",
};

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderStudent />
      {children}
    </>
  );
}
