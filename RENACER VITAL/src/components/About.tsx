import { Heart, Compass, Sprout, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { BRAND_VALUES } from '../data';

export default function About() {
  // Let's map static icon components to names
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-6 h-6 text-olive-brand shrink-0" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-olive-brand shrink-0" />;
      case 'Sprout':
        return <Sprout className="w-6 h-6 text-olive-brand shrink-0" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-olive-brand shrink-0" />;
      default:
        return <Sprout className="w-6 h-6 text-olive-brand shrink-0" />;
    }
  };

  return (
    <div className="space-y-24 pb-12 overflow-hidden" id="about-view-root">
      
      {/* SECTION 1: INTRO CONCEPT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8" id="about-intro">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-5 text-left">
            <span className="font-mono text-xs text-mustard-brand uppercase tracking-[0.4em] font-bold block">
              Quiénes Somos
            </span>
            <h2 className="font-serif font-semibold text-3xl sm:text-4xl text-stone-brand tracking-tight leading-snug">
              Regular tus emociones y apagar el estrés de forma 100% natural.
            </h2>
            <div className="w-12 h-0.5 bg-mustard-brand" />
            <p className="text-stone-text text-sm sm:text-base leading-relaxed font-sans font-light">
              Nacimos de la necesidad urgente de desacelerar. Renacer Vital es un ecosistema curado para brindar un respiro genuino a la mente sobreestimulada. Combinamos el herbalismo tradicional de nuestro territorio americano con rituales de quietud mental, devolviéndole la fluidez y el equilibrio a tu vida.
            </p>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="rounded-[32px] overflow-hidden border border-beige-dark shadow-2xl relative"
            >
              <img
                src="/src/assets/images/forest_mist_1779220395036.png"
                alt="Bosque sumergido en niebla y luz"
                className="w-full h-[320px] md:h-[400px] object-cover transition-transform duration-700 hover:scale-[1.03]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200";
                }}
              />
              <div className="absolute inset-0 bg-stone-brand/10 backdrop-blur-xs pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </section>

      {/* SECTION 2: VALUE PROPOSAL AND ORGANIC SLATE */}
      <section className="bg-white py-16 border-y border-beige-dark/40" id="about-proposal">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          
          {/* Proposition text block */}
          <div className="text-center space-y-4">
            <span className="font-mono text-xs text-mustard-brand uppercase tracking-widest font-semibold block">
              Nuestra Propuesta de Valor
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-brand font-medium">
              Acompañamos el ciclo de vida de los jóvenes adultos
            </h3>
            <p className="text-stone-text text-sm sm:text-base leading-relaxed font-light font-sans max-w-2xl mx-auto">
              Vivimos en un entorno híper-conectado con altas expectativas profesionales y sociales que alteran el sueño, sabotean los descansos y saturan el sistema límbico. En Renacer Vital, canalizamos el poder curativo de las plantas medicinales y el descanso introspectivo para diseñar rituales diarios prácticos que modulan tus emociones paso a paso.
            </p>
          </div>

          {/* Special frame quote/mantra with organic borders */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="organic-border bg-beige-dark/40 max-w-2xl mx-auto p-10 sm:p-14 border border-beige-dark text-center shadow-sm select-none"
            id="organic-philosophy-box"
          >
            <span className="font-serif italic font-medium text-lg sm:text-xl text-olive-brand leading-relaxed block max-w-md mx-auto">
              "Buscamos que cada persona encuentre su propio espacio de calma en medio del caos cotidiano."
            </span>
            <div className="text-[10px] font-mono tracking-widest uppercase text-mustard-brand font-semibold mt-4">
              ✨ Propósito Fundacional
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 3: CORE BRAND VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about-values">
        <div className="text-center space-y-3 mb-16">
          <span className="font-mono text-xs text-mustard-brand uppercase tracking-[0.3em] font-semibold block">
            Raíces Fuertes
          </span>
          <h2 className="font-serif font-semibold text-3xl text-stone-brand">
            Nuestros Pilares Fundacionales
          </h2>
          <p className="text-sm text-stone-text max-w-md mx-auto leading-relaxed">
            Nuestras decisiones, rituales y mezclas herbolarias crecen sobre cuatro principios de coherencia y amor.
          </p>
        </div>

        {/* 4 elements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND_VALUES.map((val) => (
            <div
              key={val.id}
              className="bg-white/50 border border-beige-dark p-6 rounded-[28px] space-y-4 hover:shadow-lg hover:border-olive-brand/20 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 w-12 h-12 bg-beige-warm border border-beige-dark/40 rounded-xl flex items-center justify-center">
                  {getIcon(val.icon)}
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-lg text-stone-brand">
                    {val.title}
                  </h4>
                  <span className="text-[10px] font-semibold text-mustard-brand uppercase tracking-wider block">
                    {val.subtitle}
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-text leading-relaxed font-sans font-light">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
