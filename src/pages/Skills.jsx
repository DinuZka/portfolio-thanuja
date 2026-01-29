import React, { useState, useEffect, useRef } from "react";

export default function Skills() {
  const [inView, setInView] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);
  const sectionRef = useRef(null);

  const skills = [
    {
      name: "Adobe Photoshop",
      level: 95,
      color: "from-blue-600 to-blue-400",
      icon: "🎨",
      description: "Photo editing & digital painting",
    },
    {
      name: "Adobe Illustrator",
      level: 90,
      color: "from-orange-500 to-yellow-400",
      icon: "✏️",
      description: "Vector graphics & logo design",
    },
    {
      name: "Adobe InDesign",
      level: 85,
      color: "from-pink-500 to-rose-400",
      icon: "📄",
      description: "Layout design & typography",
    },
    {
      name: "Figma & UI Design",
      level: 88,
      color: "from-purple-500 to-indigo-400",
      icon: "🖼️",
      description: "Interface & web design",
    },
    {
      name: "Brand Identity",
      level: 92,
      color: "from-emerald-500 to-teal-400",
      icon: "✨",
      description: "Visual identity & branding",
    },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="skills"
      className="section noisy relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-24 max-w-7xl mx-auto items-center">
          {/* Left Side - Title and Quote */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="overflow-hidden">
              <h2
                data-aos="fade-left"
                className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-tight transition-all duration-1000 ${
                  inView
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-full opacity-0"
                }`}
              >
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                  SKILLS
                </span>
              </h2>
            </div>

            <div className="overflow-hidden">
              <p
                data-aos="fade-left"
                className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light leading-relaxed px-4 sm:px-0 transition-all duration-1000 delay-200 ${
                  inView
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-full opacity-0"
                }`}
              >
                "Design is not just what it looks like, design is how it works"
              </p>
            </div>

            {/* Stats Cards - Mobile Responsive */}
            <div
              className={`grid grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-12 transition-all duration-1000 delay-300 ${
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all hover:scale-105">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  5+
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
                  Design Tools
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all hover:scale-105">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  90%
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
                  Avg Proficiency
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Skills Progress Bars */}
          <div
            data-aos="fade-right"
            className="space-y-4 sm:space-y-5 lg:space-y-6"
          >
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`group transition-all duration-700 ${
                  inView
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setActiveSkill(index)}
                onMouseLeave={() => setActiveSkill(null)}
              >
                {/* Skill Card */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-5 pb-6 sm:pb-7 border border-gray-700/50 hover:border-gray-600/50 transition-all hover:shadow-xl hover:shadow-blue-500/10">
                  {/* Skill Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1">
                      <span className="text-2xl sm:text-3xl transform group-hover:scale-110 transition-transform">
                        {skill.icon}
                      </span>
                      <div className="relative flex-1 min-h-[24px] sm:min-h-[28px]">
                        <span className="text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wide block">
                          {skill.name}
                        </span>
                        <span
                          className={`text-xs text-gray-400 transition-opacity duration-300 absolute left-0 top-full mt-0 whitespace-nowrap ${
                            activeSkill === index
                              ? "opacity-100"
                              : "opacity-0 pointer-events-none"
                          }`}
                        >
                          {skill.description}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent">
                        {skill.level}%
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="relative h-3 sm:h-4 bg-gray-700/50 rounded-full overflow-hidden shadow-inner">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                    </div>

                    {/* Progress Bar Fill */}
                    <div
                      className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                      style={{
                        width: inView ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 150}ms`,
                      }}
                    >
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>

                      {/* Particles Effect */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-ping opacity-75"></div>
                    </div>

                    {/* Glow Effect */}
                    <div
                      className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} opacity-30 blur-md rounded-full transition-all duration-1000 ease-out`}
                      style={{
                        width: inView ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 150}ms`,
                      }}
                    ></div>
                  </div>

                  {/* Milestone Markers - Hidden on mobile for cleaner look */}
                  <div className="hidden sm:flex justify-between mt-2 px-1">
                    {[25, 50, 75, 100].map((milestone) => (
                      <div
                        key={milestone}
                        className={`text-xs text-gray-600 transition-colors ${
                          skill.level >= milestone ? "text-gray-400" : ""
                        }`}
                      >
                        {milestone}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Interactive Element - Skill Summary */}
        <div
          className={`mt-12 sm:mt-16 lg:mt-20 text-center transition-all duration-1000 delay-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/10">
            <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-green-500"></span>
            </span>
            <span className="text-xs sm:text-sm md:text-base text-gray-300">
              Creating visual stories every day
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </section>
  );
}
