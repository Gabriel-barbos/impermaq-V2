import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Info, Wrench } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import useProducts from '@/hooks/useProducts';
import { useAdmin } from '@/hooks/useAdmin';

interface Product {
  _id?: string;
  name: string;
  description: string;
  specifications: string;
  accessories: string;
  condition: string;
  images: string[];
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, loading, error } = useProducts();
  const { admin } = useAdmin();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const foundProduct = products.find((p) => p._id === id) || null;
    setProduct(foundProduct);
    window.scrollTo(0, 0);
  }, [products, id]);

  if (loading || error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">{loading ? 'Carregando produto...' : error ? `Erro: ${error.message}` : 'Produto não encontrado'}</p>
      </div>
    );
  }

  const redirectToWhatsApp = () => {
    if (admin.telefone) {
      const formattedPhone = admin.telefone.replace(/\D/g, ''); // Remove caracteres não numéricos
      const message = `Olá, gostaria de obter o orçamento do ${encodeURIComponent(product.name)}.`; // Mensagem pré-pronta
      const url = `https://wa.me/${formattedPhone}?text=${message}`;
      window.open(url, '_blank');
    } else {
      alert('Número de telefone do administrador não disponível.');
    }
  };



  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="section-container pt-28 px-4">
        <Link to="/" className="flex items-center text-brand-yellow hover:text-brand-yellow-dark mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          <span>Voltar para produtos</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Carrossel de Imagens */}
          <div className=" rounded-xl overflow-hidden relative animate-fade-in">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              className="w-full h-80"
            >
              {product.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img} alt={product.name} className="w-full h-full object-cover rounded-md" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Detalhes do Produto */}
          <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
            <div
              className={`inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full ${product.condition === 'Usado' ? 'bg-brand-yellow/10 text-brand-yellow-dark' : 'bg-blue-100 text-blue-600'}`}
            >
              {product.condition}
            </div>
            <h1 className="heading-lg mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-8">{product.description}</p>

            <div className="flex flex-col md:flex-row gap-4">
              <button className="btn-primary w-full md:w-auto"
              onClick={redirectToWhatsApp}
              >Solicitar orçamento</button>
              <button className="w-full md:w-auto flex items-center gap-2 border-2 border-black bg-white text-black rounded-full px-4 py-2 hover:text-green-500 hover:border-green-500 transition-all"
              onClick={redirectToWhatsApp}
              >
                <FaWhatsapp size={24} />
                Falar com especialistas
              </button>
            </div>
          </div>
        </div>

        {/* Especificações e Acessórios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-white shadow-md p-6 rounded-lg flex items-start gap-4">
            <div>
              <h2 className="font-bold text-lg mb-2">Especificações</h2>
              <p className="text-gray-600">{product.specifications}</p>
            </div>
          </div>

          <div className="bg-white shadow-md p-6 rounded-lg flex items-start gap-4">
            <Wrench size={32} className="text-brand-yellow" />
            <div>
              <h2 className="font-bold text-lg mb-2">Acessórios</h2>
              <p className="text-gray-600">{product.accessories}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
