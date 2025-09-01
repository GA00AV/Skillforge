import {
  BookOpen,
  Home,
  Settings,
  PlayCircle,
  MessageSquare,
  BotMessageSquareIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import { useLocation } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/lib/utils";
import useUserQuery from "@/hooks/useUserQuery";

const links = {
  navMain: [
    {
      title: "Dashboard",
      url: "/app",
      icon: Home,
    },

    {
      title: "My Learning",
      url: "/app/learn",
      icon: PlayCircle,
    },
  ],
  instructor: [
    {
      title: "My Courses",
      url: "/app/my-courses",
      icon: BookOpen,
    },
    {
      title: "Send Message",
      url: "/app/message",
      icon: BotMessageSquareIcon,
    },
  ],
  platform: [
    {
      title: "Notifications",
      url: "/app/notifications",
      icon: MessageSquare,
    },
  ],
};

export function AppSidebar() {
  const location = useLocation();
  const { isLoading, isError, data } = useUserQuery();
  const queryclient = useQueryClient();
  const logoutMutator = useMutation({
    mutationFn: () => logout("http://localhost:3000/signout"),
    onError: () => {
      queryclient.invalidateQueries({ queryKey: ["User"] });
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["User"] });
    },
  });

  let user = {
    name: isLoading || isError ? "" : data.user ? data.user.name : "",
    email: isLoading || isError ? "" : data.user ? data.user.email : "",
    profileImg:
      isLoading || isError ? "" : data.user ? data.user.profileImg : "",
  };
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-white font-bold text-sm">SF</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">SkillForge</span>
                  <span className="truncate text-xs">Master New Skills</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Student Section</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.navMain.map((item) => {
                let isActive = item.url === location.pathname;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Instructor Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.instructor.map((item) => {
                let isActive = item.url === location.pathname;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.platform.map((item) => {
                let isActive = item.url === location.pathname;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.url}>
                        <item.icon />
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.profileImg} alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      {user.name}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.profileImg} alt={user.name} />
                      <AvatarFallback className="rounded-lg">
                        {user.name}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.name}
                      </span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logoutMutator.mutate()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
