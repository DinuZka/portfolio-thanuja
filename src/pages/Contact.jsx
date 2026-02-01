import React, { useState, useEffect, useRef } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowUpRight,
  Heart,
} from "lucide-react";
import "../index.css";
import { navLinks } from "../components/NavList";

export default function Contact() {
  const [inView, setInView] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);

  const socialLinks = [
    {
      icon: Facebook,
      href: "#",
      label: "Facebook",
      color: "hover:bg-blue-600",
    },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
    {
      icon: Instagram,
      href: "#",
      label: "Instagram",
      color: "hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-600",
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@designer.com",
      href: "mailto:hello@designer.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+94 77 993 6534",
      href: "tel:+94779936534",
    },
    { icon: MapPin, label: "Location", value: "San Francisco, CA", href: "#" },
  ];

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 },
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      setMessage("");
    }, 2000);
  };

  return (
    <section
      id="contact"
      className="section relative overflow-hidden min-h-screen flex flex-col"
      ref={sectionRef}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex-grow flex flex-col justify-between relative z-10">
        {/* Top Section - Contact Info Cards */}
        <div
          className={`space-y-6 sm:space-y-8 transition-all duration-1000 ${
            inView ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
          }`}
        >
          {/* Intro Text */}
          <div className="max-w-2xl">
            <p
              data-aos="fade-up"
              className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-6"
            >
              Have a project in mind or just want to chat? I'd love to hear from
              you. Let's create something amazing together!
            </p>
          </div>

          {/* Contact Info Grid */}
          <div
            data-aos="fade-up"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8"
          >
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                className={`group glass-card p-4 sm:p-5 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 border border-gray-700/50 hover:border-purple-500/50 ${
                  inView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">
                      {info.label}
                    </p>
                    <p className="text-sm sm:text-base font-medium text-gray-200 group-hover:text-purple-300 transition-colors">
                      {info.value}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-purple-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>
              </a>
            ))}
          </div>

          {/* Quick Contact Form */}

          <div
            className={`glass-card p-6 sm:p-8 rounded-3xl border border-gray-700/50 max-w-2xl transition-all duration-1000 delay-300 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Quick Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-sm sm:text-base"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative glass-card px-6 py-3 rounded-xl text-sm sm:text-base uppercase tracking-wider font-medium transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        <span>Send</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message..."
                rows="3"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 transition-colors resize-none text-sm sm:text-base"
              ></textarea>
            </form>
          </div>
        </div>

        {/* Center - Large Text */}
        <div className="flex-grow flex items-center justify-start my-8 sm:my-12 lg:my-16 overflow-hidden">
          <h2
            data-aos="fade-right"
            className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold tracking-tight text-left leading-none transition-all duration-1000 delay-500 ${
              inView ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
            }`}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform duration-500">
              SAY
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform duration-500">
              HELLO!
            </span>
          </h2>
        </div>

        {/* Bottom Section */}
        <div
          className={`space-y-8 sm:space-y-10 transition-all duration-1000 delay-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Hire Me CTA Section */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Let's Work Together
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Ready to bring your vision to life? Let's discuss your
                  project.
                </p>
              </div>
              <button className="group relative glass-card px-8 sm:px-12 py-4 rounded-full text-sm sm:text-base uppercase tracking-wider font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-purple-500/30 overflow-hidden whitespace-nowrap">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-2">
                  <span>Hire Me</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </button>
            </div>
          </div>

          {/* Navigation and Social Icons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-6 pb-8 sm:pb-10 border-b border-gray-700/50">
            {/* Navigation Menu */}
            <nav className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 lg:gap-8">
              {navLinks.slice(0, -1).map((link, index) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="group relative text-sm sm:text-base font-medium uppercase tracking-wide transition-all duration-300 hover:scale-105 transform"
                >
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                    {link.title}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>

            {/* Social Icons */}
            <div className="flex items-center w-full justify-center md:justify-end gap-3 sm:gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-gray-800/50 border border-gray-700 ${social.color} transition-all duration-300 hover:scale-110 hover:border-transparent active:scale-95 shadow-lg hover:shadow-xl overflow-hidden`}
                  aria-label={social.label}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>

                  <social.icon className="relative w-5 h-5 sm:w-6 sm:h-6 text-gray-300 group-hover:text-white transition-colors duration-300 group-hover:scale-110" />

                  {/* Tooltip */}
                  <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg">
                    {social.label}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Copyright and Credits */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
              <span>© 2026 THANUJA NADITHA</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">All rights reserved</span>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
              <span>Made with</span>
              <Heart
                className="w-4 h-4 text-red-500 animate-pulse"
                fill="currentColor"
              />
              <span>DinuZ</span>
            </div>
          </div>

          {/* Back to Top Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group glass-card px-6 py-3 rounded-full text-xs sm:text-sm uppercase tracking-wider font-medium transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="flex items-center gap-2">
                <span>Back to Top</span>
                <div className="transform group-hover:-translate-y-1 transition-transform duration-300">
                  ↑
                </div>
              </div>
            </button>
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
            transform: translateY(-15px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
