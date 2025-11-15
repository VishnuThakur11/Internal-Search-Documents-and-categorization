import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Link, Routes , Route } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false); // mobile menu
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(false); // desktop product dropdown
  const [query, setQuery] = useState("");

  // refs and timers for open/close delay
  const openTimer = useRef(null);
  const closeTimer = useRef(null);

  // mock suggestions
  const suggestions = ["Dashboard", "Invoices", "Analytics", "Settings", "Profile"];
  const filtered = query ? suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase())) : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // handlers with delay to avoid hover-gap flicker
  const handleDropdownEnter = () => {
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => setDropdown(true), 120); // open delay
  };
  const handleDropdownLeave = () => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setDropdown(false), 200); // close delay
  };

  // ensure timers cleared on unmount
  useEffect(() => {
    return () => {
      clearTimeout(openTimer.current);
      clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
      aria-label="Main navigation"
    >
      {/* Glassy background */}
      <div className="w-full bg-white/30 backdrop-blur-lg border border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-around items-center px-4">
          {/* LEFT - Logo */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32 }}
            className="text-2xl md:text-3xl font-extrabold py-2"
          >
            <Link to="/" className="inline-block px-2">KDIS</Link>
          </motion.div>

          {/* CENTER - Links (desktop) */}
          <div className="hidden md:flex gap-8 items-center text-lg font-medium">
            {/* Product (hover dropdown with delay) */}
            <div
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <div className="flex items-center gap-2 cursor-pointer select-none px-2 py-1 rounded-md hover:bg-white/10 transition">
                <span>Product</span>
                <ChevronDown size={16} />
              </div>

              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 mt-3 w-48 rounded-xl shadow-2xl p-2 bg-white text-black"
                    onMouseEnter={() => {
                      // keep open while cursor inside dropdown
                      clearTimeout(closeTimer.current);
                    }}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link to="/product/overview" className="block px-4 py-2 rounded hover:bg-gray-100">Overview</Link>
                    <Link to="/product/pricing" className="block px-4 py-2 rounded hover:bg-gray-100">Pricing</Link>
                    <Link to="/product/integrations" className="block px-4 py-2 rounded hover:bg-gray-100">Integrations</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/customer" className="px-2 py-1 rounded-md hover:bg-white/10 transition">Customer</Link>
            <Link to="/solutions" className="px-2 py-1 rounded-md hover:bg-white/10 transition">Solutions</Link>
          </div>

          {/* RIGHT - Search + Sign in (desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="pl-10 pr-3 py-2 rounded-full w-full bg-white/90 text-black outline-none focus:ring-2 focus:ring-blue-300"
              />

              {filtered.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute left-0 mt-2 w-full rounded-lg bg-white shadow-lg overflow-hidden"
                >
                  {filtered.map((s) => (
                    <div
                      key={s}
                      onClick={() => setQuery(s)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {s}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            <Link to="/signin" className="px-4 py-2 bg-blue-600 text-white rounded-full hover:opacity-95 transition">Sign In</Link>
              
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setOpen((s) => !s)} aria-label="Toggle menu" className="p-2">
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white/90 text-black shadow-lg"
            >
              <div className="px-4 py-4 space-y-3">
                <Link to="/" onClick={() => setOpen(false)} className="block py-2 font-medium">Home</Link>

                <details className="group">
                  <summary className="cursor-pointer list-none py-2 flex items-center justify-between">
                    <span>Product</span>
                    <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="pl-4 mt-2 space-y-1">
                    <Link to="/product/overview" onClick={() => setOpen(false)} className="block py-1">Overview</Link>
                    <Link to="/product/pricing" onClick={() => setOpen(false)} className="block py-1">Pricing</Link>
                    <Link to="/product/integrations" onClick={() => setOpen(false)} className="block py-1">Integrations</Link>
                  </div>
                </details>

                <Link to="/customer" onClick={() => setOpen(false)} className="block py-2">Customer</Link>
                <Link to="/solutions" onClick={() => setOpen(false)} className="block py-2">Solutions</Link>

                <div className="relative mt-2">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                  <input type="text" placeholder="Search" className="pl-10 pr-3 py-2 rounded-full w-full bg-gray-100 outline-none" />
                </div>

                <Link to="/signin" onClick={() => setOpen(false)} className="block mt-3 w-full text-center py-2 bg-blue-600 text-white rounded-full">Sign In</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
