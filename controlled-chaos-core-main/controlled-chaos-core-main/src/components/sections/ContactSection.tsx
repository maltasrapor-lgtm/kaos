import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-chaos-gray/50 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4 block"
          >
            İletişim
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-bold gradient-text"
          >
            KAOS'A KATILIN
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Projelerinizi hayata geçirmek için bizimle iletişime geçin. 
              Kaosun içinden yeni fırsatlar yaratmak için sabırsızlanıyoruz.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">E-posta</p>
                  <p className="font-body text-foreground">info@kaosmng.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Telefon</p>
                  <p className="font-body text-foreground">+90 212 555 00 00</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-body text-sm text-muted-foreground">Adres</p>
                  <p className="font-body text-foreground">Levent, İstanbul, Türkiye</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-border/50">
              <p className="font-body text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Sosyal Medya
              </p>
              <div className="flex gap-4">
                {['LinkedIn', 'Twitter', 'Instagram'].map((social) => (
                  <button
                    key={social}
                    className="px-4 py-2 border border-border/50 rounded-lg font-body text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="font-body text-sm text-muted-foreground mb-2 block">
                  İsim
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-card/50 border border-border/50 rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Adınız Soyadınız"
                />
              </div>
              <div>
                <label className="font-body text-sm text-muted-foreground mb-2 block">
                  E-posta
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-card/50 border border-border/50 rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>

            <div>
              <label className="font-body text-sm text-muted-foreground mb-2 block">
                Konu
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-card/50 border border-border/50 rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                placeholder="Proje hakkında"
              />
            </div>

            <div>
              <label className="font-body text-sm text-muted-foreground mb-2 block">
                Mesaj
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-card/50 border border-border/50 rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Mesajınızı yazın..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-kaos w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Gönderiliyor...
                </>
              ) : submitted ? (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Gönderildi!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Gönder
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
