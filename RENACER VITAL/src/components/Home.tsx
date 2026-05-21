import { Waves, Heart, Sprout, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export default function Home({ setActiveTab }: HomeProps) {
  return (
    <div className="space-y-24 pb-12 overflow-hidden" id="home-view-root">
      
      {/* SECTION 1: HERO SECTION */}
      <section className="bg-beige-warm pt-8 pb-16 md:py-20" id="home-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column (Content) */}
            <div className="lg:col-span-7 space-y-6 text-left max-w-xl lg:max-w-none">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-olive-brand/10 border border-olive-brand/20"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-olive-brand animate-ping" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-olive-brand font-sans">
                  Bienvenida a la pausa
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-brand leading-[1.1] font-semibold tracking-tight"
              >
                Florece cuando <br />
                <span className="text-olive-brand font-normal italic pr-2">
                  te das tiempo
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-stone-text text-sm sm:text-base leading-relaxed font-sans font-light max-w-md"
              >
                Sesiones sensoriales guiadas, herbolaria curada y meditación profunda para jóvenes adultos cansados del ruido diario del mundo moderno. Regresa a tu ritmo orgánico.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="pt-4"
              >
                <button
                  onClick={() => {
                    setActiveTab('experiences');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group bg-olive-brand hover:bg-olive-light text-beige-warm text-xs font-semibold tracking-wider uppercase px-8 py-4 rounded-full transition-all inline-flex items-center gap-3.5 shadow-md hover:shadow-lg active:scale-95"
                  id="hero-cta-button"
                >
                  Regálate un momento hoy
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>

            {/* Right Column (Aesthetic Image grid) */}
            <div className="lg:col-span-5 relative flex justify-center">
              
              {/* Backing decorative frame elements */}
              <div className="absolute inset-0 bg-neutral-200/40 rounded-[60px] rotate-3 scale-95 -z-10" />
              
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                whileHover={{ y: -5 }}
                className="relative rounded-[60px] overflow-hidden shadow-2xl border-4 border-white/80 max-w-sm sm:max-w-md aspect-square lg:aspect-auto h-auto w-full"
              >
                <img
                  src="/src/assets/images/hero_meditation_1779220378508.png"
                  alt="Meditación y bienestar botánico"
                  className="w-full h-full object-cover rounded-[60px]"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800";
                  }}
                />
              </motion.div>

              {/* Floating Widget: Estado Celular */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-2 sm:right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-beige-dark max-w-[210px] space-y-1.5 select-none"
                id="floating-widget-state"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold tracking-widest text-olive-brand uppercase font-mono">
                    Estado Celular
                  </span>
                </div>
                <p className="text-xs font-serif italic text-stone-brand font-semibold">
                  En calma profunda
                </p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "20%" }}
                    animate={{ width: "95%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="bg-emerald-500 h-full rounded-full" 
                  />
                </div>
                <p className="text-[9px] font-sans text-stone-light">
                  Frecuencia cardíaca regulada
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: ESENCIA DE MARCA (ESSENCE) */}
      <section className="bg-white py-20 border-y border-beige-dark/40" id="home-essence">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="font-mono text-xs text-mustard-brand uppercase tracking-widest font-semibold">
            Eso es Renacer
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-stone-brand leading-snug">
            ¿Cuándo fue la última vez que respiraste sin prisa?
          </h2>
          
          <div className="w-16 h-[2px] bg-mustard-brand mx-auto my-3" />

          <p className="text-stone-text text-sm sm:text-base leading-relaxed tracking-wide font-light max-w-2xl mx-auto font-sans">
            El cansancio moderno no siempre se alivia solo durmiendo. Muchas veces, tu mente y tu sistema nervioso solo necesitan detener el bombardeo de pantallas, conectar con las plantas medicinales adecuadas y experimentar un espacio donde no hay nada que resolver, donde el único deber es, simplemente, existir en paz.
          </p>
        </div>
      </section>

      {/* SECTION 3: CITA DESTACADA (FEATURED QUOTE) */}
      <section className="relative bg-olive-dark py-28 text-beige-warm overflow-hidden" id="home-quote">
        <div className="absolute inset-0 z-0 opacity-15">
          <img
            src="/src/assets/images/forest_mist_1779220395036.png"
            alt="Fondo natural bosque"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200";
            }}
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-5">
          <span className="text-xxs font-mono text-mustard-light tracking-widest uppercase font-bold">
            Echar Raíces
          </span>
          <blockquote className="font-serif text-2xl sm:text-4xl leading-relaxed italic max-w-3xl mx-auto text-beige-warm">
            "Sembrar una pausa en tu rutina no es perder el tiempo, es nutrir la tierra interna para florecer con muchísima más fuerza."
          </blockquote>
          <div className="text-xs font-mono tracking-widest uppercase text-mustard-light/90 pt-3">
            — Filosofía Renacer Vital
          </div>
        </div>
      </section>

      {/* SECTION 4: DIFERENCIADORES (VALUE PROPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="home-values">
        <div className="text-center space-y-3 mb-16">
          <span className="font-mono text-xs text-mustard-brand uppercase tracking-widest font-semibold block">
            Nuestra Fórmula de Bienestar
          </span>
          <h2 className="font-serif font-semibold text-3xl text-stone-brand">
            Tu camino de retorno al centro
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              id: 'val-1',
              title: 'Reconectamos',
              desc: 'Utilizamos técnicas milenarias de respiración y aromaterapia de espectro completo para calmar el cortisol y la fatiga mental instantáneamente.',
              icon: <Waves className="w-8 h-8 text-mustard-brand transition-colors duration-300" />
            },
            {
              id: 'val-2',
              title: 'Guiamos',
              desc: 'Sesiones personalizadas o en dúo llevadas con compasión, donde cada infusión de hierbas medicinales y cada postura corporal tiene un propósito sagrado.',
              icon: <Heart className="w-8 h-8 text-mustard-brand transition-colors duration-300" />
            },
            {
              id: 'val-3',
              title: 'Acompañamos',
              desc: 'Sostenemos tu evolución diaria con herramientas virtuales gratuitas de journaling y seguimiento de hábitos conscientes para que la calma eche raíces en ti.',
              icon: <Sprout className="w-8 h-8 text-mustard-brand transition-colors duration-300" />
            }
          ].map((item) => (
            <div
              key={item.id}
              className="group bg-white/65 border border-beige-dark p-8 rounded-3xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 block hover:border-olive-brand/20 flex flex-col items-start text-left"
            >
              <div className="p-4 rounded-2xl bg-beige-warm/60 group-hover:bg-olive-brand/10 transition-colors mb-6 shrink-0 inline-block pointer-events-none">
                <div className="group-hover:text-olive-brand">
                  {item.icon}
                </div>
              </div>

              <h3 className="font-serif font-semibold text-xl text-stone-brand mb-3">
                {item.title}
              </h3>
              
              <p className="text-stone-text text-sm leading-relaxed font-sans font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
