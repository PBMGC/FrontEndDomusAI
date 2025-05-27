import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarP } from "./sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <SidebarP />
      <SidebarTrigger />
      <main style={{ textAlign: "center",  width:"100%", height:"100%" }}>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
