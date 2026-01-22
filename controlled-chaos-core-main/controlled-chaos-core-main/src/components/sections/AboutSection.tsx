import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '150+', label: 'Başarılı Proje' },
  { value: '50+', label: 'Uzman Kadro' },
  { value: '12', label: 'Yıllık Deneyim' },
  { value: '98%', label: 'Müşteri Memnuniyeti' },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div ref={ref}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4 block"
            >
              Hakkımızda
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold mb-8"
            >
              <span className="text-foreground">KAOS'U </span>
              <span className="gradient-text">KONTROL EDEN</span>
              <br />
              <span className="text-foreground">GÜÇTÜR</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-body text-lg text-muted-foreground mb-6 leading-relaxed"
            >
              K.A.O.S. MNG, karmaşık iş dünyasında düzeni yaratmak için kurulmuş multidisipliner bir danışmanlık firmasıdır. 
              Menajerlik, hukuk, finans ve yaratıcı sektörlerde uzmanlaşmış ekibimizle, müşterilerimizin vizyonunu gerçeğe dönüştürüyoruz.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="font-body text-lg text-muted-foreground mb-10 leading-relaxed"
            >
              Her projede kaosun içindeki potansiyeli görür, onu kontrol altına alır ve müşterilerimiz için değere dönüştürürüz. 
              Bizimle çalışmak, belirsizliği avantaja çevirmektir.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-kaos"
            >
              İletişime Geç
            </motion.button>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative p-8 bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg text-center group hover:border-primary/50 transition-all duration-300"
              >
                <div className="font-display text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="font-body text-sm uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>

                {/* Pulse effect on hover */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg pulse-neon" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Philosophy Quote */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-32 text-center"
        >
          <div className="relative inline-block">
            <span className="absolute -top-8 -left-8 text-8xl font-display text-primary/20">"</span>
            <blockquote className="font-display text-2xl md:text-4xl font-light text-foreground max-w-4xl mx-auto leading-relaxed">
              Kaos, düzenin henüz anlaşılmamış halidir.
              <br />
              <span className="gradient-text font-bold">Biz onu anlıyoruz.</span>
            </blockquote>
            <span className="absolute -bottom-8 -right-8 text-8xl font-display text-primary/20">"</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
