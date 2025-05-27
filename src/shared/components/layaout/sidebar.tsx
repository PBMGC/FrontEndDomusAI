import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/user.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Book,
  Car,
  ChevronUp,
  ChevronDown,
  Home,
  Inbox,
  User2,
  Calendar
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ModeToggle } from "../modeToggle/mode-toggle";

const items = [
  {
    title: "Inicio",
    icon: Home,
    path: "/app/inicio",
  },
  {
    title: "Inventario",
    icon: Inbox,
    path: "/app/inventario",
  },
  {
    title: "Movimientos",
    icon: Car,
    subItems: [
      { title: "Movimientos", icon: Car, path: "/app/movimientos" },
      { title: "Vencimientos", icon: Calendar, path: "/app/vencimientos" },
      { title: "Reportes", icon: Book, path: "/app/reportes" },
    ],
  }
];

export const SidebarP = () => {
  const user = useAuthStore((state) => state.user);
  const [movimientosOpen, setMovimientosOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    useAuthStore.getState().logout();
    navigate("/");
  };

  return (
    <Sidebar className="shadow-md">
      <SidebarHeader className="flex justify-between items-center px-4 py-3 text-lg font-semibold border-b">
        APP GESTIÓN <ModeToggle />
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                if (item.subItems) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => setMovimientosOpen(!movimientosOpen)}
                        className="flex items-center justify-between w-full"
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </div>
                        {movimientosOpen ? <ChevronUp /> : <ChevronDown />}
                      </SidebarMenuButton>

                      {movimientosOpen && (
                        <ul className="ml-6 mt-2 flex flex-col gap-1 transition-all">
                          {item.subItems.map((sub) => (
                            <SidebarMenuItem key={sub.title}>
                              <SidebarMenuButton asChild>
                                <Link
                                  to={sub.path}
                                  className="flex items-center gap-2 px-2 py-1 hover:bg-accent rounded-md"
                                >
                                  <sub.icon className="w-4 h-4" />
                                  <span>{sub.title}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </ul>
                      )}
                    </SidebarMenuItem>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.path}
                        className="flex items-center gap-2 px-2 py-1 hover:bg-accent rounded-md"
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex items-center gap-2 w-full justify-between">
                  <div className="flex items-center gap-2">
                    <User2 className="w-5 h-5" />
                    <span className="text-sm font-medium truncate">{user?.email}</span>
                  </div>
                  <ChevronUp className="w-4 h-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-full bg-white rounded-md shadow p-1"
              >
                <DropdownMenuItem className="px-2 py-1 cursor-pointer hover:bg-accent">
                  Cuenta
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="px-2 py-1 cursor-pointer hover:bg-red-100 text-red-600"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
