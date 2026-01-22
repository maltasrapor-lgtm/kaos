import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./index.css"; // Tailwind burada tanımlı olmalı

gsap.registerPlugin(ScrollTrigger);

function App() {
  const masterRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lenis Smooth Scroll kurulumu
    const lenis = new Lenis({ lerp: 0.05 });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Labirent Zaman Çizelgesi (Sağa -> Aşağı -> Sola -> Sağa Sağa -> Aşağı)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: masterRef.current,
        start: "top top",
        end: "+=600%", // Scroll derinliği (Hız ayarı)
        scrub: 1.5,
        pin: true,
      }
    });

    tl.to(trackRef.current, { x: "-100vw", ease: "power2.inOut" }) // 1. Sağa
      .to(trackRef.current, { y: "-100vh", ease: "power2.inOut" }) // 2. Aşağı
      .to(trackRef.current, { x: "0vw", ease: "power2.inOut" })    // 3. Sola
      .to(trackRef.current, { x: "-200vw", ease: "power2.inOut" }) // 4. Sağa Sağa
      .to(trackRef.current, { y: "-200vh", ease: "power2.inOut" }); // 5. Aşağı (Final)

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={masterRef} className="h-screen w-screen overflow-hidden bg-black text-white selection:bg-red-600 font-mono">
      <div ref={trackRef} className="flex flex-wrap w-[300vw] h-[300vh] relative">
        
        {/* PANEL (0,0): BAŞLANGIÇ */}
        <section className="w-screen h-screen flex items-center justify-center p-10 bg-black">
          <h1 className="text-7xl font-black text-center leading-none">
            HERKESLE AYNI OLUP <br/> 
            <span className="text-zinc-800">FARKLI KAZANAMAZSIN.</span>
          </h1>
        </section>

        {/* PANEL (1,0): SAĞ - MANİFESTO 1 */}
        <section className="w-screen h-screen flex items-center justify-center p-20 bg-zinc-950">
          <p className="text-3xl max-w-4xl leading-relaxed">
            Elinizde dünyanın en iyi işi olabilir. Ama herkesin gittiği yoldan giderek, varılmamış bir yere varamazsınız. 
            Siz, "Usulüne göre olsun, aman başım ağrımasın" diyerek o sıkıcı düzenin parçası oluyorsunuz. 
            <br/><br/>
            <span className="font-black text-red-600">VE BU YÜZDEN GÖRÜNMEZSİNİZ.</span>
          </p>
        </section>

        {/* PANEL (2,0): GEÇİŞ */}
        <div className="w-screen h-screen bg-black"></div>

        {/* PANEL (0,1): SOL - TAŞ ATAN ADAM */}
        <section className="w-screen h-screen flex flex-col items-center justify-center p-20 bg-white text-black">
          <h2 className="text-6xl font-black text-center uppercase">
            BEN O SESSİZ VİTRİNİNİZE <br/> TAŞ ATAN ADAMIM.
          </h2>
        </section>

        {/* PANEL (1,1): ALT - KORKU */}
        <section className="w-screen h-screen flex items-center justify-center p-20 bg-zinc-900">
          <p className="text-3xl max-w-3xl italic border-l-8 border-red-600 pl-10">
            İçten içe biliyorsunuz... "Kuralları biraz bozsam, masayı dağıtsam işler patlayacak" diyorsunuz. 
            Ama korkuyorsunuz. İşte ben, sizin yapamadığınız o hamleyim.
          </p>
        </section>

        {/* PANEL (2,1): SAĞ SAĞ - CAMIN KIRILDIĞI YER */}
        <section className="w-screen h-screen flex flex-col items-center justify-center p-10 bg-black">
           <img src="/logo.jpg" alt="Kaos MNG" className="w-96 h-96 object-contain mb-10" />
           <h2 className="text-5xl font-black text-center italic">ÇÜNKÜ CAM KIRILINCA <br/> HERKES ORAYA BAKAR.</h2>
        </section>

        {/* PANEL (0,2)-(1,2): GEÇİŞ */}
        <div className="w-screen h-screen bg-black"></div>
        <div className="w-screen h-screen bg-black"></div>

        {/* PANEL (2,2): FİNAL */}
        <section className="w-screen h-screen flex flex-col items-center justify-center p-20 bg-black border-t-2 border-zinc-800">
          <h2 className="text-6xl font-black mb-12 text-center">
            CESARETİNİZ VARSA,<br/> GELİN O CAMI BİRLİKTE KIRALIM.
          </h2>
          <button className="px-12 py-6 border-2 border-white text-2xl font-bold hover:bg-white hover:text-black transition-all">
            PROTOKOLÜ BAŞLAT
          </button>
        </section>

      </div>
    </div>
  );
}

export default App;