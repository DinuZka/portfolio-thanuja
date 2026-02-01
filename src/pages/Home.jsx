import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  lazy,
  Suspense,
} from "react";
import {
  Facebook,
  Linkedin,
  Instagram,
  ArrowDown,
  Sparkles,
  Mail,
} from "lucide-react";
import { TbBrandTiktok } from "react-icons/tb";
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
  const resizeTimeoutRef = useRef(null);

  // ===== OPTIMIZATION 1: Improved Mobile Detection with Debounce =====
  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      // Only update if value actually changed (prevents unnecessary re-renders)
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
      }
    };

    checkMobile();

    const handleResize = () => {
      // Clear existing timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      // Set new timeout
      resizeTimeoutRef.current = setTimeout(checkMobile, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [isMobile]); // Add isMobile to deps to compare

  // ===== OPTIMIZATION 2: Memoized Static Data =====
  const socialMediaLinks = useMemo(
    () => [
      {
        icon: Facebook,
        url: "https://www.facebook.com/share/14RJkzzhYvp/",
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
        icon: TbBrandTiktok,
        url: "https://www.tiktok.com/@thanujanaditha20?_r=1&_t=ZS-92NtdLCsGXc",
        label: "TikTok",
        color: "hover:text-pink-500",
      },
    ],
    [],
  );

  const typewriterWords = useMemo(
    () => ["Designer.", "Photographer.", "Creator.", "Visual Artist."],
    [],
  );

  // ===== OPTIMIZATION 3: Dynamic Particle Count =====
  const particles = useMemo(() => {
    // Even fewer particles on very small screens
    if (window.innerWidth < 480) return Array.from({ length: 3 });
    return isMobile ? Array.from({ length: 5 }) : Array.from({ length: 10 }); // Reduced from 15
  }, [isMobile]);

  // ===== OPTIMIZATION 4: Improved Intersection Observer =====
  useEffect(() => {
    // Don't run if already in view (prevents unnecessary observations)
    if (inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Cleanup immediately
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [inView]);

  // ===== OPTIMIZATION 5: Throttled Mouse Movement with Will-Change =====
  useEffect(() => {
    // Skip on mobile or if user prefers reduced motion
    if (isMobile) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const now = performance.now();

      // Throttle to 60fps max (every 16ms) - improved from 50ms
      if (now - lastMouseUpdate.current < 16) return;

      lastMouseUpdate.current = now;

      // Cancel previous animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use RAF for smooth updates
      rafRef.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10; // Reduced from 15
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
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

  // ===== OPTIMIZATION 6: Memoized Event Handlers =====
  const scrollToNext = useCallback(() => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleImageMouseEnter = useCallback(() => {
    if (!isMobile) setIsHovered(true);
  }, [isMobile]);

  const handleImageMouseLeave = useCallback(() => {
    if (!isMobile) setIsHovered(false);
  }, [isMobile]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  // ===== OPTIMIZATION 7: Preload Critical Image =====
  useEffect(() => {
    // Preload the hero image
    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}/images/2.webp`;
    img.onload = handleImageLoad;
  }, [handleImageLoad]);

  return (
    <section
      id="home"
      className="section relative overflow-hidden min-h-screen flex items-center"
      ref={sectionRef}
    >
      {/* ===== OPTIMIZATION 8: Simplified Background Elements ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs - More efficient implementation */}
        {!isMobile ? (
          <>
            <div
              className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl"
              style={{
                willChange: "transform",
                transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`,
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)", // Smooth transition
              }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-3xl"
              style={{
                willChange: "transform",
                transform: `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0)`,
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </>
        ) : (
          // Single static orb for mobile
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-blue-500/15 via-purple-500/15 to-pink-500/10 rounded-full blur-3xl" />
        )}

        {/* Floating Particles - Reduced count and complexity */}
        {!isMobile && (
          <div className="absolute inset-0">
            {particles.map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
                  willChange: "transform",
                }}
              />
            ))}
          </div>
        )}

        {/* Grid Pattern - Desktop only, lighter opacity */}
        {!isMobile && (
          <div
            className="absolute inset-0 hidden md:block opacity-30"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
              maskImage:
                "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)",
            }}
          />
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-10 relative z-10">
        {/* ===== OPTIMIZATION 9: Social Media Icons with Better Touch Targets ===== */}
        <div
          className={`flex justify-center mb-4 sm:mb-12 md:mb-16 transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
          }`}
        >
          <div className="glass-card flex items-center gap-3 mt-4 md:mt-0 sm:gap-4 md:gap-5 rounded-full px-2 sm:px-2 sm:py-2 md:px-5 py-2 md:py-3 border transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group">
            {socialMediaLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative min-w-[44px] min-h-[44px] w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isMobile
                      ? "active:scale-95"
                      : "hover:scale-125 active:scale-95"
                  } ${link.color} group/icon`}
                  aria-label={link.label}
                  style={{ willChange: "transform" }}
                >
                  {/* Glow effect - Desktop only */}
                  {!isMobile && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover/icon:opacity-20 blur-md transition-opacity duration-300" />
                  )}

                  <IconComponent className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-gray-300 transition-all duration-300 group-hover/icon:rotate-12" />

                  {/* Tooltip - Desktop only */}
                  {!isMobile && (
                    <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                      {link.label}
                    </span>
                  )}
                </a>
              );
            })}
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
                  3+
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

            {/* ===== OPTIMIZATION 10: Improved CTA Buttons ===== */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4 transition-all duration-700 delay-300 ${
                inView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {/* Primary Button */}
              <a
                href="#gallery"
                className="group relative glass-card px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm md:text-base uppercase tracking-wider font-medium transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden w-full sm:w-auto shadow-lg hover:shadow-xl hover:shadow-purple-500/30 inline-block text-center"
                style={{ willChange: "transform" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center gap-2">
                  <span className="text-white">View My Work</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </div>
              </a>

              {/* Secondary Button */}
              <a
                href="https://wa.me/+94779936534?text=Hello%20Thanuja,%20I%20would%20like%20to%20get%20in%20touch%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm md:text-base uppercase tracking-wider font-medium transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-gray-700 hover:border-purple-500/50 hover:bg-purple-500/10 w-full sm:w-auto inline-flex items-center justify-center gap-2"
                style={{ willChange: "transform" }}
              >
                <Mail className="w-4 h-4" />
                <span className="text-white">Contact Me</span>
              </a>
            </div>
          </div>

          {/* ===== OPTIMIZATION 11: Optimized Profile Image ===== */}
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
                {/* Rotating Border - CSS animation instead of JS */}
                {!isMobile && (
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                    style={{
                      animation: "spin-slow 20s linear infinite",
                      willChange: "transform",
                    }}
                  />
                )}

                {/* Static border for mobile */}
                {isMobile && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-30" />
                )}

                {/* Outer Ring */}
                <div className="absolute inset-1 sm:inset-2 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full" />

                {/* Image Container */}
                <div className="absolute inset-3 sm:inset-4 bg-gradient-to-br from-teal-600/20 to-gray-800 rounded-full overflow-hidden border-2 sm:border-4 border-gray-700 shadow-2xl group-hover:border-purple-500/50 transition-all duration-500">
                  {/* Loading placeholder with pulse */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-800">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
                    </div>
                  )}

                  <img
                    src={`${import.meta.env.BASE_URL}/images/2.webp`}
                    alt="Thanuja Nadhitha - Designer and Photographer"
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isMobile ? "" : "group-hover:scale-110"
                    } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                    loading="eager"
                    decoding="async"
                    onLoad={handleImageLoad}
                    fetchpriority="high"
                    width="500"
                    height="500"
                    style={{ willChange: imageLoaded ? "auto" : "opacity" }}
                  />

                  {/* Gradient Overlay - Desktop only */}
                  {!isMobile && (
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  )}
                </div>

                {/* Animated Circles - Desktop only */}
                {!isMobile && (
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className="absolute inset-0 rounded-full border-2 border-blue-400/30"
                      style={{
                        animation:
                          "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
                      }}
                    />
                    <div
                      className="absolute inset-4 rounded-full border-2 border-purple-400/30"
                      style={{
                        animation:
                          "ping 1s cubic-bezier(0, 0, 0.2, 1) 0.5s infinite",
                      }}
                    />
                  </div>
                )}

                {/* Floating Elements - Simplified */}
                {!isMobile && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20 blur-xl"
                      style={{
                        animation: "float 3s ease-in-out infinite",
                        willChange: "transform",
                      }}
                    />
                    <div
                      className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full opacity-20 blur-xl"
                      style={{
                        animation: "float 3s ease-in-out 1s infinite",
                        willChange: "transform",
                      }}
                    />
                  </div>
                )}

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2">
                <div
                  className={`bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-sm border border-white/10 ${
                    isMobile ? "" : "animate-float"
                  }`}
                  style={!isMobile ? { willChange: "transform" } : {}}
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
            className="group flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 min-w-[44px] min-h-[44px]"
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

      {/* ===== OPTIMIZATION 12: Enhanced CSS with Performance Hints ===== */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateZ(0);
          }
          50% {
            transform: translateY(-20px) translateZ(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg) translateZ(0);
          }
          to {
            transform: rotate(360deg) translateZ(0);
          }
        }

        @keyframes ping {
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        /* Disable animations on mobile for better performance */
        @media (max-width: 768px) {
          .animate-spin-slow,
          .animate-float {
            animation: none !important;
          }

          /* Reduce blur complexity on mobile */
          .blur-3xl {
            filter: blur(40px);
          }
          .blur-xl {
            filter: blur(20px);
          }
          .blur-md {
            filter: blur(10px);
          }
        }

        /* Optimize animations for reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        /* GPU acceleration hints for animated elements */
        .glass-card,
        .group img,
        [class*="animate-"],
        [style*="animation"] {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-font-smoothing: subpixel-antialiased;
          perspective: 1000px;
        }

        /* Optimize transition timing */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Contain layout/paint for better performance */
        .glass-card {
          contain: layout paint;
        }

        /* Optimize will-change usage - remove after animation */
        [style*="will-change"] {
          /* will-change is set inline when needed */
        }
      `}</style>
    </section>
  );
}
