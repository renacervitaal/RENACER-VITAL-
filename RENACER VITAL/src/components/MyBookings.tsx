import { Calendar, Clock, Trash2, Heart, Award, ArrowLeft, CalendarCheck2 } from 'lucide-react';
import { Booking } from '../types';

interface MyBookingsProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function MyBookings({ bookings, onCancelBooking, setActiveTab }: MyBookingsProps) {
  return (
    <div className="bg-white/40 border border-beige-dark rounded-[36px] p-6 sm:p-10 shadow-sm" id="bookings-manager-wrapper">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-beige-dark pb-6 mb-8 gap-4">
        <div>
          <span className="font-mono text-xs text-mustard-brand uppercase tracking-widest font-semibold block mb-0.5">
            Gestor Personal • Sincronización en tu Navegador
          </span>
          <h2 className="font-serif font-semibold text-3xl text-olive-brand tracking-tight flex items-center gap-2">
            <CalendarCheck2 className="w-7 h-7" /> Tus Reservas Guardadas
          </h2>
          <p className="text-sm text-stone-text max-w-xl mt-1 leading-relaxed">
            Aquí puedes visualizar o cancelar tus próximos rituales del Renacer Vital. Toda tu información de reservas se guarda de forma segura únicamente de modo local.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveTab('experiences');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-5 py-2.5 bg-olive-brand hover:bg-olive-light text-beige-warm text-xs font-semibold tracking-wider uppercase rounded-full transition shadow-sm hover:shadow-md inline-flex items-center gap-2 shrink-0"
        >
          Explorar Más Experiencias
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white/30 border border-dashed border-beige-dark/80 rounded-[28px] max-w-lg mx-auto space-y-5">
          <Calendar className="w-12 h-12 text-stone-light/50 mx-auto" strokeWidth={1} />
          
          <div className="space-y-1.5 px-6">
            <h4 className="font-serif text-xl font-bold text-stone-brand">No tienes reservaciones planeadas</h4>
            <p className="text-sm text-stone-text leading-relaxed">
              La calma se cultiva dando el primer paso. Explora nuestros rituales personalizados, sesiones de origen agroecológico o virtuales, y regálate ese tiempo que tanto necesitas.
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab('experiences');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-olive-brand hover:bg-olive-light text-beige-warm px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition shadow-md"
            id="bookings-empty-cta"
          >
            Elegir un ritual de relajación
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-beige-dark shadow-sm flex flex-col justify-between hover:shadow-md transition relative overflow-hidden"
              >
                {/* Decorative background circle */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-olive-brand/5 rounded-full blur-xl translate-x-4 -translate-y-4" />

                <div className="space-y-4">
                  
                  {/* Booking Header */}
                  <div className="flex justify-between items-start gap-4 pb-3 border-b border-beige-dark">
                    <div>
                      <span className="text-[10px] bg-olive-brand/10 text-olive-brand font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-full">
                        Código: {booking.id.toUpperCase()}
                      </span>
                      <h3 className="font-serif font-bold text-xl text-stone-brand mt-1.5 leading-tight">
                        {booking.experienceTitle}
                      </h3>
                    </div>
                    <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-semibold shrink-0">
                      Confirmada
                    </span>
                  </div>

                  {/* Booking Specifics */}
                  <div className="space-y-2 text-xs text-stone-text">
                    <p className="flex items-center gap-2 font-sans font-light">
                      <Calendar className="w-4 h-4 text-mustard-brand shrink-0" />
                      <span><strong>Fecha:</strong> {booking.date} (Colombia)</span>
                    </p>
                    <p className="flex items-center gap-2 font-sans font-light">
                      <Clock className="w-4 h-4 text-mustard-brand shrink-0" />
                      <span><strong>Horario:</strong> {booking.timeSlot} — Cupo reservado</span>
                    </p>
                    <p className="flex items-center gap-2 font-sans font-light">
                      <Heart className="w-4 h-4 text-mustard-brand shrink-0" />
                      <span><strong>Aroma seleccionado:</strong> {booking.aromaPreference}</span>
                    </p>
                    <p className="flex items-center gap-2 font-sans font-light">
                      <Award className="w-4 h-4 text-mustard-brand shrink-0" />
                      <span><strong>Para:</strong> {booking.customerName} ({booking.customerEmail})</span>
                    </p>
                  </div>

                  {/* Special requests if any */}
                  {booking.specialRequests ? (
                    <div className="bg-beige-warm/70 p-3 rounded-xl border border-beige-dark/50 text-[11px] font-sans font-light text-stone-text italic">
                      "Anotaciones: {booking.specialRequests}"
                    </div>
                  ) : null}

                </div>

                {/* Cancel Trigger */}
                <div className="pt-5 mt-5 border-t border-beige-dark/50 flex justify-between items-center">
                  <span className="text-[10px] text-stone-light">
                    Creada: {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                  
                  <button
                    onClick={() => {
                      if (confirm(`¿Estás seguro/a que deseas cancelar tu reserva para "${booking.experienceTitle}"?\nEsperamos que encuentres otro momento de pausa muy pronto.`)) {
                        onCancelBooking(booking.id);
                      }
                    }}
                    className="flex items-center gap-1.5 text-xs text-stone-light hover:text-rose-600 font-semibold py-1.5 px-3 rounded-lg hover:bg-rose-50/50 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Cancelar Ritual
                  </button>
                </div>

              </div>
            ))}
          </div>

          <div className="bg-olive-brand/5 border border-olive-brand/10 p-5 rounded-2xl max-w-xl mx-auto text-center space-y-1 text-xs">
            <span className="text-olive-brand font-bold block uppercase tracking-wider">
              🍃 Indicaciones de Enraizamiento antes de tu Sesión
            </span>
            <p className="text-stone-text leading-relaxed">
              Intenta apagar tu dispositivo móvil 30 minutos antes de comenzar tu ritual. Evita bebidas energizantes o café cargado. Prepara una muda de ropa de texturas suaves o lino para maximizar tu experiencia sensorial.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
