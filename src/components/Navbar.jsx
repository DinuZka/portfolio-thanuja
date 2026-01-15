import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./Navbar.css";
import { navLinks } from "./NavList.js";
import { useState, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    // Navbar background blur on scroll
    gsap.fromTo(
      navRef.current,
      { backgroundColor: "transparent" },
      {
        backgroundColor: "#00000050",
        backdropFilter: "blur(10px)",
        webkitBackdropFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: document.body,
          start: "top -80",
          end: "top top",
          scrub: true,
        },
      }
    );

    // Initial entrance animations
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(logoRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav ref={navRef}>
      <div>
        <a href="#hero" ref={logoRef} className="flex items-center gap-2">
          <img
            src={`${import.meta.env.BASE_URL}/images/logo.webp`}
            className="md:w-1/7 w-1/2"
            alt="Logo"
          />
        </a>

        {/* hamburger button */}
        <button
          className={`menu-icon ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul
          ref={menuRef}
          className={`nav-menu ${menuOpen ? "active" : ""}`}
          style={{
            visibility:
              menuOpen || window.innerWidth >= 768 ? "visible" : "hidden",
          }}
        >
          {navLinks.slice(1, 5).map((link, i) => (
            <li
              key={link.id}
              onClick={() => setMenuOpen(false)}
              className="text-[var(--light-txt-color)] hover:text-[var(--primary-color)] transition-all duration-200 z-50"
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
