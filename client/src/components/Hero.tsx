
import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import imagem from "../assets/main.jpg"
import { FaWhatsapp } from 'react-icons/fa';
import { useAdmin } from '@/hooks/useAdmin';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleScrollDown = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

    const { admin } = useAdmin();
  

  const redirectToWhatsApp = () => {
    if (admin?.telefone) {
      const formattedPhone = admin.telefone.replace(/\D/g, '');
      const url = `https://wa.me/${formattedPhone}`;
      window.open(url, '_blank');
    } else {
      alert('Número de telefone do administrador não disponível.');
    }
  };

    const navigate = useNavigate();
  
    const handleClick = () => {
      navigate('/catalog');
    }

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center bg-white overflow-hidden pt-16"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-[20%] w-72 h-72 bg-brand-yellow/20 rounded-full filter blur-3xl animate-pulse-gentle"></div>
        <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-brand-yellow/10 rounded-full filter blur-3xl animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="absolute top-1/4 left-10 w-16 h-16 border-2 border-brand-yellow/30 rounded-md animate-spin-slow"></div>
      <div className="absolute bottom-1/4 right-10 w-8 h-8 bg-brand-yellow/30 rounded-full animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-brand-yellow rounded-full animate-pulse-gentle"></div>

      <div className="container mx-auto px-4 md:px-8 z-10 pt-10 md:pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text content */}
          <div className="order-2 md:order-1">
            <div 
              ref={(el) => (elementsRef.current[0] = el)} 
              className="appear-animate"
            >
              <span className="inline-block px-3 py-1 mb-4 bg-brand-yellow/10 text-brand-yellow-dark text-sm font-medium rounded-full">
                Tecnologia Industrial de Ponta
              </span>
            </div>
            
            <h1 
              ref={(el) => (elementsRef.current[1] = el)} 
              className="heading-xl mb-6 appear-animate stagger-1"
            >
              Transforme sua <span className="text-brand-yellow">produção</span> com nossas máquinas
            </h1>
            
            <p 
              ref={(el) => (elementsRef.current[2] = el)} 
              className="text-lg text-gray-600 mb-8 appear-animate stagger-2 max-w-lg"
            >
              Oferecemos soluções industriais de alta performance para aumentar a eficiência da sua empresa com tecnologia de ponta e suporte completo.
            </p>
            
            <div 
              ref={(el) => (elementsRef.current[3] = el)} 
              className="flex flex-wrap gap-4 appear-animate stagger-3"
            >
              <button className="btn-primary"
              onClick={handleClick}
              >Ver Catálogo
              
              </button>

              <button
            className="btn-secondary transition-all duration-300 ease-in-out transform hover:bg-green-500 hover:text-white hover:scale-105 flex items-center gap-2"
            onClick={redirectToWhatsApp}
          >
            <FaWhatsapp className="text-xl" />
            Fale com Especialista
          </button>
            </div>
          </div>
          
          {/* Image */}
          <div 
            ref={(el) => (elementsRef.current[4] = el)} 
            className="order-1 md:order-2 appear-animate"
          >
            <div className="relative">
              <div className="w-full h-[350px] md:h-[450px] bg-gray-100 rounded-2xl overflow-hidden glass-panel">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-brand-yellow/5 to-transparent">
                    <div className="w-full h-full flex items-center justify-center">
                     <img src={imagem}/>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-brand-yellow rounded-xl flex items-center justify-center shadow-lg animate-float">
                <div className="text-center">
                  <div className="text-3xl font-bold">10+</div>
                  <div className="text-xs font-medium">Anos de Experiência</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button 
          onClick={handleScrollDown}
          className="flex flex-col items-center text-gray-500 hover:text-brand-yellow transition-colors"
        >
        </button>
      </div>
    </section>
  );
};

export default Hero;
