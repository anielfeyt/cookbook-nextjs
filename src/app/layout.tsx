import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { createClient } from "@/services/supabase/server";

const poppins = Poppins({
  display: "swap",
  weight: ["100", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Cookbook - Recipes",
  description: "Cookbook is a platform for sharing and discovering recipes.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <html lang="en" data-theme="retro">
      <body className={`${poppins.className} antialiased`}>
        <Header user={data.user} />
        <main className="min-h-dvh mb-8 mt-20 sm:mt-32">{children}</main>
        <footer className="py-4 px-4 bg-base-200 text-center">
          &copy; Copyright {new Date(Date.now()).getFullYear()}. Developed by
          Aniel Feyt.
        </footer>
      </body>
    </html>
  );
}
