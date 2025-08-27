"use client";
import Link from "next/link";
import { Users, Home, Search, Menu, X, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Avatar from "./ui/avatar";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const pathName = usePathname();
  const isCreatorsPage = pathName === "/creators";
  const isAuthPage = pathName === "/auth";
  const router = useRouter();

  const goToHomeSection = (sectionId: string) => {
    router.push(`/?scrollTo=${sectionId}`);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const goToAuthPage = (isLogin: boolean) => {
    router.push(`/auth?mode=${isLogin ? "login" : "signup"}`);
  };

  if (isAuthPage) {
    return (
      <header className="bg-gray-400 p-4 sm:p-6">
        <div className="max-w-screen mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-[clamp(1rem,5vw,2rem)] pl-20 font-bold tracking-tight hover:opacity-80 transition"
          >
            Creed Link
          </Link>
          <div className="flex hover:text-gray-700 pr-20 transition hover:shadow-2xl hover:-translate-y-1">
            <ArrowLeft />
            <Link href="/" className="text-sm sm:text-base underline">
              Back to Home
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-gray-400 p-4 sm:p-6 lg:p-10 transition-all">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => goToHomeSection("landing-section")}
            className="text-xl sm:text-2xl lg:text-3xl font-semibold whitespace-nowrap"
          >
            Creed Link
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex rounded-4xl p-3 xl:p-5 space-x-4 xl:space-x-8 border shadow-2xl overflow-hidden">
            <button
              onClick={() => goToHomeSection("home-section")}
              className="flex items-center space-x-2 hover:underline transition-all"
            >
              <Home size={20} />
              <span className="hidden xl:inline">Home</span>
            </button>
            <Link
              href="/creators"
              className="flex items-center space-x-2 hover:underline transition-all"
            >
              <Users size={20} />
              <span className="hidden xl:inline">Creators</span>
            </Link>
            <AnimatePresence>
              {isCreatorsPage && (
                <motion.div
                  key={"search"}
                  initial={{ opacity: 0, scale: 0.8, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -10 }}
                >
                  <Link
                    href="/search"
                    className="flex items-center space-x-2 hover:underline transition-all"
                  >
                    <Search size={20} />
                    <span className="hidden xl:inline">Search</span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
            <Link
              href="/templates"
              className="flex items-center space-x-2 hover:underline transition-all"
            >
              <Menu size={20} />
              <span className="hidden xl:inline">Templates</span>
            </Link>
          </nav>

          {/* Right side items */}

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* User Icon  OR Login and Sign up button */}
            {!user ? (
              <div className="space-x-2 sm:space-x-4">
                <Button
                  elevate={true}
                  size={"sm"}
                  variant={"ghost"}
                  onClick={() => goToAuthPage(true)}
                >
                  Login
                </Button>
                <Button
                  elevate={true}
                  size={"sm"}
                  variant={"ghost"}
                  onClick={() => goToAuthPage(false)}
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <Avatar />
            )}
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden border rounded-full p-2"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute right-13 lg:hidden mt-4 w-35 bg-gray-300 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="py-2">
                <button
                  onClick={() => goToHomeSection("home-section")}
                  className="flex justify-end space-x-3 w-full px-4 py-3 hover:bg-gray-100 transition-colors"
                >
                  <span>Home</span>
                  <Home size={20} />
                </button>
                <Link
                  href="/creators"
                  className="flex justify-end space-x-3 w-full px-4 py-3 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Creators</span>
                  <Users size={20} />
                </Link>
                {isCreatorsPage && (
                  <Link
                    href="/search"
                    className="flex justify-end space-x-3 w-full px-4 py-3 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Search</span>
                    <Search size={20} />
                  </Link>
                )}
                <Link
                  href="/templates"
                  className="flex justify-end space-x-3 w-full px-4 py-3 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Templates</span>
                  <Menu size={20} />
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
