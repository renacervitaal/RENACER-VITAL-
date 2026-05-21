import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Sparkles, Check, CheckCircle } from 'lucide-react';
import { Experience, Booking } from '../types';

interface BookingModalProps {
  experience: Experience | null;
  onClose: () => void;
  onConfirm: (booking: Booking) => void;
}

export default function BookingModal({ experience, onClose, onConfirm }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow as default
    timeSlot: '16:00',
    customerName: '',
    customerEmail: 'renacervitaal@gmail.com', // Pre-filled default user email!
    participants: experience?.type === 'Dúo' ? 2 : 1,
    aromaPreference: 'Lavanda' as Booking['aromaPreference'],
    specialRequests: '',
  });

  if (!experience) return null;

  const timeSlots = [
    { value: '09:00', label: '09:00 AM — Despertar Consciente' },
    { value: '11:30', label: '11:30 AM — Equilibrio Medio Día' },
    { value: '15:00', label: '03:00 PM — Pausa del Atardecer' },
    { value: '17:30', label: '05:30 PM — Conexión y Ocaso' },
    { value: '19:30', label: '07:30 PM — Calma Nocturna' },
  ];

  const aromas = [
    { id: 'Lavanda', label: 'Lavanda Relajante', desc: 'Para apagar el ruido mental' },
    { id: 'Romero/Eucalipto', label: 'Romero & Eucalipto', desc: 'Limpieza y respiración profunda' },
    { id: 'Rosas/Jazmín', label: 'Rosas y Jazmín Silvestre', desc: 'Amor propio y dulzura cíclica' },
    { id: 'Sin aroma', label: 'Sin Aromas Añadidos', desc: 'Neutralidad absoluta o sensibilidad' },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.customerEmail) {
      alert('Por favor completa tu nombre y correo.');
      return;
    }

    const newBooking: Booking = {
      id: 'book-' + Math.random().toString(36).substring(2, 9),
      experienceId: experience.id,
      experienceTitle: experience.title,
      date: formData.date,
      timeSlot: formData.timeSlot,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      participants: formData.participants,
      aromaPreference: formData.aromaPreference,
      specialRequests: formData.specialRequests,
      createdAt: new Date().toISOString()
    };

    onConfirm(newBooking);
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-brand/60 backdrop-blur-sm"
        id="booking-modal-overlay"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative bg-beige-warm w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden border border-beige-dark flex flex-col max-h-[90vh]"
        id="booking-modal-box"
      >
        
        {/* Header decoration band */}
        <div className="h-2 bg-gradient-to-r from-olive-brand via-mustard-brand to-olive-brand w-full" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-beige-dark/50 hover:bg-beige-dark text-stone-brand transition z-10"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 scrollbar-hide">
              
              {/* Experience mini header */}
              <div className="flex gap-4 items-start border-b border-beige-dark/60 pb-5">
                <img 
                  src={experience.image} 
                  alt={experience.title}
                  className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-beige-dark shadow-sm"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/meditate/200/200";
                  }}
                />
                <div>
                  <div className="inline-flex px-2.5 py-0.5 rounded-full bg-olive-brand/10 text-olive-brand text-xs font-semibold tracking-wide mb-1.5">
                    {experience.type} • {experience.duration}
                  </div>
                  <h3 className="font-serif font-bold text-xl text-stone-brand leading-tight">
                    {experience.title}
                  </h3>
                  <p className="font-mono text-sm text-mustard-brand font-semibold mt-1">
                    {experience.price}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <h4 className="font-serif text-base font-semibold text-olive-brand/90 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-mustard-brand" /> Detalles de tu reserva
                </h4>

                {/* Input Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold tracking-wider text-stone-text uppercase">
                      Tu Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="Ej: Sofía Restrepo"
                      className="w-full bg-white border border-beige-dark rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-olive-brand/20 focus:border-olive-brand"
                      id="booking-name"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold tracking-wider text-stone-text uppercase">
                      Tu Correo de Contacto *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      className="w-full bg-white border border-beige-dark rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-olive-brand/20 focus:border-olive-brand"
                      id="booking-email"
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold tracking-wider text-stone-text uppercase flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-olive-brand" /> Elegir Fecha
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} // from tomorrow
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-white border border-beige-dark rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-olive-brand/20 focus:border-olive-brand"
                      id="booking-date"
                    />
                  </div>

                  {/* Hours Slot */}
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold tracking-wider text-stone-text uppercase flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-olive-brand" /> Elegir Horario
                    </label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full bg-white border border-beige-dark rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-olive-brand/20 focus:border-olive-brand"
                      id="booking-timeslot"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Settings for Category (such as participants count if duo) */}
                {experience.type === 'Dúo' ? (
                  <div className="bg-olive-brand/5 p-4 rounded-2xl border border-olive-brand/10 space-y-1">
                    <p className="text-xs font-bold text-olive-brand uppercase tracking-wider">
                      Participantes: 2 Personas (Fijo en Dúo)
                    </p>
                    <p className="text-xs text-stone-text block">
                      Este paquete incluye el pase sensorial para ti y tu acompañante ideal (amigo/a, pareja, familiar).
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold tracking-wider text-stone-text uppercase">
                      Número de Asistentes: <span className="text-olive-brand font-bold">{formData.participants}</span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={experience.type === 'Virtual' ? 5 : 2}
                      value={formData.participants}
                      onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) })}
                      className="w-full accent-olive-brand cursor-pointer"
                      id="booking-participants"
                    />
                    <div className="flex justify-between text-[10px] text-stone-light">
                      <span>1 persona</span>
                      {experience.type === 'Virtual' && <span>Máx 5 virtuales</span>}
                      {experience.type === 'Individual' && <span>Máx 2 personas</span>}
                    </div>
                  </div>
                )}

                {/* Aromas Preference Selections */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold tracking-wider text-stone-text uppercase">
                    Preferencia Sutil de Aromaterapia
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {aromas.map((aroma) => {
                      const isSelected = formData.aromaPreference === aroma.id;
                      return (
                        <button
                          type="button"
                          key={aroma.id}
                          onClick={() => setFormData({ ...formData, aromaPreference: aroma.id as Booking['aromaPreference'] })}
                          className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                            isSelected
                              ? 'bg-olive-brand/10 border-olive-brand ring-1 ring-olive-brand'
                              : 'bg-white border-beige-dark hover:bg-beige-dark/30'
                          }`}
                        >
                          <div className={`mt-0.5 w-4.5 h-4.5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-olive-brand border-olive-brand text-white' : 'border-stone-light/40'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <div>
                            <span className={`block text-xs font-semibold ${isSelected ? 'text-olive-brand' : 'text-stone-brand'}`}>
                              {aroma.label}
                            </span>
                            <span className="block text-[11px] text-stone-light leading-tight">
                              {aroma.desc}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Special Requests considerations */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold tracking-wider text-stone-text uppercase">
                    Anotaciones sobre salud, alergias o dolores (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="Ej: Sensibilidad a la música alta, dolor lumbar leve, etc."
                    className="w-full bg-white border border-beige-dark rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive-brand/20 focus:border-olive-brand resize-none"
                    id="booking-special-requests"
                  />
                </div>

              </div>
            </div>

            {/* Footer buttons */}
            <div className="bg-beige-dark/30 p-6 flex items-center justify-between border-t border-beige-dark/60 gap-4">
              <button
                type="button"
                onClick={onClose}
                className="text-stone-text hover:text-stone-brand text-sm font-semibold px-4 py-2"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="bg-olive-brand hover:bg-olive-light text-beige-warm px-8 py-3.5 rounded-full text-sm font-semibold tracking-wider uppercase transition shadow-md hover:shadow-lg hover:scale-[1.02]"
                id="booking-submit-btn"
              >
                Agendar Ritual
              </button>
            </div>
          </form>
        ) : (
          /* STEP 2: BEAUTIFUL SUCCESS WELLNESS FEEDBACK */
          <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              className="w-20 h-20 rounded-full bg-olive-brand flex items-center justify-center text-beige-warm shadow-md mb-2"
            >
              <CheckCircle className="w-10 h-10" />
            </motion.div>

            <div className="space-y-2 max-w-md">
              <span className="font-mono text-xs text-mustard-brand uppercase tracking-widest font-bold">
                Tu momento ha sido reservado
              </span>
              <h3 className="font-serif font-bold text-3xl text-stone-brand">
                Florecerás muy pronto, {formData.customerName.split(' ')[0]}
              </h3>
              <p className="text-sm text-stone-text leading-relaxed">
                Hemos bloqueado este ritual de calma para ti. Un correo con las guías de preparación ha sido enviado suavemente a <span className="font-semibold text-olive-brand">{formData.customerEmail}</span>.
              </p>
            </div>

            {/* Resume box */}
            <div className="bg-white/70 p-5 rounded-2xl border border-beige-dark/80 text-left w-full max-w-sm space-y-2.5 text-xs text-stone-text">
              <p className="font-bold text-stone-brand text-sm border-b border-beige-dark pb-1.5 flex justify-between">
                <span>Sesión Confirmada</span>
                <span className="text-mustard-brand font-mono">{experience.price}</span>
              </p>
              <p><strong className="text-stone-brand">Ritual:</strong> {experience.title}</p>
              <p><strong className="text-stone-brand">Fecha:</strong> {formData.date}</p>
              <p><strong className="text-stone-brand">Horario:</strong> {timeSlots.find(t => t.value === formData.timeSlot)?.label || formData.timeSlot}</p>
              <p><strong className="text-stone-brand">Detalles:</strong> {formData.participants} participante(s) • Aroma: {formData.aromaPreference}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md pt-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full bg-olive-brand hover:bg-olive-light text-beige-warm py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition shadow-sm hover:shadow-md"
              >
                Volver a la calma
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
