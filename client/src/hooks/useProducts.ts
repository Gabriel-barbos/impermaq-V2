import { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  _id?: string;
  name: string;
  description: string;
  specifications: string;
  accessories: string;
  condition: string;
  images: string[]; 
}

const API_URL = 'https://backend-api-gold-mu.vercel.app/api/products'; 

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Buscar todos os produtos
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      const updatedProducts = response.data.map((product: Product) => ({
        ...product,
        images: product.images.map((img) =>
          img.startsWith('http') ? img : `${API_URL}/uploads/${img}`
        ),
      }));
      setProducts(updatedProducts);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  // Criar um novo produto
  const createProduct = async (productData: FormData) => {
    try {
      const response = await axios.post(API_URL, productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProducts((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err as Error);
    }
  };

  // Atualizar um produto
  const updateProduct = async (id: string, productData: FormData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, productData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setProducts((prev) =>
        prev.map((product) => (product._id === id ? response.data : product))
      );
    } catch (err) {
      setError(err as Error);
    }
  };

  // Deletar um produto
  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (err) {
      setError(err as Error);
    }
  };

  // Buscar produtos na carga inicial
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};

export default useProducts;
