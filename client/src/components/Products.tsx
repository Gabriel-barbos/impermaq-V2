import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useProducts from '../hooks/useProducts';

interface Product {
  _id: number;
  name: string;
  condition: 'Novo' | 'Usado';
  description: string;
  images?: string[]; // Certifique-se de que os produtos contenham a propriedade images
}

const Products: React.FC = () => {
  const { products, fetchProducts, loading } = useProducts();

  const sectionRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetchProducts(); // Buscar produtos ao carregar a página
  }, []);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          entries[0].target.classList.add('animate-fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    const productObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    productRefs.current.forEach((product) => {
      if (product) productObserver.observe(product);
    });

    return () => {
      if (sectionRef.current) sectionObserver.unobserve(sectionRef.current);
      productRefs.current.forEach((product) => {
        if (product) productObserver.unobserve(product);
      });
    };
  }, [products]);

  if (loading) {
    return <p className="text-center py-10">Carregando produtos...</p>;
  }

  return (
    <section id="products" className="py-1 bg-brand-gray">
      <div className="section-container">
        <div ref={sectionRef} className="text-center mb-16 opacity-0">
          <span className="inline-block px-3 py-1 mb-4 bg-brand-yellow/10 text-brand-yellow-dark text-sm font-medium rounded-full">
            Nossos Produtos
          </span>
          <h2 className="heading-lg mb-4">
            Equipamentos com <span className="text-brand-yellow">tecnologia</span> de ponta
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conheça nossa linha de máquinas industriais projetadas para aumentar a produtividade
            e garantir resultados precisos para sua empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product._id}
              ref={(el) => (productRefs.current[index] = el)}
              className="bg-white rounded-xl overflow-hidden shadow-md card-hover opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-44 bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  {product.images && product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400">Imagem indisponível</div>
                  )}
                </div>

                {/* Exibindo a condição com cores diferentes */}
                <div
                  className={`absolute top-4 left-4 px-2 py-1 rounded-md text-xs font-medium
                    ${product.condition === 'Novo' ? 'bg-blue-500 text-white' : 'bg-yellow-500 text-black'}
                  `}
                >
                  {product.condition}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <Link
                  to={`/product/${product._id}`}
                  className="inline-flex items-center text-brand-yellow hover:text-brand-yellow-dark font-medium transition-colors"
                >
                  Ver detalhes <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/catalog" className="btn-primary inline-block">
            Ver catálogo completo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
