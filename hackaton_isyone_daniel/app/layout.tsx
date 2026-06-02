// src/app/layout.tsx
import type { Metadata } from "next";
import { AuthProvider } from "@/components/AuthProvider";
import "./globals.css";

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
    <html lang="pt-BR" className="scroll-smooth">
      <body className="antialiased bg-zinc-950 text-zinc-50 min-h-screen flex flex-col">
        <AuthProvider>
          {/* Header com efeito glassmorphism para dar um ar moderno */}
          <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-950 flex items-center justify-center font-bold text-lg">
                  I
                </div>
                <span className="font-semibold tracking-tight text-zinc-100">
                  Isyone{" "}
                  <span className="text-zinc-500 font-normal">/ Hackathon</span>
                </span>
              </div>
            </div>
          </header>

          {/* Container principal com padding generoso para as páginas não ficarem "caindo" */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {/* O AuthProvider isola o Contexto de cliente sem quebrar o Server Component do Layout */}
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
