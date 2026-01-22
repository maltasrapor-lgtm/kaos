import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-6 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="font-display text-2xl font-bold gradient-text">K.A.O.S.</span>
              <span className="font-display text-lg text-foreground ml-2">MNG</span>
            </motion.div>
            <p className="font-body text-muted-foreground max-w-md leading-relaxed">
              Kontrollü kaosun gücüyle iş dünyasının karmaşıklığını çözen, 
              bütünleşik danışmanlık hizmetleri sunan multidisipliner bir firma.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-foreground mb-4">
              Hizmetler
            </h4>
            <ul className="space-y-2">
              {['Menajerlik', 'Hukuk', 'Yatırım', 'Sigorta', 'Emlak', 'Prodüksiyon', 'Reklamcılık'].map((item) => (
                <li key={item}>
                  <a href="#services" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-sm uppercase tracking-wider text-foreground mb-4">
              Yasal
            </h4>
            <ul className="space-y-2">
              {['Gizlilik Politikası', 'Kullanım Şartları', 'KVKK', 'Çerez Politikası'].map((item) => (
                <li key={item}>
                  <a href="#" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-muted-foreground">
            © {currentYear} K.A.O.S. MNG. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-body text-xs text-muted-foreground/50">
              Designed with controlled chaos
            </span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
