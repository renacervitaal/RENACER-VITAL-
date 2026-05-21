import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, Plus, Check, Heart, Smile, Brain, Sun, Flame, MessageSquare, Trash2 } from 'lucide-react';
import { JournalEntry } from '../types';

interface InteractiveJournalProps {
  onSuccessToast?: (msg: string) => void;
}

export default function InteractiveJournal({ onSuccessToast }: InteractiveJournalProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(true);
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<JournalEntry['mood']>('En calma');
  const [stressLevel, setStressLevel] = useState(5);
  
  // Custom states for habits checklist
  const [habits, setHabits] = useState({
    meditation: false,
    herbalTea: false,
    consciousBreathing: false,
    gratitude: false,
  });

  // Prompt based on chosen mood
  const getPrompt = (currentMood: JournalEntry['mood']) => {
    switch (currentMood) {
      case 'En calma':
        return '¿De qué te sientes agradecido/a en este momento de quietud? Saboréalo.';
      case 'Agotado/a':
        return '¿En qué parte de tu cuerpo se siente la rigidez? Permítete descansar y escribir sin juzgar.';
      case 'Con energía':
        return '¿Cómo planeas canalizar esta vibración de manera armoniosa hoy?';
      case 'Reflexivo/a':
        return '¿Qué pensamiento o ciclo has estado contemplando con frecuencia recientemente?';
      case 'Abrumado/a':
        return 'Suelta la presión. Escribe un listado sencillo de cosas que puedes posponer para mañana.';
      default:
        return 'Escribe libremente todo lo que fluye por tu mente en este momento de pausa...';
    }
  };

  // Pre-load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('renacer_journal_entries');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        console.error("No se pudo cargar el historial del diario", e);
      }
    } else {
      // Add two beautiful default mock history entries to make it attractive and live
      const mockDefault: JournalEntry[] = [
        {
          id: 'mock-1',
          date: new Date(Date.now() - 172800000).toISOString().split('T')[0], // 2 days ago
          mood: 'Reflexivo/a',
          content: 'Hoy visité el parque y observé los árboles. Comprendo que la naturaleza no se apresura, y aun así todo se cumple en armonía. Decidí empezar mi ritual de plantas medicinales al regresar a casa.',
          habits: { meditation: true, herbalTea: true, consciousBreathing: false, gratitude: true },
          stressLevel: 4
        },
        {
          id: 'mock-2',
          date: new Date(Date.now() - 86450000).toISOString().split('T')[0], // 1 day ago
          mood: 'En calma',
          content: 'Tomé el té de hierbas adaptógenas sugerido en el Ritual de calma profunda. Siento mi mente mucho más quieta, libre del ruido del trabajo digital.',
          habits: { meditation: true, herbalTea: true, consciousBreathing: true, gratitude: true },
          stressLevel: 2
        }
      ];
      setEntries(mockDefault);
      localStorage.setItem('renacer_journal_entries', JSON.stringify(mockDefault));
    }
  }, []);

  const saveJournal = (newEntries: JournalEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem('renacer_journal_entries', JSON.stringify(newEntries));
  };

  const handleAddEntry = (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newEntry: JournalEntry = {
      id: 'journal-' + Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString().split('T')[0],
      mood,
      content,
      habits,
      stressLevel
    };

    const updated = [newEntry, ...entries];
    saveJournal(updated);

    // Reset fields
    setContent('');
    setMood('En calma');
    setStressLevel(5);
    setHabits({
      meditation: false,
      herbalTea: false,
      consciousBreathing: false,
      gratitude: false,
    });
    
    if (onSuccessToast) {
      onSuccessToast('Reflexión y microhábitos guardados en tu diario con éxito.');
    }
  };

  const handleDeleteEntry = (id: string) => {
    const filtered = entries.filter(e => e.id !== id);
    saveJournal(filtered);
    if (onSuccessToast) {
      onSuccessToast('Entrada del diario removida del historial local.');
    }
  };

  // Compliant stats solver
  const totalEntries = entries.length;
  const meditationRate = totalEntries > 0 ? Math.round((entries.filter(e => e.habits.meditation).length / totalEntries) * 100) : 0;
  const teaRate = totalEntries > 0 ? Math.round((entries.filter(e => e.habits.herbalTea).length / totalEntries) * 100) : 0;
  const breathRate = totalEntries > 0 ? Math.round((entries.filter(e => e.habits.consciousBreathing).length / totalEntries) * 100) : 0;

  return (
    <div className="bg-white/40 border border-beige-dark rounded-[36px] p-6 sm:p-10 shadow-sm" id="interactive-journal-container">
      
      {/* Editorial Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-beige-dark pb-8 mb-8 gap-4">
        <div>
          <span className="font-mono text-xs text-mustard-brand uppercase tracking-widest font-semibold block mb-1">
            Herramienta Gratuita • Diario de Calma
          </span>
          <h2 className="font-serif font-semibold text-3xl text-olive-brand tracking-tight flex items-center gap-2">
            <BookOpen className="w-7 h-7" /> Cultiva tu Enraizamiento
          </h2>
          <p className="text-sm text-stone-text max-w-xl mt-1.5 leading-relaxed">
            Un espacio personal para registrar tus emociones y sostener microhábitos saludables. Toda la información se almacena de forma privada en tu navegador.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowAddForm(true)}
            className={`px-4 py-2 text-xs font-semibold rounded-full border transition ${
              showAddForm 
                ? 'bg-olive-brand text-beige-warm border-olive-brand' 
                : 'bg-white text-stone-brand border-beige-dark hover:bg-beige-dark'
            }`}
          >
            Nueva Reflexión
          </button>
          <button
            onClick={() => setShowAddForm(false)}
            className={`px-4 py-2 text-xs font-semibold rounded-full border transition ${
              !showAddForm 
                ? 'bg-olive-brand text-beige-warm border-olive-brand' 
                : 'bg-white text-stone-brand border-beige-dark hover:bg-beige-dark'
            }`}
          >
            Historial ({entries.length})
          </button>
        </div>
      </div>

      {showAddForm ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form write section */}
          <form onSubmit={handleAddEntry} className="lg:col-span-8 bg-white/70 p-6 sm:p-8 rounded-[28px] border border-beige-dark/60 space-y-6">
            
            {/* Mood selector list */}
            <div className="space-y-3">
              <label className="block text-xs font-bold tracking-wider text-stone-text uppercase">
                1. ¿Cómo se siente tu calma celular hoy?
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'En calma', icon: <Sun className="w-4 h-4" />, color: 'bg-green-50 text-green-700 border-green-200' },
                  { id: 'Con energía', icon: <Flame className="w-4 h-4" />, color: 'bg-amber-50 text-amber-700 border-amber-200' },
                  { id: 'Reflexivo/a', icon: <Brain className="w-4 h-4" />, color: 'bg-slate-50 text-slate-700 border-slate-200' },
                  { id: 'Agotado/a', icon: <Smile className="w-4 h-4" />, color: 'bg-blue-50 text-blue-700 border-blue-200' },
                  { id: 'Abrumado/a', icon: <MessageSquare className="w-4 h-4" />, color: 'bg-rose-50 text-rose-700 border-rose-200' },
                ].map((item) => {
                  const isSelected = mood === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setMood(item.id as JournalEntry['mood'])}
                      className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full text-xs font-semibold border transition-all ${
                        isSelected 
                          ? 'bg-olive-brand text-beige-warm border-olive-brand ring-2 ring-mustard-brand/30 ring-offset-2' 
                          : 'bg-white text-stone-brand border-beige-dark hover:bg-beige-dark/30'
                      }`}
                    >
                      {item.icon}
                      <span>{item.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Micro habits trackers */}
            <div className="space-y-3">
              <label className="block text-xs font-bold tracking-wider text-stone-text uppercase flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-mustard-brand" /> 2. Registro de Microhábitos Gratuitos
              </label>
              <p className="text-[11px] text-stone-light -mt-1 leading-tight">
                Marca aquellas acciones que realizaste hoy para nutrir tu tranquilidad interior.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {[
                  { key: 'meditation', title: 'Medité al menos 5 minutos', desc: 'Enraizamiento y quietud' },
                  { key: 'herbalTea', title: 'Tomé infusión medicinal', desc: 'Plantas y bienestar gástrico' },
                  { key: 'consciousBreathing', title: 'Respiré consciente (4-7-8)', desc: 'Regular el nervio vago' },
                  { key: 'gratitude', title: 'Escribí algo de gratitud', desc: 'Foco mental positivo' },
                ].map((habit) => {
                  const checked = habits[habit.key as keyof typeof habits];
                  return (
                    <button
                      type="button"
                      key={habit.key}
                      onClick={() => setHabits({ ...habits, [habit.key]: !checked })}
                      className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                        checked 
                          ? 'bg-olive-brand/5 border-olive-brand/60' 
                          : 'bg-white border-beige-dark hover:bg-beige-dark/20'
                      }`}
                    >
                      <div className={`mt-0.5 w-5.5 h-5.5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
                        checked ? 'bg-olive-brand border-olive-brand text-white' : 'border-stone-light/40 bg-white'
                      }`}>
                        {checked && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <div>
                        <span className={`block text-xs font-bold ${checked ? 'text-olive-brand' : 'text-stone-brand'}`}>
                          {habit.title}
                        </span>
                        <span className="block text-[10px] text-stone-light">{habit.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stress regulator */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold tracking-wider text-stone-text uppercase">
                  3. Nivel de Tensión o Estrés Percibido: <span className="font-semibold text-olive-brand">{stressLevel}/10</span>
                </label>
                <span className="text-xs text-stone-light">
                  {stressLevel <= 3 ? 'Estabilidad armónica 🍃' : stressLevel <= 7 ? 'Carga mental moderada 🌊' : 'Estado celular de alerta 🚨'}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={stressLevel}
                onChange={(e) => setStressLevel(parseInt(e.target.value))}
                className="w-full accent-olive-brand h-1.5 bg-beige-dark rounded-full cursor-pointer"
                id="journal-stress-slider"
              />
              <div className="flex justify-between text-[10px] text-stone-light px-1">
                <span>Tranquilidad</span>
                <span>Alerta Intensa</span>
              </div>
            </div>

            {/* Writing Area */}
            <div className="space-y-2">
              <label className="block text-xs font-bold tracking-wider text-stone-text uppercase">
                4. Tu Espacio Reflexivo (Prompt sugerido)
              </label>
              <div className="bg-mustard-brand/5 border-l-2 border-mustard-brand p-3 rounded-r-xl mb-2 text-xs text-stone-brand leading-relaxed">
                <span className="font-semibold block mb-0.5">Semilla para hoy:</span>
                "{getPrompt(mood)}"
              </div>
              <textarea
                rows={5}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escucha tus pensamientos y escríbelos libremente aquí. No busques perfección tipográfica, solo expresa..."
                className="w-full bg-white border border-beige-dark rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-olive-brand/20 focus:border-olive-brand resize-none leading-relaxed"
                id="journal-content-textarea"
              />
            </div>

            <button
              type="submit"
              disabled={!content.trim()}
              className={`w-full py-4 rounded-xl text-xs font-semibold tracking-wider uppercase transition shadow-md ${
                content.trim() 
                  ? 'bg-olive-brand hover:bg-olive-light text-beige-warm hover:shadow-lg' 
                  : 'bg-stone-light/20 text-stone-light cursor-not-allowed'
              }`}
              id="journal-submit-btn"
            >
              Guardar Entrada del Día
            </button>

          </form>

          {/* Quick Stats sidebar info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-olive-brand text-beige-warm p-6 rounded-3xl space-y-4 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-beige-warm/5 rounded-full blur-xl translate-x-5 -translate-y-5" />
              
              <h4 className="font-serif font-semibold text-lg border-b border-beige-warm/20 pb-2">
                Tu Enraizamiento Local
              </h4>

              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>Meditación</span>
                    <span className="font-mono">{meditationRate}% de días</span>
                  </div>
                  <div className="w-full bg-beige-warm/15 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-mustard-brand h-full" style={{ width: `${meditationRate}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>Terapia Herbolaria</span>
                    <span className="font-mono">{teaRate}% de días</span>
                  </div>
                  <div className="w-full bg-beige-warm/15 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-mustard-brand h-full" style={{ width: `${teaRate}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span>Respiración 4-7-8</span>
                    <span className="font-mono">{breathRate}% de días</span>
                  </div>
                  <div className="w-full bg-beige-warm/15 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-mustard-brand h-full" style={{ width: `${breathRate}%` }} />
                  </div>
                </div>
              </div>

              <div className="bg-olive-dark/40 p-3.5 rounded-xl text-xxs text-beige-warm/85 leading-relaxed">
                <strong>¿Sabías qué?</strong> El uso regular de hojas medicinales (como Melissa o Manzanilla) disminuye hasta en un 38% la secreción de cortisol por fatiga emocional crónica.
              </div>
            </div>

            {/* Visual journal banner decoration */}
            <div className="border border-beige-dark/70 rounded-3xl overflow-hidden relative group">
              <img 
                src="/src/assets/images/journaling_calm_1779220428137.png" 
                alt="Journal flatlay" 
                className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 flex flex-col justify-end text-white">
                <span className="text-xxs font-mono text-mustard-brand tracking-widest uppercase font-bold mb-1">
                  Rituales Conscientes
                </span>
                <p className="font-serif text-sm italic font-medium leading-tight">
                  "Florecer requiere paciencia. Escribir es un acto de coraje que echa raíces hacia adentro."
                </p>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* HISTORY PREVIOUS REFLECTIONS LIST */
        <div className="space-y-6">
          {entries.length === 0 ? (
            <div className="text-center py-16 bg-white/40 border border-beige-dark/50 rounded-2xl max-w-md mx-auto space-y-4">
              <BookOpen className="w-10 h-10 text-stone-light/60 mx-auto" />
              <h4 className="font-serif text-lg font-bold text-stone-brand">Tu diario está sediento de reflexiones</h4>
              <p className="text-sm text-stone-text px-6 leading-relaxed">
                Aún no has guardado entradas locales. Haz clic en "Nueva Reflexión" arriba y siembra tu primer momento de pausa mental.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-olive-brand hover:bg-olive-light text-beige-warm px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition"
              >
                Comenzar ahora
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entries.map((entry) => (
                <div 
                  key={entry.id} 
                  className="bg-white/80 p-5 rounded-2xl border border-beige-dark flex flex-col justify-between hover:shadow-md transition"
                >
                  <div className="space-y-3.5">
                    {/* Entry Header */}
                    <div className="flex justify-between items-start gap-2 border-b border-beige-dark pb-2">
                      <div>
                        <span className="text-xxs font-mono text-stone-light block">
                          {entry.date}
                        </span>
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-olive-brand mt-0.5">
                          <span>Estado: {entry.mood}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-beige-dark/50 px-2.5 py-1 rounded-full text-[10px] text-stone-brand font-semibold">
                        <span>Estrés: {entry.stressLevel}/10</span>
                      </div>
                    </div>

                    {/* Entry Text Content */}
                    <p className="text-xs text-stone-text leading-relaxed italic line-clamp-4 select-text">
                      "{entry.content}"
                    </p>

                    {/* Habits Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {entry.habits.meditation && (
                        <span className="text-[9px] font-bold bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full uppercase">
                          🧘‍♀️ Medité
                        </span>
                      )}
                      {entry.habits.herbalTea && (
                        <span className="text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full uppercase">
                          🍵 Té Hierbas
                        </span>
                      )}
                      {entry.habits.consciousBreathing && (
                        <span className="text-[9px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full uppercase">
                          💨 Respiré 4-7-8
                        </span>
                      )}
                      {entry.habits.gratitude && (
                        <span className="text-[9px] font-bold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full uppercase">
                          🙏 Gratitud
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Delete trigger */}
                  <div className="flex justify-end pt-4 border-t border-beige-dark/50 mt-4">
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-stone-light hover:text-rose-600 transition p-1"
                      title="Eliminar esta entrada"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
