import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Scale, Briefcase, TrendingUp, Shield, Home, Film, Megaphone } from 'lucide-react';

const services = [
  {
    icon: Briefcase,
    title: 'Menajerlik',
    description: 'Yeteneklerin kariyer yönetimi ve stratejik danışmanlık hizmetleri.',
    color: 'primary',
    layer: 'brain'
  },
  {
    icon: Scale,
    title: 'Hukuk',
    description: 'Kurumsal hukuk danışmanlığı ve sözleşme yönetimi.',
    color: 'secondary',
    layer: 'brain'
  },
  {
    icon: TrendingUp,
    title: 'Yatırım',
    description: 'Stratejik yatırım danışmanlığı ve portföy yönetimi.',
    color: 'accent',
    layer: 'heart'
  },
  {
    icon: Shield,
    title: 'Sigorta',
    description: 'Kapsamlı sigorta çözümleri ve risk yönetimi.',
    color: 'primary',
    layer: 'heart'
  },
  {
    icon: Home,
    title: 'Emlak Danışmanlık',
    description: 'Profesyonel gayrimenkul danışmanlığı ve değerleme.',
    color: 'secondary',
    layer: 'eye'
  },
  {
    icon: Film,
    title: 'Prodüksiyon',
    description: 'Yaratıcı içerik üretimi ve medya prodüksiyon hizmetleri.',
    color: 'accent',
    layer: 'eye'
  },
  {
    icon: Megaphone,
    title: 'Reklamcılık',
    description: 'Etkili marka iletişimi ve dijital pazarlama stratejileri.',
    color: 'primary',
    layer: 'eye'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const getColorClass = (color: string) => {
    switch (color) {
      case 'primary':
        return 'text-primary border-primary/30 hover:border-primary hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]';
      case 'secondary':
        return 'text-secondary border-secondary/30 hover:border-secondary hover:shadow-[0_0_30px_hsl(var(--secondary)/0.3)]';
      case 'accent':
        return 'text-accent border-accent/30 hover:border-accent hover:shadow-[0_0_30px_hsl(var(--accent)/0.3)]';
      default:
        return 'text-primary border-primary/30';
    }
  };

  return (
    <section id="services" className="relative py-32 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-chaos-gray/50 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4 block"
          >
            Hizmetlerimiz
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-bold gradient-text mb-6"
          >
            KAOS'UN KATMANLARI
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Beyin, kalp ve göz — üç katmanda bütünleşen hizmetler
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className={`group relative p-8 bg-card/50 backdrop-blur-sm border rounded-lg transition-all duration-500 ${getColorClass(service.color)}`}
            >
              {/* Layer Badge */}
              <div className="absolute top-4 right-4 font-body text-xs uppercase tracking-wider text-muted-foreground">
                {service.layer === 'brain' && '🧠 Beyin'}
                {service.layer === 'heart' && '❤️ Kalp'}
                {service.layer === 'eye' && '👁️ Göz'}
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 ${
                service.color === 'primary' ? 'bg-primary/10 group-hover:bg-primary/20' :
                service.color === 'secondary' ? 'bg-secondary/10 group-hover:bg-secondary/20' :
                'bg-accent/10 group-hover:bg-accent/20'
              }`}>
                <service.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold mb-3 text-foreground">
                {service.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              {/* Hover Arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
