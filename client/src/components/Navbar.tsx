import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/logo.jpg';
import { FaWhatsapp } from 'react-icons/fa';
import { useAdmin } from '@/hooks/useAdmin';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { admin } = useAdmin();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    } else {
      // Se a seção não existe, redireciona para a home
      window.location.href = `/#${id}`;
    }
  };
  

  const redirectToWhatsApp = () => {
    if (admin?.telefone) {
      const formattedPhone = admin.telefone.replace(/\D/g, '');
      const url = `https://wa.me/${formattedPhone}`;
      window.open(url, '_blank');
    } else {
      alert('Número de telefone do administrador não disponível.');
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-md' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <button onClick={() => handleScroll('home')} className="flex items-center space-x-1">
          <img src={Logo} className="h-10 w-auto" alt="Logo" />
          <h1 className="text-xl font-bold">Impermaq</h1>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => handleScroll('home')} className="nav-link">Início</button>
          <button onClick={() => handleScroll('products')} className="nav-link">Produtos</button>
          <button onClick={() => handleScroll('features')} className="nav-link">Diferenciais</button>
          <button onClick={() => handleScroll('contact')} className="nav-link">Contato</button>
        

              <button
                                  className="w-full md:w-auto flex items-center gap-2 border-2 border-black bg-white text-black rounded-full px-4 py-2 hover:text-green-500 hover:border-green-500 transition-all"
                                  onClick={redirectToWhatsApp}
                                >
                                  <FaWhatsapp size={24} />
                                  Falar com especialistas
                                </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <div
        className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <a href="#home" className="text-lg py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
            Início
          </a>
          <a href="#products" className="text-lg py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
            Produtos
          </a>
          <a href="#features" className="text-lg py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
            Diferenciais
          </a>
          <a href="#contact" className="text-lg py-2 border-b border-gray-100" onClick={() => setIsOpen(false)}>
            Contato
          </a>
          <button
            className="w-full md:w-auto flex items-center gap-2 border-2 border-black bg-white text-black rounded-full px-4 py-2 hover:text-green-500 hover:border-green-500 transition-all"
            onClick={redirectToWhatsApp}
          >
            <FaWhatsapp size={24} />
            Falar com especialistas
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
