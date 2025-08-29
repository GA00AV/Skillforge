import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

export function DashboardHeader() {
  return (
    <div className="flex flex-1 items-center justify-between">
      <span />

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses..."
            className="w-[200px] pl-8 md:w-[300px]"
          />
        </div>

        <Button variant="outline" size="icon" className="relative">
          <Link to={"/app/notifications"}>
            <Bell className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
