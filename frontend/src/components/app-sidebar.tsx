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
import { useUserContext } from "@/context/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/lib/utils";

const links = {
  navMain: [
    {
      title: "Dashboard",
      url: "/app/dashboard",
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

    {
      title: "Settings",
      url: "/app/profile",
      icon: Settings,
    },
  ],
};

export function AppSidebar() {
  const location = useLocation();
  const userQuery = useUserContext();
  const queryclient = useQueryClient();
  const mutator = useMutation({
    mutationFn: () => logout("http://localhost:3000/signout"),
    onError: () => {
      queryclient.invalidateQueries({ queryKey: ["User"] });
    },
    onSuccess: () => {
      queryclient.invalidateQueries({ queryKey: ["User"] });
    },
  });
  if (!userQuery.data) {
    userQuery.refetch();
  }
  let user = {
    name:
      userQuery.isLoading || userQuery.isError
        ? ""
        : userQuery.data.user
        ? userQuery.data.user.name
        : "",
    email:
      userQuery.isLoading || userQuery.isError
        ? ""
        : userQuery.data.user
        ? userQuery.data.user.email
        : "",
    profileImg:
      userQuery.isLoading || userQuery.isError
        ? ""
        : userQuery.data.user
        ? userQuery.data.user.profileImg
        : "",
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
                    <AvatarFallback className="rounded-lg">AJ</AvatarFallback>
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
                      <AvatarFallback className="rounded-lg">AJ</AvatarFallback>
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
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <Link to={"/app/profile"}>Account Settings</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => mutator.mutate()}>
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
