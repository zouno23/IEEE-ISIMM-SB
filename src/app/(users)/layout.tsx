import { FindOrCreateUser } from "@/actions/user";
import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { cache } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideBar } from "./_components/SideBar";

export const metadata: Metadata = {
  title: "IEEE ISIMM SB | User Interface",
  description: "The best website for the best student branch",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const pathManager = async () => {
  const user = await FindOrCreateUser();
  if (!user) redirect("/");
  else if (user.role === "SB_CHAIR") redirect("/admin");
  else if (user.role === "CHAPTER_CHAIR") redirect("/chapter");
};
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // to change to a webhook
  // await cache(pathManager)();
  return (
    <SidebarProvider>
      <SideBar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
