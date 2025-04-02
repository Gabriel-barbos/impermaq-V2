import React, { useRef, useEffect } from 'react';
import logo from "@/assets/logo.jpg";
import { useAdmin } from '@/hooks/useAdmin';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const { admin } = useAdmin();
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (formRef.current) observer.observe(formRef.current);
    if (infoRef.current) observer.observe(infoRef.current);

    return () => {
      if (formRef.current) observer.unobserve(formRef.current);
      if (infoRef.current) observer.unobserve(infoRef.current);
    };
  }, []);

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

    //Email button
    const redirectToEmail = () => {
      if (admin.email) {
        const url = `mailto:${admin.email}`;
        window.open(url, '_blank');
      } else {
        alert('Endereço de e-mail do administrador não disponível.');
      }
    };

  return (
    <>
      <section className="py-24 bg-white">
        <div className="section-container bg-gray-50 p-10 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Sobre a Nossa Empresa</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-  00 leading-relaxed">
              {admin?.sobre || "Carregando..."}              </p>
            </div>
            <div className="flex justify-center">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 flex items-center justify-center w-full max-w-md">
                <img src={logo} alt="Logo da Empresa" width={300} height={300} className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Contato */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 mb-4 bg-brand-yellow/10 text-brand-yellow-dark text-sm font-medium rounded-full">
              Fale Conosco
            </span>
            <h2 className="heading-lg mb-4">Estamos <span className="text-brand-yellow">prontos</span> para atender você</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Entre em contato para solicitar um orçamento, agendar uma demonstração ou simplesmente tirar suas dúvidas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div 
            ref={infoRef}
            className="lg:col-span-2 bg-white p-8 rounded-xl shadow-md opacity-0"
          >
            <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-brand-yellow/10 flex items-center justify-center mr-4">
                  <Phone className="text-brand-yellow" size={20} />
                </div>
                <div>
                  <p className="font-medium">Telefone</p>
                  <p className="text-gray-600">  {admin?.telefone ? formatPhoneNumber(admin.telefone) : "Carregando telefone..."}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-brand-yellow/10 flex items-center justify-center mr-4">
                  <Mail className="text-brand-yellow" size={20} />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">{admin?.email || "Carregando..."}     </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-brand-yellow/10 flex items-center justify-center mr-4">
                  <MapPin className="text-brand-yellow" size={20} />
                </div>
                <div>
                  <p className="font-medium">Endereço</p>
                  <p className="text-gray-600">Rua Dom Manuel O Venturos, 40 - 03806-100 São Paulo</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="font-medium mb-4">Horário de Atendimento</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 mb-2">Segunda a Sexta: 9h às 18h</p>
              </div>
            </div>
          </div>

          <div 
            ref={formRef}
            className="lg:col-span-3 bg-white p-8 rounded-xl shadow-md opacity-0"
          >
            <h3 className="text-2xl font-bold mb-6">Envie uma Mensagem</h3>
            
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-all"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-all"
                    placeholder="Seu email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block text-gray-700 mb-1">Empresa</label>
                <input
                  type="text"
                  id="company"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-all"
                  placeholder="Nome da empresa"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-1">Assunto</label>
                <select
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-all appearance-none bg-white"
                >
                  <option value="">Selecione uma opção</option>
                  <option value="orcamento">Solicitar Orçamento</option>
                  <option value="demonstration">Agendar Demonstração</option>
                  <option value="support">Suporte Técnico</option>
                  <option value="other">Outros</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-1">Mensagem</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 focus:border-brand-yellow transition-all"
                  placeholder="Como podemos ajudar?"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="btn-primary flex items-center justify-center w-full md:w-auto"
                onClick={redirectToEmail}
              >
                Enviar Mensagem
                <Send size={16} className="ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Contact;
