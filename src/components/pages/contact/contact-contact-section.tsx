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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white elegant-shadow elegant-border rounded-sm p-8">
              <h2 className="font-serif text-2xl font-semibold mb-6">
                Envíanos un Mensaje
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 border-2 border-accent rounded-full flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Mensaje Enviado
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Gracias por contactarnos. Te responderemos pronto.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-accent hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-border rounded-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-border rounded-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-border rounded-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="+51 999 999 999"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        Asunto *
                      </label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-4 py-2.5 border border-border rounded-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary"
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
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-border rounded-sm bg-background focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                      placeholder="¿En qué podemos ayudarte?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-3 bg-primary-dark text-white font-medium hover:bg-primary transition-colors"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white elegant-shadow elegant-border rounded-sm p-8">
              <h2 className="font-serif text-2xl font-semibold mb-6">
                Información de Contacto
              </h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-1">Dirección</h4>
                  <p className="text-muted-foreground">
                    Calle Principal 123, Casco Histórico
                    <br />
                    Cusco, Perú
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Teléfono</h4>
                  <p className="text-muted-foreground">+51 984 123 456</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-muted-foreground">
                    reservas@qorikallpa.com
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Horario</h4>
                  <p className="text-muted-foreground">
                    Lunes a Domingo: 24 horas
                    <br />
                    (Recepción siempre abierta)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white elegant-shadow elegant-border rounded-sm overflow-hidden h-80">
              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <div className="text-center">
                  <span className="block text-5xl mb-2">📍</span>
                  <p className="text-muted-foreground">Mapa de ubicación</p>
                  <p className="text-sm text-muted-foreground">Cusco, Perú</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
