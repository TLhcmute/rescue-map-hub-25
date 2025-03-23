import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, MapPin, Phone, Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { authState, logout } = useAuth();
  const { toast } = useToast();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/", label: "Trang chủ", icon: <Home className="h-5 w-5 mr-2" /> },
    {
      path: "/map",
      label: "Bản đồ cứu hộ",
      icon: <MapPin className="h-5 w-5 mr-2" />,
    },
    {
      path: "/contact",
      label: "Liên hệ đội cứu hộ",
      icon: <Phone className="h-5 w-5 mr-2" />,
    },
  ];

  const handleLogout = () => {
    logout();
    toast({
      title: "Đăng xuất thành công",
      description: "Hẹn gặp lại bạn!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white/50 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight">
              ByteRescue Map Hub
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-primary relative py-2",
                    {
                      "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:content-['']":
                        isActive,
                      "text-muted-foreground": !isActive,
                    }
                  )
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* User profile and logout */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center text-sm">
              <User className="h-4 w-4 mr-1" />
              <span>{authState.user?.name || "Người dùng"}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Đăng xuất
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex md:hidden items-center justify-center rounded-md p-2 text-primary hover:bg-accent hover:text-primary-foreground"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Toggle menu</span>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white animate-slide-in">
            <div className="container px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center py-3 px-2 rounded-md text-sm font-medium transition-colors hover:bg-accent",
                      {
                        "bg-accent text-primary": isActive,
                        "text-foreground": !isActive,
                      }
                    )
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}

              {/* Mobile user profile */}
              <div className="flex items-center py-3 px-2 text-sm border-t border-gray-100 mt-2">
                <User className="h-5 w-5 mr-2" />
                <span>{authState.user?.name || "Người dùng"}</span>
              </div>

              {/* Mobile logout button */}
              <button
                onClick={handleLogout}
                className="flex w-full items-center py-3 px-2 rounded-md text-sm font-medium text-red-500 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Đăng xuất
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 container px-4 md:px-6 py-6 md:py-8">
        <Outlet />
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-2 px-4 md:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 ByteRescue Map Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
