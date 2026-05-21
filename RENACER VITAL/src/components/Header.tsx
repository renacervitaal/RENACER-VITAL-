import { useState } from 'react';
import { Sprout, Menu, X, Calendar, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookingCount: number;
}

export default function Header({ activeTab, setActiveTab, bookingCount }: HeaderProps) {
  const [logoError, setLogoError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Quiénes Somos' },
    { id: 'experiences', label: 'Experiencias' },
    { id: 'journal', label: 'Diario Virtual' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-beige-warm/80 backdrop-blur-md border-b border-beige-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-mustard-brand/20 rounded-lg p-1"
              id="header-logo-btn"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="flex items-center"
              >
                {logoError ? (
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-olive-brand flex items-center justify-center shadow-sm">
                      <Sprout className="w-5 h-5 text-beige-warm" />
                    </div>
                    <span className="font-serif italic font-semibold text-xl tracking-tight text-olive-brand">
                      Renacer Vital
                    </span>
                  </div>
                ) : (
                  <img
                    src="/input_file_0.png"
                    alt="Logo Renacer Vital"
                    className="h-12 w-auto object-contain"
                    onError={() => setLogoError(true)}
                    referrerPolicy="no-referrer"
                  />
                )}
              </motion.div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 text-sm font-medium tracking-wide focus:outline-none transition-colors duration-200 ${
                    isActive 
                      ? 'text-olive-brand font-semibold' 
                      : 'text-stone-text hover:text-olive-brand'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-mustard-brand rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA & Booking Summary button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => handleNavClick('bookings')}
              className={`relative p-2.5 rounded-full transition-colors ${
                activeTab === 'bookings'
                  ? 'bg-olive-brand text-beige-warm'
                  : 'bg-beige-dark/50 text-olive-brand hover:bg-beige-dark'
              }`}
              title="Mis Reservas"
              id="header-bookings-btn"
            >
              <Calendar className="w-5 h-5" />
              {bookingCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-mustard-brand text-beige-warm text-xxs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {bookingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('experiences')}
              className="bg-olive-brand hover:bg-olive-light text-beige-warm px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-sm hover:shadow-md active:scale-95"
              id="header-cta-btn"
            >
              Regálate un momento
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => handleNavClick('bookings')}
              className="relative p-2 rounded-full bg-beige-dark/50 text-olive-brand"
              id="mobile-bookings-indicator"
            >
              <Calendar className="w-5 h-5" />
              {bookingCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-mustard-brand text-beige-warm text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {bookingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-brand hover:text-olive-brand focus:outline-none"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Slidedown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-beige-warm border-b border-beige-dark/60 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? 'bg-olive-brand text-beige-warm font-semibold shadow-sm'
                        : 'text-stone-text hover:bg-beige-dark/40 hover:text-olive-brand'
                    }`}
                    id={`mobile-nav-${item.id}`}
                  >
                    {item.label}
                  </button>
                );
              })}
              
              <div className="pt-4 border-t border-beige-dark/40 mt-4 px-4 flex flex-col gap-3">
                <button
                  onClick={() => handleNavClick('bookings')}
                  className="flex items-center justify-between text-left w-full py-2 text-sm text-stone-text hover:text-olive-brand"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Mis Reservas Guardadas
                  </span>
                  <span className="bg-beige-dark px-2.5 py-0.5 rounded-full text-xs font-semibold text-olive-brand">
                    {bookingCount}
                  </span>
                </button>

                <button
                  onClick={() => handleNavClick('experiences')}
                  className="w-full bg-olive-brand hover:bg-olive-light text-beige-warm py-3 rounded-xl text-sm font-semibold tracking-wider uppercase text-center transition-all shadow-sm"
                  id="mobile-cta-btn"
                >
                  Regálate un momento hoy
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
