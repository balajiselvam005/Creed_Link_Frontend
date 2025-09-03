"use client";
import Pen from "../components/ui/pen";
import Paper from "../components/ui/paper";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { UserCard } from "../components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const searchParam = useSearchParams();
  const scrollTo = searchParam.get("scrollTo");

  useEffect(() => {
    if (scrollTo) {
      const section = document.getElementById(scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [scrollTo]);

  return (
    <div>
      {/* Hero Section */}
      <section id="landing-section" className="px-4 sm:px-8 lg:px-16 xl:px-32">
        <div className="flex flex-col lg:flex-row justify-center lg:justify-around items-center max-w-full min-h-screen py-8 lg:py-0 gap-8 lg:gap-4">
          {/* Text Content */}
          <div className="text-center lg:text-left w-full lg:w-auto max-w-4xl lg:max-w-3xl space-y-4 sm:space-y-6 order-2 lg:order-1">
            <h1 className="heading-primary">
              A platform where creators and organizations connect, collaborate,
              and thrive.
            </h1>
            <p className="heading-sub">Connect. Collaborate. Create.</p>
          </div>

          {/* Illustration */}
          <div className="flex justify-center items-center order-1 lg:order-2 w-full lg:w-auto">
            <div className="flex scale-75 sm:scale-90 md:scale-100">
              <Paper />
              <Pen />
            </div>
          </div>
        </div>
      </section>
      {/* Cards Section */}
      <section id="home-section" className="px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto min-h-screen py-8 sm:py-10">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 place-items-center mb-8 sm:mb-12">
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            {/* Additional cards for larger screens */}
            <div className="hidden xl:block">
              <UserCard />
            </div>
            <div className="hidden xl:block">
              <UserCard />
            </div>
          </div>

          {/* Explore Button */}
          <div className="flex justify-center">
            <Link
              href="/creators"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-sm sm:text-base"
            >
              <span>Explore Creators</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
