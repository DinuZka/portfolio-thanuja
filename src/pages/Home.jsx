import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  Facebook,
  Linkedin,
  Instagram,
  ArrowDown,
  Sparkles,
  Mail,
} from "lucide-react";
import "../components/glassEffectStyle.css";
import "../index.css";
import { TypewriterCycle } from "../components/TypeWriter.jsx";

export default function Home() {
  const [inView, setInView] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const rafRef = useRef(null);
  const lastMouseUpdate = useRef(0);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    const debouncedResize = debounce(checkMobile, 150);
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  // Debounce helper
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Memoized social media links
  const socialMediaLinks = useMemo(
    () => [
      {
        icon: Facebook,
        url: "#",
        label: "Facebook",
        color: "hover:text-blue-500",
      },
      {
        icon: Linkedin,
        url: "#",
        label: "LinkedIn",
        color: "hover:text-blue-600",
      },
      {
        icon: Instagram,
        url: "#",
        label: "Instagram",
        color: "hover:text-pink-500",
      },
    ],
    [],
  );

  // Memoized typewriter words
  const typewriterWords = useMemo(
    () => ["Designer.", "Photographer.", "Creator.", "Visual Artist."],
    [],
  );

  // Reduced particles for mobile
  const particles = useMemo(() => {
    return isMobile ? Array.from({ length: 5 }) : Array.from({ length: 15 });
  }, [isMobile]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Optimized mouse move with RAF and reduced motion check
  useEffect(() => {
    // Skip on mobile or if user prefers reduced motion
    if (isMobile) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const now = performance.now();

      // Throttle to max 20fps (every 50ms)
      if (now - lastMouseUpdate.current < 50) return;

      lastMouseUpdate.current = now;

      // Cancel previous animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use RAF for smooth updates
      rafRef.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 15; // Reduced movement
        const y = (e.clientY / window.innerHeight - 0.5) * 15;
        setMousePosition({ x, y });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile]);

  // Memoized scroll handler
  const scrollToNext = useCallback(() => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Memoized handlers
  const handleImageMouseEnter = useCallback(() => {
    if (!isMobile) setIsHovered(true);
  }, [isMobile]);

  const handleImageMouseLeave = useCallback(() => {
    if (!isMobile) setIsHovered(false);
  }, [isMobile]);

  // Image load handler
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <section
      id="home"
      className="section relative overflow-hidden min-h-screen flex items-center"
      ref={sectionRef}
    >
      {/* Animated Background Elements - Conditional rendering for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs - Simplified on mobile */}
        {!isMobile && (
          <>
            <div
              className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
              style={{
                transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
              }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
              style={{
                animationDelay: "1s",
                transform: `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0)`,
              }}
            />
          </>
        )}

        {/* Static orb for mobile */}
        {isMobile && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-blue-500/15 via-purple-500/15 to-pink-500/10 rounded-full blur-3xl" />
        )}

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Floating Particles - Conditional */}
        {!isMobile && (
          <div className="absolute inset-0">
            {particles.map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Grid Pattern - Desktop only */}
        {!isMobile && (
          <div className="absolute inset-0 hidden md:block bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-10 relative z-10">
        {/* Social Media Icons */}
        <div
          className={`flex justify-center mb-4 sm:mb-12 md:mb-16 transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
          }`}
        >
          <div className="glass-card flex items-center gap-3 mt-4 md:mt-0 sm:gap-4 md:gap-5 rounded-full px-2 sm:px-2 sm:py-2 md:px-5 py-2 md:py-3 border transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group">
            {socialMediaLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className={`relative w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isMobile
                    ? "active:scale-95"
                    : "hover:scale-125 active:scale-95"
                } ${link.color} group/icon`}
                aria-label={link.label}
              >
                {/* Glow effect - Desktop only */}
                {!isMobile && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover/icon:opacity-20 blur-md transition-opacity duration-300" />
                )}

                <link.icon className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-300 transition-all duration-300 group-hover/icon:rotate-12" />

                {/* Tooltip - Desktop only */}
                {!isMobile && (
                  <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    {link.label}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 sm:gap-12 lg:gap-16 xl:gap-20 max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="flex-1 w-full text-center lg:text-left space-y-5 sm:space-y-6 md:space-y-8 px-2 sm:px-0">
            {/* Greeting Badge */}
            <div
              className={`inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full px-4 sm:px-5 py-2 sm:py-2.5 border border-white/10 transition-all duration-700 ${
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              <p className="text-gray-300 text-xs sm:text-sm uppercase tracking-wider font-medium">
                Welcome to my portfolio
              </p>
            </div>

            {/* Main Heading */}
            <div
              className={`transition-all duration-700 delay-75 ${
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="block text-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-2 sm:mb-3">
                  Hi, I'm
                </span>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                  <span className="text-white">I'm a</span>
                  <TypewriterCycle
                    words={typewriterWords}
                    className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent inline-block"
                    cursorColor="bg-purple-500"
                    typingDelay={100}
                    erasingDelay={60}
                    delayBetween={2500}
                  />
                </div>
              </h1>
            </div>

            {/* Description */}
            <p
              className={`text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0 transition-all duration-700 delay-150 ${
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Passionate about creating stunning visual experiences that bring
              ideas to life. Specializing in graphic design, photography, and
              creative direction with a modern approach.
            </p>

            {/* Stats/Highlights */}
            <div
              className={`flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 md:gap-8 transition-all duration-700 delay-200 ${
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                  5+
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm text-gray-500">
                    Years of
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-gray-300">
                    Experience
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                  100+
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm text-gray-500">
                    Projects
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-gray-300">
                    Completed
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4 transition-all duration-700 delay-300 ${
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {/* Primary Button */}
              <button className="group relative glass-card px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm md:text-base uppercase tracking-wider font-medium transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden w-full sm:w-auto shadow-lg hover:shadow-xl hover:shadow-purple-500/30">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center gap-2">
                  <a href="#gallery" className="text-white">
                    <span>View My Work</span>
                  </a>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </div>
              </button>

              {/* Secondary Button */}
              <button className="group px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm md:text-base uppercase tracking-wider font-medium transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-gray-700 hover:border-purple-500/50 hover:bg-purple-500/10 w-full sm:w-auto">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a
                    href="https://wa.me/+94779936534?text=Hello%20Thanuja,%20I%20would%20like%20to%20get%20in%20touch%20with%20you."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                  >
                    <span>Contact Me</span>
                  </a>
                </div>
              </button>
            </div>
          </div>

          {/* Profile Image */}
          <div
            className="flex-shrink-0 mt-4 lg:mt-0"
            ref={imageRef}
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
          >
            <div
              className={`relative group transition-all duration-700 delay-150 ${
                inView
                  ? "translate-x-0 opacity-100"
                  : "translate-x-20 opacity-0"
              }`}
            >
              {/* Main Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] xl:w-[500px] xl:h-[500px]">
                {/* Rotating Border - Disabled on mobile */}
                {!isMobile && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-spin-slow" />
                )}

                {/* Static border for mobile */}
                {isMobile && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-30" />
                )}

                {/* Outer Ring */}
                <div className="absolute inset-1 sm:inset-2 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full" />

                {/* Image Container */}
                <div className="absolute inset-3 sm:inset-4 bg-gradient-to-br from-teal-600/20 to-gray-800 rounded-full overflow-hidden border-2 sm:border-4 border-gray-700 shadow-2xl group-hover:border-purple-500/50 transition-all duration-500">
                  {/* Loading placeholder */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                  )}

                  <img
                    src={`${import.meta.env.BASE_URL}/images/2.webp`}
                    alt="Designer and Photographer"
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isMobile ? "" : "group-hover:scale-110"
                    } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                    loading="eager"
                    decoding="async"
                    onLoad={handleImageLoad}
                    fetchpriority="high"
                  />

                  {/* Gradient Overlay - Desktop only */}
                  {!isMobile && (
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}
                </div>

                {/* Animated Circles - Desktop only */}
                {!isMobile && (
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping" />
                    <div
                      className="absolute inset-4 rounded-full border-2 border-purple-400/30 animate-ping"
                      style={{ animationDelay: "0.5s" }}
                    />
                  </div>
                )}

                {/* Floating Elements - Reduced on mobile */}
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className={`absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur-xl ${isMobile ? "" : "animate-float"}`}
                  />
                  <div
                    className={`absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full opacity-20 blur-xl ${isMobile ? "" : "animate-float"}`}
                    style={{ animationDelay: "1s" }}
                  />
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2">
                <div
                  className={`bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-sm border border-white/10 ${isMobile ? "" : "animate-float"}`}
                >
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`flex justify-center mt-12 sm:mt-16 lg:mt-20 transition-all duration-700 delay-300 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <button
            onClick={scrollToNext}
            className="group flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
            aria-label="Scroll to next section"
          >
            <span className="text-xs sm:text-sm uppercase tracking-wider">
              Scroll Down
            </span>
            <div className="w-6 h-10 sm:w-7 sm:h-12 border-2 border-gray-600 rounded-full flex items-start justify-center p-2 group-hover:border-purple-500 transition-colors duration-300">
              <div className="w-1 h-2 bg-gray-600 rounded-full animate-bounce group-hover:bg-purple-500 transition-colors duration-300" />
            </div>
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
          </button>
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

        /* Disable animations on mobile for better performance */
        @media (max-width: 768px) {
          .animate-spin-slow {
            animation: none;
          }
        }

        /* Optimize animations for reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-spin-slow,
          .animate-bounce,
          .animate-pulse,
          .animate-ping {
            animation: none;
          }
        }

        /* GPU acceleration and performance optimizations */
        .glass-card,
        .group img,
        [class*="animate-"] {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-font-smoothing: subpixel-antialiased;
        }

        /* Reduce blur on mobile for better performance */
        @media (max-width: 768px) {
          .blur-3xl {
            filter: blur(40px);
          }
          .blur-xl {
            filter: blur(20px);
          }
        }

        /* Optimize transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
}
