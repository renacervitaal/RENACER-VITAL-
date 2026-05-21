import { useState } from 'react';
import { Sprout, Heart, Mail, Phone, MapPin, Instagram, MessageCircle } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const [logoError, setLogoError] = useState(false);

  const handleLinkClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-beige-warm border-t-2 border-beige-dark/60 pt-16 pb-12 mt-20 text-stone-brand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-stone-light/20">
          
          {/* Brand Presentation Column */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center">
              {logoError ? (
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-olive-brand flex items-center justify-center shadow-sm">
                    <Sprout className="w-6 h-6 text-beige-warm" />
                  </div>
                  <span className="font-serif italic font-semibold text-2xl tracking-wide text-olive-brand">
                    Renacer Vital
                  </span>
                </div>
              ) : (
                <img
                  src="/input_file_0.png"
                  alt="Logo Renacer Vital Footer"
                  className="h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
                  onError={() => setLogoError(true)}
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
            
            <p className="font-sans text-sm leading-relaxed text-stone-text max-w-sm">
              Creamos santuarios de tiempo en el caos del día a día. Ayudamos a jóvenes adultos a combatir el agotamiento, regular sus emociones y florecer de manera consciente mediante rituales puros de relajación y plantas medicinales.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif font-semibold text-olive-brand tracking-wide text-base">
              Navegar
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => handleLinkClick('home')} 
                  className="hover:text-olive-brand hover:underline transition"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('about')} 
                  className="hover:text-olive-brand hover:underline transition"
                >
                  Quiénes Somos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('experiences')} 
                  className="hover:text-olive-brand hover:underline transition"
                >
                  Catálogo de Experiencias
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('journal')} 
                  className="hover:text-olive-brand hover:underline transition"
                >
                  Tu Diario de Calma
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-serif font-semibold text-olive-brand tracking-wide text-base">
              Contacto y Enraizamiento
            </h4>
            <ul className="space-y-3 text-sm text-stone-text">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-mustard-brand mt-0.5 shrink-0" />
                <span>Bogotá D.C., Colombia — Experiencias presenciales & virtuales</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-mustard-brand shrink-0" />
                <a href="mailto:renacervitaal@gmail.com" className="hover:text-olive-brand break-all select-all">
                  renacervitaal@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-mustard-brand shrink-0" />
                <a 
                  href="https://wa.me/573015981375" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-olive-brand break-all"
                >
                  WhatsApp: +57 301 598 1375
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-mustard-brand shrink-0" />
                <a 
                  href="https://www.instagram.com/renacervitaal?igsh=NmhpdjJ6N3l2eHQ3&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-olive-brand break-all"
                >
                  Instagram: @renacervitaal
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal/Design Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-stone-light gap-4">
          <p>© {new Date().getFullYear()} Renacer Vital. Todos los derechos reservados.</p>
          
          <div className="flex items-center gap-1.5">
            <span>Hecho con</span>
            <Heart className="w-3.5 h-3.5 text-mustard-brand fill-mustard-brand animate-pulse" />
            <span>para tu calma • Inspiración Editorial Suiza</span>
          </div>

          <div className="flex gap-4">
            <a href="#privacy" className="hover:underline">Políticas de Privacidad</a>
            <a href="#terms" className="hover:underline">Términos de Calma</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
