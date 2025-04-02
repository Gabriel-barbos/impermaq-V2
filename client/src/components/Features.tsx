
import React, { useEffect, useRef } from 'react';
import { ShieldCheck, ListChecks, CreditCard, Wrench, BookOpenCheck, HeadsetIcon } from 'lucide-react';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      icon: ShieldCheck,
      title: "Garantia Estendida",
      description: "Todos os nossos equipamentos possuem garantia superior ao mercado."
    },
    {
      icon: ListChecks,
      title: "Manutenção Preventiva",
      description: "Oferecemos serviços de manutenção preventiva"
    },
    {
      icon: CreditCard,
      title: "Melhores Condições",
      description: "Oferecemos condições especiais e preço justo para alavancar seu negócio"
    },
    {
      icon: BookOpenCheck,
      title: "Consultoria",
      description: "Oferecemos serviços de consultoria com expecialistas para sua empresa"
    },
    {
      icon: Wrench,
      title: "Manutenção Corretiva",
      description: "Oferecemos serviço de manutenção corretiva com rapideze eficiência"
    },
    {
      icon: HeadsetIcon,
      title: "Suporte Técnico",
      description: "Equipe especializada disponível para resolver qualquer problema."
    }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (titleRef.current) titleRef.current.classList.add('animate-fade-up');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    const featureObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    featureRefs.current.forEach((feature) => {
      if (feature) featureObserver.observe(feature);
    });

    return () => {
      if (sectionRef.current) sectionObserver.unobserve(sectionRef.current);
      featureRefs.current.forEach((feature) => {
        if (feature) featureObserver.unobserve(feature);
      });
    };
  }, []);

  return (
    <section id="features" className="py-10 bg-white">
      <div className="section-container" ref={sectionRef}>
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <span className="inline-block px-3 py-1 mb-4 bg-brand-yellow/10 text-brand-yellow-dark text-sm font-medium rounded-full">
            Nossos Diferenciais
          </span>
          <h2 className="heading-lg mb-4">Por que escolher nossas <span className="text-brand-yellow">máquinas</span>?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Entregamos mais do que equipamentos de qualidade, oferecemos soluções completas para seu negócio crescer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRefs.current[index] = el)}
              className="p-6 border border-gray-100 rounded-xl hover:border-brand-yellow transition-colors duration-300 bg-white opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-brand-yellow/10 flex items-center justify-center mb-4">
                <feature.icon className="text-brand-yellow" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
