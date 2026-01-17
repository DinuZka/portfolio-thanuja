import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import "../index.css";
import { navLinks } from "../components/NavList";

export default function Contact() {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <section
      id="contact"
      className="section noisy flex flex-col min-h-screen overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 flex-grow flex flex-col justify-between">
        {/* Top Section */}
        <div className="space-y-4 sm:space-y-6">
          <p
            data-aos="fade-up"
            className="text-xs sm:text-sm md:text-base text-gray-300"
          >
            Lorem ipsum dolor sit amet, consectetur
          </p>
          <button
            data-aos="fade-up"
            className="glass-card px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 rounded-full text-xs sm:text-sm md:text-base uppercase tracking-wider transition-all duration-300 font-medium active:scale-95 shadow-lg hover:shadow-xl"
          >
            HIRE ME
          </button>
        </div>

        {/* Center - Large Text */}
        <div className="flex-grow flex items-center justify-start my-8 sm:my-12 lg:my-16">
          <h2
            data-aos="fade-right"
            className="text-8xl sm:text-6xl md:text-9xl lg:text-[12rem] xl:text-[12rem] font-bold tracking-tight text-left leading-none"
          >
            SAY HELLO!
          </h2>
        </div>

        {/* Bottom Section */}
        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          {/* Navigation and Social Icons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 pb-6 sm:pb-8 border-b border-gray-700">
            {/* Navigation Menu */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 lg:gap-8">
              {navLinks.slice(0, -1).map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="text-sm sm:text-base md:text-sm font-medium uppercase tracking-wide hover:text-[var(--primary-color)] transition-colors duration-300 hover:scale-105 transform"
                >
                  {link.title}
                </a>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-xs sm:text-sm md:text-base text-gray-400">
              © 2026 THANUJA NADITHA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
