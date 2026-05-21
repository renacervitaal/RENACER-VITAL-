import { Check, Star, Users, User, Tv, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { EXPERIENCES, TESTIMONIALS } from '../data';
import { Experience } from '../types';

interface ExperiencesProps {
  onSelectExperience: (exp: Experience) => void;
  setActiveTab: (tab: string) => void;
}

export default function Experiences({ onSelectExperience, setActiveTab }: ExperiencesProps) {
  
  // Custom styled organic borders for each experience to give bespoke artisan look
  const getBespokeBorders = (index: number) => {
    switch (index) {
      case 0:
        return 'rounded-[50px_20px_60px_30px]';
      case 1:
        return 'rounded-[30px_60px_20px_50px]';
      case 2:
        return 'rounded-[45px_15px_45px_30px]';
      default:
        return 'rounded-[40px]';
    }
  };

  return (
    <div className="space-y-24 pb-12 overflow-hidden" id="experiences-view-root">
      
      {/* SECTION 1: ONBOARDING STEPS (TIMELINE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8" id="experiences-onboarding">
        <div className="text-center space-y-3 mb-12">
          <span className="font-mono text-xs text-mustard-brand uppercase tracking-widest font-semibold block">
            Cómo empezar
          </span>
          <h2 className="font-serif font-semibold text-3xl text-stone-brand">
            El camino hacia tu descanso real
          </h2>
          <p className="text-sm text-stone-text max-w-md mx-auto">
            Cuatro momentos simples para desconectar e integrarte con tu propia calma corporal.
          </p>
        </div>

        {/* Horizontal connect timeline line */}
        <div className="relative pt-6 max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute top-[54px] left-8 right-8 h-0.5 border-t border-dashed border-stone-light/30 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10 text-center">
            {[
              { num: '01', title: 'Elige tu experiencia', desc: 'Elige el ritual de relajación, té de plantas y aromaterapia de calma que resuene con tu día.' },
              { num: '02', title: 'Reserva en minutos', desc: 'Agenda tu fecha y hora preferida en Colombia con un proceso de guardado local instantáneo.' },
              { num: '03', title: 'Prepara tu espacio', desc: 'Recibe nuestra guía digital secreta con pequeños pasos de respiración para ambientar tu rincón.' },
              { num: '04', title: 'Vive la experiencia', desc: 'Respira hondo y experimenta el cese de ruido mental que tanto estabas anhelando.' }
            ].map((step, idx) => (
              <div key={idx} className="space-y-3.5 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-beige-dark text-olive-brand border-2 border-white shadow-md flex items-center justify-center font-mono font-bold text-sm">
                  {step.num}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-brand">
                    {step.title}
                  </h4>
                  <p className="text-xs text-stone-text leading-relaxed tracking-normal font-sans font-light max-w-[200px] mt-1 mx-auto">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: EXPERIENCES CATALOG CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="experiences-catalog">
        <div className="text-center space-y-3 mb-16">
          <span className="font-mono text-xs text-mustard-brand uppercase tracking-widest font-semibold block">
            Nuestros Rituales Curados
          </span>
          <h2 className="font-serif font-semibold text-3xl text-stone-brand">
            Programas de Pausa & Enraizamiento
          </h2>
        </div>

        {/* Experiencias Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {EXPERIENCES.map((exp, index) => {
            const isIndividual = exp.id === 'ritual-calma';
            return (
              <div
                key={exp.id}
                className={`flex flex-col justify-between bg-white border border-beige-dark ${getBespokeBorders(index)} p-6 sm:p-7 hover:shadow-2xl hover:border-olive-brand/2 transition-all duration-300 relative group`}
              >
                <div className="space-y-5">
                  
                  {/* Card Thumbnail Image with Bespoke corner-borders */}
                  <div className="relative overflow-hidden aspect-video sm:aspect-square rounded-[30px] border border-beige-dark shadow-sm">
                    <img 
                      src={exp.image} 
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = "https://picsum.photos/seed/spa/800/800";
                      }}
                    />
                    
                    {/* Floating badge for session category */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-olive-brand uppercase border border-beige-dark/50 flex items-center gap-1">
                      {exp.type === 'Individual' && <User className="w-3.5 h-3.5" />}
                      {exp.type === 'Dúo' && <Users className="w-3.5 h-3.5" />}
                      {exp.type === 'Virtual' && <Tv className="w-3.5 h-3.5" />}
                      <span>{exp.type}</span>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-olive-brand text-beige-warm px-3.5 py-1 rounded-full font-mono text-xs font-semibold select-none border border-white/20">
                      {exp.duration}
                    </div>
                  </div>

                  {/* Header Titles */}
                  <div className="space-y-1 text-left">
                    <h3 className="font-serif font-bold text-2xl text-stone-brand group-hover:text-olive-brand transition-colors">
                      {exp.title}
                    </h3>
                    <p className="font-mono text-sm text-mustard-brand font-bold mt-1">
                      {exp.price}
                    </p>
                  </div>

                  {/* Descriptions */}
                  <p className="text-xs text-stone-text leading-relaxed text-left font-sans font-light">
                    {exp.description}
                  </p>

                  <div className="w-full h-px bg-beige-dark/50 pointer-events-none" />

                  {/* Features Bullets with Mustard Checkmarks */}
                  <ul className="space-y-2.5 text-left">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs text-stone-text">
                        <div className="p-0.5 rounded-full bg-mustard-brand/10 border border-mustard-brand/20 mt-0.5 shrink-0">
                          <Check className="w-3 h-3 text-mustard-brand" />
                        </div>
                        <span className="font-sans leading-tight">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                </div>

                {/* Interact Button */}
                <div className="pt-6 mt-6 border-t border-beige-dark/50 text-left">
                  {isIndividual && (
                    <span className="block text-[10px] font-mono font-bold tracking-wider text-mustard-brand uppercase mb-3 text-center bg-mustard-brand/10 py-1 rounded-md">
                      ✨ Recomendado: Contra el ruido mental
                    </span>
                  )}
                  {exp.type === 'Dúo' && (
                    <span className="block text-[10px] font-mono font-bold tracking-wider text-olive-brand uppercase mb-3 text-center bg-olive-brand/10 py-1 rounded-md">
                      💫 Diseñado para compartir
                    </span>
                  )}
                  {exp.type === 'Virtual' && (
                    <span className="block text-[10px] font-mono font-bold tracking-wider text-stone-brand uppercase mb-3 text-center bg-stone-light/10 py-1 rounded-md">
                      🍀 Práctico desde casa
                    </span>
                  )}

                  <button
                    onClick={() => onSelectExperience(exp)}
                    className="w-full bg-olive-brand hover:bg-olive-light text-beige-warm font-sans font-semibold text-xs tracking-widest uppercase py-3.5 rounded-2xl transition shadow-sm hover:shadow-md hover:scale-[1.01]"
                    id={`book-exp-${exp.id}`}
                  >
                    Reservar Experiencia
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: SPECIAL COMMUNITY EXPERIENCE (CÍRCULO DE RENACER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="experiences-communal">
        <div className="bg-olive-brand rounded-[44px] text-beige-warm p-8 sm:p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-beige-warm/5 rounded-full blur-3xl translate-x-12 -translate-y-12 pointer-events-none" />
          
          <div className="lg:col-span-7 space-y-6 text-left max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-1 border border-beige-warm/30 px-3 py-1 rounded-full bg-beige-warm/15 text-xs text-mustard-light font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" /> Aforo Controlado Grupal
            </div>
            
            <h3 className="font-serif font-semibold text-3xl sm:text-4xl text-beige-warm leading-tight">
              Círculo de Renacer <br />
              <span className="text-mustard-light font-normal italic font-serif">
                Herbolaria y Meditación Grupal
              </span>
            </h3>

            <p className="text-beige-warm/85 text-sm leading-relaxed font-sans font-light">
              Nuestras sesiones grupales mensuales están diseñadas para conectar almas inquietas en búsqueda de enraizamiento común. Compartiremos una fogata de meditación guiada con música en vivo de vibración sutil, taller interactivo de sahumación y armado de infusiones medicinales botánicas con material orgánico incluido.
            </p>

            <div className="bg-olive-dark/45 p-4.5 rounded-2xl border border-white/10 flex flex-wrap gap-4 text-xs font-mono">
              <div>
                <strong className="text-mustard-light block">AFORO MÍNIMO:</strong>
                <span>5 personas</span>
              </div>
              <div className="w-px h-8 bg-beige-warm/20 hidden sm:block" />
              <div>
                <strong className="text-mustard-light block">DURACIÓN:</strong>
                <span>3 horas completas</span>
              </div>
              <div className="w-px h-8 bg-beige-warm/20 hidden sm:block" />
              <div>
                <strong className="text-mustard-light block">VALOR:</strong>
                <span>$75.000 COP c/u</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 relative z-10 w-full lg:w-auto text-center lg:text-right">
            <button
              onClick={() => {
                const circleExperience: Experience = {
                  id: 'circulo-renacer',
                  title: 'Círculo de Renacer (Grupal)',
                  type: 'Virtual', // Treated as custom slot
                  duration: '3 horas',
                  price: '$75.000 COP',
                  priceValue: 75000,
                  description: 'Espacio curado grupal de meditación, sahumos e infusiones orgánicas.',
                  longDescription: 'Únete a otras almas en busca de quietud. Incluye todo el material orgánico y una tarde maravillosa guiada de sanación herbolaria.',
                  bullets: [
                    'Meditación grupal circular de enraizamiento',
                    'Taller de sahumos y botánica medicinal',
                    'Bebidas de infusión ilimitadas',
                    'Aforo de mínimo 5 personas'
                  ],
                  image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800'
                };
                onSelectExperience(circleExperience);
              }}
              className="w-full sm:w-auto bg-mustard-brand hover:bg-mustard-light text-olive-dark px-10 py-4.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all shadow-md hover:shadow-xl hover:scale-[1.02]"
              id="book-circle-experience"
            >
              Consultar Próximo Círculo
            </button>
          </div>

        </div>
      </section>

      {/* SECTION 4: VALUE BOND INSIGNIA (BONO JOURNALING) */}
      <section className="max-w-4xl mx-auto px-4 text-center" id="experiences-bonus">
        <div className="bg-white/50 border border-beige-dark/70 rounded-[40px] p-8 sm:p-12 relative flex flex-col md:flex-row items-center gap-8 shadow-sm">
          
          <div className="w-32 h-32 shrink-0 border border-beige-dark/80 rounded-full overflow-hidden self-center select-none shadow-sm relative group">
            <img 
              src="/src/assets/images/journaling_calm_1779220428137.png" 
              alt="Bono diario virtual" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="text-left space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-mustard-brand/10 border border-mustard-brand/25 text-[10px] font-bold tracking-widest text-mustard-brand uppercase font-mono">
              Bono de Valor Agregado Gratuitos
            </div>
            
            <h3 className="font-serif font-semibold text-2xl text-stone-brand leading-tight">
              Herramienta de Journaling & Registro de Hábitos Integrado
            </h3>

            <p className="text-xs text-stone-text leading-relaxed font-sans font-light">
              Todas nuestras experiencias de relajación e incluyen de manera complementaria una insignia de acceso completo a nuestro **Diario de Pausa Virtual**. Te permite registrar tus estados de ánimo cotidianos, realizar un seguimiento de microhábitos de calma y visualizar tu evolución de tranquilidad de manera 100% privada sobre tu navegador.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => {
                  setActiveTab('journal');
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className="bg-olive-brand hover:bg-olive-light text-beige-warm px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase inline-flex items-center gap-2 shadow-sm transition"
                id="view-journal-from-onboarding"
              >
                <BookOpen className="w-3.5 h-3.5" /> Abrir Diario de Pausa Gratis
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: TESTIMONIALS BENTO GRID (VOCES REALES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="experiences-testimonials">
        <div className="text-center space-y-3 mb-16">
          <span className="font-mono text-xs text-mustard-brand uppercase tracking-widest font-semibold block">
            Voces Reales
          </span>
          <h2 className="font-serif font-semibold text-3xl text-stone-brand">
            Testimonios de Comunidad
          </h2>
          <p className="text-sm text-stone-text max-w-md mx-auto">
            Descubre las vivencias de descanso real y reconexión que rejuvenecieron a nuestros jóvenes adultos.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {TESTIMONIALS.map((test, index) => {
            // Let's vary the span for bento grid look
            const gridSpans = [
              'md:col-span-7',  // 1st item large
              'md:col-span-5',  // 2nd item medium
              'md:col-span-5',  // 3rd item medium
              'md:col-span-7',  // 4th item large
            ];
            
            const itemSpan = gridSpans[index % gridSpans.length];

            return (
              <div
                key={test.id}
                className={`${itemSpan} bg-white border border-beige-dark rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:border-olive-brand/20 transition-all`}
              >
                <div className="space-y-4">
                  {/* Testimonial Stars & stamp */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-500 gap-0.5">
                      {[...Array(test.rating)].map((_, sIdx) => (
                        <Star key={sIdx} className="w-4 h-4 fill-mustard-brand text-mustard-brand" />
                      ))}
                    </div>
                    <span className="text-[10px] bg-beige-dark/50 text-stone-brand px-2.5 py-0.5 rounded-full font-mono font-bold tracking-wider uppercase">
                      {test.tag}
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-stone-text leading-relaxed italic text-left select-none font-sans font-light">
                    "{test.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 pt-6 border-t border-beige-dark/40 mt-6 shrink-0">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-11 h-11 rounded-full object-cover border border-beige-dark"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${test.name}`;
                    }}
                  />
                  <div className="text-left">
                    <h4 className="font-serif font-bold text-sm text-stone-brand leading-none">
                      {test.name}
                    </h4>
                    <span className="text-[11px] text-stone-light font-mono mt-1 block">
                      {test.age} años • Medellín
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
