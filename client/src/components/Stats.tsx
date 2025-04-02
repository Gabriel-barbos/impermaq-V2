
import React, { useEffect, useRef, useState } from 'react';

interface Stat {
  value: number;
  label: string;
  suffix: string;
}

const Stats: React.FC = () => {
  const stats: Stat[] = [
    { value: 10, label: "Anos de Experiência", suffix: "+" },
    { value: 100, label: "Clientes Satisfeitos", suffix: "+" },
    { value: 200, label: "Máquinas Entregues", suffix: "+" },
    { value: 98, label: "Taxa de Satisfação", suffix: "%" }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          entries[0].target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const intervals = stats.map((stat, index) => {
      const duration = 2000; // 2 seconds animation
      const steps = 30;
      const stepValue = stat.value / steps;
      
      return setInterval(() => {
        setCounters(prev => {
          const newCounters = [...prev];
          if (newCounters[index] < stat.value) {
            newCounters[index] = Math.min(
              newCounters[index] + stepValue,
              stat.value
            );
          }
          return newCounters;
        });
      }, duration / steps);
    });
    
    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [isVisible, stats]);

  return (
    <section className="py-16 bg-brand-yellow">
      <div 
        ref={sectionRef}
        className="section-container opacity-0"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="relative inline-flex mb-2">
                <span className="text-5xl font-bold text-white">
                  {Math.floor(counters[index])}
                </span>
                <span className="text-3xl font-bold absolute -right-6 text-white">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-lg font-medium text-black/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
