import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";

interface NavBarProps {
  isAuthenticated?: boolean;
  user?: { displayName: string; email: string } | null;
  onLogout?: () => void;
}

export function NavBar({ isAuthenticated = false, user, onLogout }: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-accent rounded-sm flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-primary-foreground text-sm">a</span>
              </div>
              <span className="font-semibold text-sm hidden sm:inline tracking-tight">AssetHub</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/marketplace"
              className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
            >
              Marketplace
            </Link>
            <Link
              to="/about"
              className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium"
            >
              About
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="hidden sm:flex items-center gap-2">
                <button className="p-1.5 text-foreground/70 hover:text-foreground transition-colors hover:bg-secondary rounded-sm">
                  <User size={18} />
                </button>
                <Link
                  to="/dashboard"
                  className="px-3 py-1.5 text-foreground/80 hover:text-foreground transition-colors font-medium text-xs"
                >
                  Dashboard
                </Link>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-foreground/80 hover:text-foreground bg-secondary/50 hover:bg-secondary border border-border/50 rounded-sm transition-colors text-xs font-medium"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-foreground/70 hover:text-foreground font-medium text-xs"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 bg-primary text-primary-foreground font-medium text-xs rounded-sm hover:opacity-90 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 hover:bg-secondary rounded-sm transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 py-3 space-y-1 bg-secondary/30">
            <Link
              to="/marketplace"
              className="block px-4 py-2 hover:bg-secondary transition-colors font-medium text-sm"
            >
              Marketplace
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 hover:bg-secondary transition-colors font-medium text-sm"
            >
              About
            </Link>
            {isAuthenticated && user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-secondary transition-colors font-medium text-sm"
                >
                  Dashboard
                </Link>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-foreground/80 hover:text-foreground hover:bg-secondary transition-colors font-medium text-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 hover:bg-secondary transition-colors font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
