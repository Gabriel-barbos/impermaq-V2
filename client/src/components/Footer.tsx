import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import Logo from "../assets/logo.jpg"

const Footer: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const { admin } = useAdmin();

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
  
    if (cleaned.length === 13) {
      return `(${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`;
    } else if (cleaned.length === 12) {
      return `(${cleaned.slice(2, 4)}) ${cleaned.slice(4, 8)}-${cleaned.slice(8)}`;
    } else {
      return phone;
    }
  }

  const handleLogoClick = () => {
    setClickCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount === 4) {
        window.location.href = "https://impermaq-views.vercel.app/login"; // Redirecionar para a página de login
      }
      return newCount;
    });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="section-container pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center space-x-2 mb-6" onClick={handleLogoClick}>
              <img 
                src={Logo}
                className='h-10 w-auto'
                alt="Logo"
              />
              <h2 className="text-xl font-bold">Impermaq</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Soluções industriais avançadas para impulsionar a produtividade e qualidade da sua empresa.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block after:content-[''] after:block after:w-10 after:h-1 after:bg-brand-yellow after:mt-2">Contato</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">Rua Dom Manuel O Venturos, 40 </li>
              <li className="text-gray-400">03806-100 São Paulo</li>
              <li className="text-gray-400">{admin?.email || "Carregando..."}</li>
              <li className="text-gray-400"> {admin?.telefone ? formatPhoneNumber(admin.telefone) : "Carregando telefone..."}</li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 Desenvolvido por Gabriel Barbosa. Todos os direitos reservados.
          </p>
          <button 
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-gray-400 hover:text-brand-yellow transition-colors"
          >
            <span>Voltar ao topo</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
