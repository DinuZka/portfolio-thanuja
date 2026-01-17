import { icons } from "lucide-react";
import React from "react";
import {
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobepremierepro,
  SiAdobeaftereffects,
} from "react-icons/si";
import { TbFileCv } from "react-icons/tb";

export default function About() {
  const skills = [
    {
      name: "Photoshop",
      icons: <SiAdobephotoshop size={50} />,
    },
    {
      name: "Illustrator",
      icons: <SiAdobeillustrator size={50} />,
    },
    {
      name: "Premiere Pro",
      icons: <SiAdobepremierepro size={50} />,
    },
    {
      name: "After Effects",
      icons: <SiAdobeaftereffects size={50} />,
    },
  ];

  return (
    <section id="about" className="section noisy">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-10 lg:gap-16 xl:gap-24 max-w-7xl mx-auto">
          {/* Character Image */}
          <div
            data-aos="fade-right"
            className="flex-shrink-0 order-1 lg:order-1"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px]">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full"></div>
              <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-gray-700 to-black rounded-full overflow-hidden border-4 sm:border-[6px] border-gray-800 shadow-2xl">
                <img
                  src={`${import.meta.env.BASE_URL}/images/2.webp`}
                  alt="Designer character"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-2xl"></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 w-full text-center lg:text-left space-y-5 sm:space-y-6 md:space-y-8 order-2 lg:order-2 px-2 sm:px-0">
            <h2
              data-aos="fade-up"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight"
            >
              WHO AM I ?
            </h2>

            <p
              data-aos="fade-up"
              className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>

            <div className="pt-2 sm:pt-3 md:pt-4">
              <button
                data-aos="fade-up"
                className=" glass-card px-8 sm:px-10 md:px-12 lg:px-14 py-3 sm:py-3.5 md:py-4 rounded-full text-xs sm:text-sm md:text-base uppercase tracking-wider transition-all duration-300 font-medium active:scale-95 shadow-lg hover:shadow-xl"
              >
                <div className="flex flex-row gap-1">
                  CV IS HERE <TbFileCv />
                </div>
              </button>
            </div>

            {/* Adobe Suite Icons */}
            <div
              data-aos="fade-left"
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 md:gap-5 pt-4 sm:pt-6 md:pt-8"
            >
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center font-bold text-white text-base sm:text-lg md:text-xl shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  title={skill.name}
                >
                  {skill.icons}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
