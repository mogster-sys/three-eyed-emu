import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AppCard from './AppCard';
import { apps } from '@/data/apps';

gsap.registerPlugin(ScrollTrigger);

const AppPortfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    
    if (!container || !title) return;

    // Animate title on scroll
    gsap.fromTo(title,
      { 
        opacity: 0, 
        y: 50 
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: title,
          start: "top 80%",
          end: "bottom 20%",
        }
      }
    );

    // Animate cards on scroll
    const cards = container.querySelectorAll('.app-card');
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { 
          opacity: 0, 
          y: 60,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 15%",
          },
          delay: index * 0.1
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="min-h-screen py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-5xl font-bold text-center mb-16 text-glow"
        >
          App Portfolio
        </h2>
        
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {apps.map((app) => (
            <div key={app.id} className="app-card">
              <AppCard app={app} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppPortfolio;