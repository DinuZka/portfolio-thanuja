import React from "react";
import { Facebook, Linkedin, Instagram } from "lucide-react";
import "../components/glassEffectStyle.css";
import "../index.css";

export default function Home() {
  const socialMediaLinks = [
    { icon: Facebook, url: "#", label: "Facebook" },
    { icon: Linkedin, url: "#", label: "LinkedIn" },
    { icon: Instagram, url: "#", label: "Instagram" },
  ];

  return (
    <section id="home" className="section noisy">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-8 md:py-10">
        {/* Social Media Icons */}
        <div className="flex justify-center mb-6 sm:mb-8 md:mb-12">
          <div
            data-aos="fade-down"
            className="glass-card flex items-center gap-2 sm:gap-3 md:gap-4 rounded-full px-4 sm:px-6 md:px-8 py-3 md:py-4 border transition-all duration-300"
          >
            {socialMediaLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 active:scale-95"
                aria-label={link.label}
              >
                <link.icon className="w-6 h-6 sm:w-5 sm:h-5 md:w-8 md:h-8 text-[var(--light-txt-color)] hover:text-[var(--primary-color)] transition-all duration-200" />
              </a>
            ))}
          </div>
        </div>
        {/* Main Content */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-12 xl:gap-16 max-w-7xl mx-auto">
          {/* Text Content */}
          <div
            data-aos="fade-right"
            className="flex-1 w-full text-center lg:text-left space-y-4 sm:space-y-5 md:space-y-6 px-2 sm:px-0"
          >
            <p className="text-gray-400 text-xs sm:text-sm md:text-base uppercase tracking-wider">
              HELLO,
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-none">
              I'M A DESIGNER
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                & PHOTOGRAPHER
              </span>
            </h1>

            <p className="text-gray-400 text-xs sm:text-sm md:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>

            <div className="pt-2 sm:pt-3 md:pt-4">
              <button className="glass-card px-8 sm:px-10 md:px-12 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm md:text-base uppercase tracking-wider font-medium transition-all duration-300 active:scale-95">
                INFO
              </button>
            </div>
          </div>

          {/* Profile Image */}
          <div data-aos="fade-left" className="flex-shrink-0 mt-4 lg:mt-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] xl:w-[480px] xl:h-[480px]">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full"></div>
              <div className="absolute inset-1 sm:inset-2 bg-gradient-to-br from-teal-600/20 to-gray-800 rounded-full overflow-hidden border-2 sm:border-4 border-gray-700">
                <img
                  src={`${import.meta.env.BASE_URL}/images/main.webp`}
                  alt="Designer and Photographer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
