import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Skip to Content for Keyboard/Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-background/80 backdrop-blur-sm border-b border-border/50"
        }`}
      >
        <div className="container mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
          <button
            onClick={() => handleNavClick("hero")}
            className="text-2xl font-bold text-primary hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            aria-label="Tejas Kadam Portfolio Home"
          >
            Tejas<span className="text-foreground">.</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            <button
              onClick={() => handleNavClick("about")}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick("projects")}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            >
              Projects
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
            >
              Contact
            </button>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            id="mobile-nav-menu"
            className="md:hidden border-b border-border bg-background/95 backdrop-blur-md px-4 py-4 space-y-3 shadow-lg transition-all animate-in slide-in-from-top-2 duration-200"
            aria-label="Mobile Navigation"
          >
            <button
              onClick={() => handleNavClick("about")}
              className="block w-full text-left py-2 px-3 rounded-md text-base font-medium text-foreground/90 hover:bg-muted hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick("projects")}
              className="block w-full text-left py-2 px-3 rounded-md text-base font-medium text-foreground/90 hover:bg-muted hover:text-primary transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="block w-full text-left py-2 px-3 rounded-md text-base font-medium text-foreground/90 hover:bg-muted hover:text-primary transition-colors"
            >
              Contact
            </button>
          </nav>
        )}
      </header>
    </>
  );
}
