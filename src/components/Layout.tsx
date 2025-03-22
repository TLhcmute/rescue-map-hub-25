
import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, MapPin, Phone, Menu, X } from "lucide-react";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/", label: "Home", icon: <Home className="h-5 w-5 mr-2" /> },
    { path: "/map", label: "Rescue Map", icon: <MapPin className="h-5 w-5 mr-2" /> },
    { path: "/contact", label: "Contact Team", icon: <Phone className="h-5 w-5 mr-2" /> }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-white/50 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold tracking-tight">Rescue Map Hub</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary relative py-2",
                  {
                    "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:content-['']": isActive,
                    "text-muted-foreground": !isActive
                  }
                )}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
          
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
                  className={({ isActive }) => cn(
                    "flex items-center py-3 px-2 rounded-md text-sm font-medium transition-colors hover:bg-accent",
                    {
                      "bg-accent text-primary": isActive,
                      "text-foreground": !isActive
                    }
                  )}
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
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
            © 2024 Rescue Map Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
