import React from "react";

export default function Skills() {
  const skills = [
    { name: "skill 1", level: 85 },
    { name: "skill 2", level: 60 },
    { name: "skill 3", level: 75 },
    { name: "skill 4", level: 80 },
    { name: "skill 5", level: 95 },
  ];

  return (
    <section className="section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-24 max-w-7xl mx-auto items-center">
          {/* Left Side - Title and Quote */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left">
            <h2
              data-aos="fade-left"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-tight"
            >
              SKILLS
            </h2>
            <p
              data-aos="fade-left"
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light leading-relaxed px-4 sm:px-0"
            >
              "Lorem ipsum dolor sit amet, consectetur"
            </p>
          </div>

          {/* Right Side - Skills Progress Bars */}
          <div
            data-aos="fade-right"
            className="space-y-5 sm:space-y-6 lg:space-y-7"
          >
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                {/* Skill Name */}
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base md:text-lg font-medium uppercase tracking-wide">
                    {skill.name}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-400">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar Container */}
                <div className="relative h-3 sm:h-4 bg-gray-700 rounded-full overflow-hidden shadow-inner">
                  {/* Progress Bar Fill */}
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000 ease-out shadow-lg"
                    style={{ width: `${skill.level}%` }}
                  >
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>

                  {/* Glow Effect */}
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-400/30 blur-sm rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
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
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </section>
  );
}
