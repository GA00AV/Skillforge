import { useState } from "react";
import {
  Search,
  Menu,
  X,
  LogOutIcon,
  LayoutDashboardIcon,
  BookCheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/lib/utils";
import useUserQuery from "@/hooks/useUserQuery";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  const isLoggedIn = isLoading || isError ? false : data.user ? true : false;

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">SF</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Skill Forge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <form action="/search">
                <Input
                  type="text"
                  placeholder="Search for courses..."
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                />
              </form>
            </div>
          </div>

          {/* Desktop Menu Items */}
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={isLoggedIn ? data.user.profileImg : ""}
                        alt={isLoggedIn ? data.user.name : "user"}
                      />
                      <AvatarFallback>
                        {isLoggedIn ? data.user.name : ""}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <Link to="/app">
                    <DropdownMenuItem>
                      <LayoutDashboardIcon className="mr-2 h-4 w-4 text-gray-900" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/app/learn">
                    <DropdownMenuItem>
                      <BookCheckIcon className="mr-2 h-4 w-4 text-gray-900" />
                      <span>My Learning</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logoutMutator.mutate()}>
                    <LogOutIcon className="mr-2 h-4 w-4 text-gray-900" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search for courses..."
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>

              {!isLoggedIn && (
                <div className="flex flex-col space-y-2">
                  <Link to="/login">
                    <Button variant="ghost" className="w-full justify-start">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
