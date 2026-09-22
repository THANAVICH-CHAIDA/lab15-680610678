import { BookOpen, Calendar, Home, Settings } from "lucide-react";
import { Link, useLocation } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,

  SidebarFooter,

  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { currentUser } from "@/lib/mock-data";

const items = [
  { title: "หน้าแรก", url: "/", icon: Home },
  { title: "ลงทะเบียนเรียน", url: "/enrollment", icon: BookOpen },
  //{ title: "ตารางเรียน", url: "/schedule", icon: Calendar },
  //{ title: "ตั้งค่า", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-1 text-sm font-semibold">CPE & ISNE</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>เมนูหลัก</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* ปุ่มเมนูเปลี่ยนหน้า รองรับการไฮไลต์ปุ่มที่กำลังเปิดอยู่ (isActive) */}
                  <SidebarMenuButton
                    isActive={location.pathname === item.url}
                    render={<Link to={item.url} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-0">
        
        <Separator />

        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            
            <Avatar className="h-9 w-9">
              <AvatarImage src={currentUser.avatar} alt={currentUser.nickname} />
              <AvatarFallback className="text-xs font-semibold uppercase">
                {currentUser.nickname.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-left text-sm leading-tight">
              <span className="truncate font-medium capitalize">
                {currentUser.nickname}
              </span>
            </div>
          </div>
          <Badge
            variant={currentUser.role === "ADMIN" ? "default" : "secondary"}
            className="text-[10px] font-semibold uppercase tracking-wider"
          >
            {currentUser.role}
          </Badge>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
