import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticCursor } from '@/components/MagneticCursor';
import { ParticleCanvas } from '@/components/ParticleCanvas';
import { ExplodingTiles, Tile } from '@/components/ExplodingTiles';
import { ThreeCanvas } from '@/components/ThreeCanvas';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Scroll progress tracking
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // GSAP animations
    gsap.utils.toArray<HTMLElement>('.scroll-animate').forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <MagneticCursor />

      {/* Particle Canvas */}
      <ParticleCanvas />

      {/* 3D Background */}
      <ThreeCanvas />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 z-50" style={{ width: `${scrollProgress * 100}%` }} />

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black opacity-80" />

        <div className="relative z-10 text-center space-y-8 px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="space-y-4"
            data-magnetic
          >
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-none">
              <span className="block text-white">BİZ BİR</span>
              <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                EKİP DEĞİL
              </span>
              <span className="block text-white">YAPIYIZ</span>
            </h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            data-magnetic
          >
            Herkesle aynı olup, <span className="text-orange-400 font-bold">farklı kazanamazsın.</span>
          </motion.p>

          {/* Animated CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.button
              className="px-8 py-3 bg-orange-500 text-black font-black rounded-lg relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-magnetic
            >
              <span className="relative z-10">KAOSA GİR</span>
              <motion.div
                className="absolute inset-0 bg-orange-600"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-orange-500 rounded-full flex items-start justify-center p-2">
              <motion.div
                className="w-1 h-2 bg-orange-500 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="relative w-full min-h-screen py-32 px-8 flex items-center justify-center">
        <div className="max-w-3xl space-y-12 scroll-animate">
          <h2 className="text-6xl md:text-7xl font-black leading-tight" data-magnetic>
            Elinizde dünyanın en iyi işi olabilir.
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed font-light">
            Ama herkesin gittiği yoldan giderek, varılmamış bir yere varamazsınız. Siz, "Usulüne göre olsun" diyerek o sıkıcı düzenin parçası oluyorsunuz.
          </p>

          <p className="text-3xl font-black text-orange-500">
            VE BU YÜZDEN GÖRÜNMEZSİNİZ.
          </p>

          <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-transparent" />

          <p className="text-lg text-gray-300 leading-relaxed font-light">
            İçten içe biliyorsunuz... "Kuralları biraz bozsam, <span className="font-bold text-white">masayı dağıtsam</span> işler patlayacak" diyorsunuz. Ama korkuyorsunuz.
          </p>

          <p className="text-lg text-gray-300 leading-relaxed font-light">
            İşte ben, sizin yapamadığınız o hamleyim. Ben o sessiz vitrininize taş atan adamım. Çünkü cam kırılınca herkes oraya bakar.
          </p>

          <p className="text-4xl font-black text-orange-500 pt-8" data-magnetic>
            CESARETİNİZ VARSA, GELİN O CAMI BİRLİKTE KIRALIM.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative w-full min-h-screen py-32 px-8 flex items-center justify-center overflow-hidden">
        <div className="max-w-6xl w-full">
          <motion.h2
            className="text-6xl md:text-7xl font-black mb-20 text-center scroll-animate"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-magnetic
          >
            Ekip
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'NEŞe', role: 'Kaosun Tepesi', image: '/images/nese.png', delay: 0 },
              { name: 'NAM', role: 'Sert Saha Şefi', image: '/images/nam.png', delay: 0.1 },
              { name: 'GEDİZ', role: 'Görsel Uzman', image: '/images/gediz.png', delay: 0.2 },
              { name: 'PAUL', role: 'Operasyon Şefi', image: '/images/paul.png', delay: 0.3 },
            ].map((member) => (
              <motion.div
                key={member.name}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: member.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                data-magnetic
              >
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-2xl font-black text-white group-hover:text-orange-500 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-400 font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Exploding Tiles */}
      <ExplodingTiles>
        <motion.h2
          className="text-6xl md:text-7xl font-black mb-20 text-center scroll-animate"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          data-magnetic
        >
          Hizmetler
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'EMLAK', desc: 'Gayrimenkul danışmanlığı, değerleme ve yatırım stratejileri', icon: '🏢' },
            { title: 'YATIRIM', desc: 'Finansal danışmanlık, portföy yönetimi ve büyüme stratejileri', icon: '📈' },
            { title: 'EĞİTİM', desc: 'Kişisel gelişim, kurumsal eğitim ve liderlik koçluğu', icon: '🎓' },
            { title: 'REKLAMCILIK', desc: 'Kreatif kampanyalar, marka stratejisi ve pazarlama', icon: '📢' },
            { title: 'TASARIM', desc: 'Görsel kimlik, UX/UI tasarım ve dijital deneyimler', icon: '🎨' },
            { title: 'DANIŞMANLIK', desc: 'İş stratejisi, operasyonel verimlilik ve dönüşüm', icon: '🤝' },
          ].map((service) => (
            <Tile key={service.title}>
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-black text-white mb-2 group-hover:text-orange-500">
                {service.title}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed">{service.desc}</p>
            </Tile>
          ))}
        </div>
      </ExplodingTiles>

      {/* CTA Section */}
      <section className="relative w-full min-h-screen py-32 px-8 flex items-center justify-center">
        <div className="text-center space-y-12 max-w-3xl scroll-animate">
          <h2 className="text-7xl md:text-8xl font-black leading-tight" data-magnetic>
            Cesaretin varsa
          </h2>

          <p className="text-2xl text-gray-300 font-light">
            Gelin, birlikte bu düzeni değiştirelim. Masayı dağıtalım. Camı kıralım.
          </p>

          <motion.button
            className="px-12 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-black text-lg rounded-lg relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-magnetic
          >
            <span className="relative z-10">İLETİŞİM KURUN</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative w-full py-16 px-8 bg-black border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div data-magnetic>
              <h3 className="text-3xl font-black text-white mb-4">K.A.O.S</h3>
              <p className="text-gray-400 font-light">Kaos Yönetim Platformu</p>
            </div>

            <div>
              <h4 className="text-white font-black mb-4">İLETİŞİM</h4>
              <div className="space-y-2 text-gray-400 font-light">
                <p>📧 info@kaosmng.com</p>
                <p>📱 +90 (555) 123-4567</p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-black mb-4">SOSYAL</h4>
              <div className="space-y-2 text-gray-400 font-light">
                <p>LinkedIn</p>
                <p>Instagram</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-gray-500 font-light">
            <p>© 2026 K.A.O.S MNG. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
