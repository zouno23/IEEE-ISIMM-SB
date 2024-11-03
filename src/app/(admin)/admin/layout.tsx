import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "IEEE ISIMM SB | Admin Dashboard",
  description: "The best website for the best student branch",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
