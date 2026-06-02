// src/app/layout.tsx
import type { Metadata } from "next";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Hackathon Isyone - Daniel Mantilha",
  description: "Criado por Daniel Mantilha",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-zinc-950 text-zinc-50">
        {/* O AuthProvider isola o Contexto de cliente sem quebrar o Server Component do Layout */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}