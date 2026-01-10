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
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-lg">◇</span>
              </div>
              <span className="font-bold text-lg hidden sm:inline">AssetHub</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/marketplace"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              Marketplace
            </Link>
            <Link
              to="/about"
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              About
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="hidden sm:flex items-center gap-3">
                <button className="text-foreground/80 hover:text-foreground transition-colors">
                  <User size={20} />
                </button>
                <Link
                  to="/dashboard"
                  className="text-foreground/80 hover:text-foreground transition-colors font-medium text-sm"
                >
                  Dashboard
                </Link>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-muted transition-colors text-sm font-medium"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-foreground font-medium hover:text-accent transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3">
            <Link
              to="/marketplace"
              className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors font-medium"
            >
              Marketplace
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors font-medium"
            >
              About
            </Link>
            {isAuthenticated && user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 rounded-lg bg-secondary hover:bg-muted transition-colors font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all"
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
