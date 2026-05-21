import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, CheckSquare } from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Experiences from './components/Experiences';
import InteractiveJournal from './components/InteractiveJournal';
import MyBookings from './components/MyBookings';
import BookingModal from './components/BookingModal';

import { Experience, Booking } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize Bookings with LocalStorage
  useEffect(() => {
    const savedBookings = localStorage.getItem('renacer_vital_bookings');
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings));
      } catch (e) {
        console.error("No se pudo cargar el historial de reservas", e);
      }
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleConfirmBooking = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('renacer_vital_bookings', JSON.stringify(updated));
    triggerToast(`¡Ritual de "${newBooking.experienceTitle}" agendado con éxito pacífico!`);
  };

  const handleCancelBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('renacer_vital_bookings', JSON.stringify(updated));
    triggerToast('Tu reserva local ha sido cancelada correctamente.');
  };

  const handleSelectExperience = (exp: Experience) => {
    setSelectedExperience(exp);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'about':
        return <About />;
      case 'experiences':
        return (
          <Experiences 
            onSelectExperience={handleSelectExperience} 
            setActiveTab={setActiveTab} 
          />
        );
      case 'journal':
        return <InteractiveJournal onSuccessToast={triggerToast} />;
      case 'bookings':
        return (
          <MyBookings 
            bookings={bookings} 
            onCancelBooking={handleCancelBooking} 
            setActiveTab={setActiveTab} 
          />
        );
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-beige-warm selection:bg-mustard-brand selection:text-white" id="app-root-shell">
      
      {/* Top Fixed Header with glassmorphism */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        bookingCount={bookings.length} 
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Animated Page Transitions using Framer Motion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              id={`view-container-${activeTab}`}
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>

        </div>
      </main>

      {/* Premium Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Booking Dialogue Modal Slider */}
      <AnimatePresence>
        {selectedExperience && (
          <BookingModal
            experience={selectedExperience}
            onClose={() => setSelectedExperience(null)}
            onConfirm={handleConfirmBooking}
          />
        )}
      </AnimatePresence>

      {/* Floating Interactive Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-stone-brand border border-white/15 px-5 py-4 rounded-2xl shadow-xl max-w-sm flex items-start gap-3.5 text-beige-warm select-none"
            id="floating-toast-feedback"
          >
            <div className="p-1 px-1.5 bg-mustard-brand/20 border border-mustard-brand/35 text-mustard-brand rounded-lg shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            
            <div className="flex-1 text-left">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-mustard-brand/90 font-bold mb-0.5">
                Renacer Vital Alerta
              </span>
              <p className="text-xs font-sans tracking-wide leading-relaxed">
                {toastMessage}
              </p>
            </div>

            <button
              onClick={() => setToastMessage(null)}
              className="text-white/40 hover:text-white/80 transition p-1"
              aria-label="Refusar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
