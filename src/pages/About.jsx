import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  TbFileCv,
  TbDownload,
  TbSparkles,
  TbBriefcase,
  TbAward,
  TbHeart,
} from "react-icons/tb";

export default function About() {
  const [inView, setInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const mouseMoveThrottleRef = useRef(null);

  // Memoized stats data
  const stats = useMemo(
    () => [
      {
        icon: <TbBriefcase className="w-5 h-5 sm:w-6 sm:h-6" />,
        value: "3+",
        label: "Years Experience",
      },
      {
        icon: <TbAward className="w-5 h-5 sm:w-6 sm:h-6" />,
        value: "100+",
        label: "Projects Done",
      },
      {
        icon: <TbHeart className="w-5 h-5 sm:w-6 sm:h-6" />,
        value: "50+",
        label: "Happy Clients",
      },
    ],
    [],
  );

  // Memoized client avatars
  const clientAvatars = useMemo(() => [1, 2, 3, 4], []);

  // Optimized Intersection Observer with disconnect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Stop observing once in view
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Optimized mouse move effect with throttling and reduced motion support
  const handleMouseMove = useCallback((e) => {
    if (!imageRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    // Throttle mouse move updates
    if (mouseMoveThrottleRef.current) return;

    mouseMoveThrottleRef.current = setTimeout(() => {
      mouseMoveThrottleRef.current = null;
    }, 50); // Update every 50ms

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  }, []);

  // Memoized event handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  }, []);

  // Calculate 3D tilt transform
  const calculateTiltTransform = useMemo(() => {
    if (!isHovered) {
      return "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }

    // Reduced tilt effect for better performance
    const tiltX = (mousePosition.y - 200) / 30; // Reduced from /20
    const tiltY = (mousePosition.x - 200) / 30; // Reduced from /20

    return `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  }, [isHovered, mousePosition]);

  return (
    <section
      id="about"
      className="section relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Animated Background Elements - Optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs - smaller on mobile */}
        <div className="absolute top-1/4 -left-20 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 -right-20 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Floating particles - hidden on mobile for performance */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full hidden sm:block">
          <div className="absolute top-10 left-20 w-2 h-2 bg-blue-400/40 rounded-full animate-float" />
          <div
            className="absolute bottom-20 right-32 w-3 h-3 bg-purple-400/40 rounded-full animate-float"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute top-32 right-20 w-2 h-2 bg-pink-400/40 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-16 xl:gap-24 max-w-7xl mx-auto">
          {/* Character Image */}
          <div
            data-aos="fade-right"
            className={`flex-shrink-0 order-1 lg:order-1 transition-all duration-1000 ${
              inView ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
            }`}
            style={{ willChange: inView ? "auto" : "transform, opacity" }}
            ref={imageRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px]">
                {/* Outer Glow Ring - optimized rotation */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-spin-slow"
                  style={{ willChange: "transform" }}
                />

                {/* Middle Ring */}
                <div className="absolute inset-1 sm:inset-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full" />

                {/* Image Container with 3D tilt */}
                <div
                  className="absolute inset-3 sm:inset-4 bg-gradient-to-br from-gray-700 to-black rounded-full overflow-hidden border-4 sm:border-[6px] border-gray-800 shadow-2xl transition-transform duration-300"
                  style={{
                    transform: calculateTiltTransform,
                    willChange: isHovered ? "transform" : "auto",
                  }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}/images/main.webp`}
                    alt="Designer character"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Overlay Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Animated Border - hidden on mobile for performance */}
                <div className="hidden md:block absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 animate-ping" />
                </div>

                {/* Floating Particles - hidden on mobile */}
                <div className="absolute inset-0 pointer-events-none hidden sm:block">
                  <div className="absolute top-10 right-10 w-3 h-3 bg-blue-400 rounded-full animate-float opacity-60" />
                  <div
                    className="absolute bottom-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-60"
                    style={{ animationDelay: "0.5s" }}
                  />
                  <div
                    className="absolute top-1/2 right-5 w-2 h-2 bg-pink-400 rounded-full animate-float opacity-60"
                    style={{ animationDelay: "1s" }}
                  />
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500" />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-green-500/30 shadow-lg">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-xs sm:text-sm font-medium text-green-100">
                  Available for work
                </span>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 w-full text-center lg:text-left space-y-6 sm:space-y-8 order-2 lg:order-2 px-2 sm:px-0">
            {/* Title */}
            <div className="overflow-hidden">
              <h2
                data-aos="fade-up"
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight transition-all duration-1000 ${
                  inView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ willChange: inView ? "auto" : "transform, opacity" }}
              >
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  WHO AM I?
                </span>
              </h2>
            </div>

            {/* Subtitle with Icon */}
            <div
              data-aos="fade-up"
              className={`flex items-center justify-center lg:justify-start gap-2 sm:gap-3 transition-all duration-1000 delay-100 ${
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ willChange: inView ? "auto" : "transform, opacity" }}
            >
              <TbSparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-pulse" />
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-200">
                Creative Graphic Designer & Visual Artist
              </p>
            </div>

            {/* Description */}
            <p
              data-aos="fade-up"
              className={`text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0 transition-all duration-1000 delay-200 ${
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ willChange: inView ? "auto" : "transform, opacity" }}
            >
              I'm a passionate graphic designer with a love for creating
              stunning visual experiences. With expertise in branding, UI/UX
              design, and digital illustration, I transform ideas into
              compelling designs that captivate and inspire. Let's bring your
              vision to life!
            </p>

            {/* Stats Grid */}
            <div
              data-aos="fade-up"
              className={`grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-xl mx-auto lg:mx-0 transition-all duration-1000 delay-300 ${
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ willChange: inView ? "auto" : "transform, opacity" }}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10 group"
                >
                  <div className="flex flex-col items-center gap-1 sm:gap-2">
                    <div className="text-purple-400 group-hover:text-purple-300 transition-colors group-hover:scale-110 transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 text-center leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4 transition-all duration-1000 delay-400 ${
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ willChange: inView ? "auto" : "transform, opacity" }}
            >
              {/* Primary Button */}
              <button
                data-aos="fade-up"
                className="group relative glass-card px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-3.5 md:py-4 rounded-full text-xs sm:text-sm md:text-base uppercase tracking-wider font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 overflow-hidden w-full sm:w-auto"
              >
                {/* Gradient Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10 group-hover:opacity-20 transition-opacity duration-300 " />

                <div className="relative flex items-center justify-center gap-2">
                  <TbFileCv className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
                  <a
                    href={`${import.meta.env.BASE_URL}/docs/Thanuja_cv.pdf`}
                    download
                    rel="noopener noreferrer"
                    className="text-white"
                  >
                    <span>Download CV</span>
                  </a>
                  <TbDownload className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform duration-300" />
                </div>
              </button>
            </div>

            {/* Social Proof / Trust Badge */}
            <div
              data-aos="fade-up"
              className={`flex items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 transition-all duration-1000 delay-500 ${
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ willChange: inView ? "auto" : "transform, opacity" }}
            >
              <div className="flex -space-x-2">
                {clientAvatars.map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-gray-900"
                  />
                ))}
              </div>
              <span className="text-gray-400">
                Trusted by 50+ clients worldwide
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        /* Optimize animations for mobile and reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-spin-slow,
          .animate-bounce,
          .animate-pulse,
          .animate-ping {
            animation: none;
          }
        }

        /* GPU acceleration for better performance */
        .glass-card,
        .group img {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-font-smoothing: subpixel-antialiased;
        }

        /* Reduce motion on mobile for better performance */
        @media (max-width: 640px) {
          .animate-float {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
