import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';

interface Product {
    _id?: string;
    name: string;
    description: string;
    specifications: string;
    accessories: string;
    condition: string;
    images: string[]; 
}

const Catalog: React.FC = () => {
  const { products, fetchProducts, loading } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);
  if (loading) {
    return <p className="text-center py-10">Carregando catálogo...</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Catálogo Completo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product: Product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl overflow-hidden shadow-md card-hover"
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
              <div
                className={`absolute top-4 left-4 px-2 py-1 rounded-md text-xs font-medium ${
                  product.condition === 'Novo'
                    ? 'bg-blue-500 text-white'
                    : 'bg-yellow-500 text-black'
                }`}
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
                Ver detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-16 text-center">
        <Link to="/" className="text-blue-500 hover:underline">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
};

export default Catalog;
