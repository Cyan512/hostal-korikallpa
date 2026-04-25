'use client';

import { useState } from 'react';

export default function ContactContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const inputClass =
    'w-full px-4 py-3 bg-white/70 border-b border-stone-400 text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:border-accent transition-colors';

  const contactItems = [
    {
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
      ),
      label: 'Dirección',
      value: 'Portal de las Carnes #236, 1° piso\nPlaza de Armas, Cusco – Perú',
    },
    {
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
          />
        </svg>
      ),
      label: 'Teléfono',
      value: '+51 084 123 456',
    },
    {
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
      ),
      label: 'Email',
      value: 'reservas@qorikallpa.com',
    },
    {
      icon: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
      label: 'Horario',
      value: 'Lunes a Domingo: 24 horas\nRecepción siempre abierta',
    },
  ];

  return (
    <section
      className="py-16"
      style={{
        background:
          'linear-gradient(160deg, #f5f0e8 0%, #ede8d8 50%, #e8dfc8 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* LEFT — Form (3 cols) */}
          <div
            className="lg:col-span-3 p-8"
            style={{
              background: 'linear-gradient(160deg, #faf6ee 0%, #f0ead8 100%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            }}
          >
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.25em] text-stone-500">
                Escríbenos
              </p>
              <h2 className="font-serif text-3xl font-bold text-stone-800 mt-1">
                Envíanos un Mensaje
              </h2>
              <div className="w-10 h-px bg-accent mt-3" />
            </div>

            {isSubmitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-5 border-2 border-accent flex items-center justify-center">
                  <span className="text-accent text-2xl">✦</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-800 mb-2">
                  Mensaje Enviado
                </h3>
                <p className="text-sm text-stone-500 mb-6 leading-relaxed">
                  Gracias por contactarnos.
                  <br />
                  Te responderemos a la brevedad.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs uppercase tracking-widest text-accent hover:underline font-semibold"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={inputClass}
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={inputClass}
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={inputClass}
                      placeholder="+51 999 999 999"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                      Asunto *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className={inputClass}
                    >
                      <option value="">Selecciona...</option>
                      <option value="reserva">Reserva</option>
                      <option value="informacion">Información</option>
                      <option value="eventos">Eventos</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`${inputClass} resize-none`}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="flex-1 h-px bg-stone-300" />
                  <span className="text-accent text-xs">✦</span>
                  <div className="flex-1 h-px bg-stone-300" />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-primary-dark text-white text-xs font-semibold uppercase tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-2"
                >
                  Enviar Mensaje
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* RIGHT — Info + map (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Contact info */}
            <div
              className="p-6 space-y-5"
              style={{
                background: 'linear-gradient(160deg, #faf6ee 0%, #f0ead8 100%)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-stone-500">
                  Encuéntranos
                </p>
                <h3 className="font-serif text-xl font-bold text-stone-800 mt-1">
                  Información de Contacto
                </h3>
                <div className="w-8 h-px bg-accent mt-2" />
              </div>

              <div className="space-y-4">
                {contactItems.map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-accent/10 text-accent mt-0.5">
                      {icon}
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">
                        {label}
                      </p>
                      <p className="text-sm text-stone-700 mt-0.5 leading-relaxed whitespace-pre-line">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div
              className="overflow-hidden h-56"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3879.563726427818!2d-71.9690895!3d-13.5319508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916dd60a2f1a1a1b%3A0x1a1a1a1a1a1a1a1a!2sCusco%2C%20Peru!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Qori Kallpa"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
