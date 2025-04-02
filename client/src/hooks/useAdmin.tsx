import { useState, useEffect } from 'react';

interface Admin {
  _id?: string;
  email: string;
  telefone: string;
  sobre: string;
}

const API_URL = 'https://backend-api-gold-mu.vercel.app/api/admin';

export function useAdmin() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Função para carregar os dados do admin
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Erro ao buscar dados do admin');
        }
        const data: Admin = await response.json();
        setAdmin(data);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  // Função para atualizar os dados do admin
  const updateAdminData = async (updatedAdmin: Admin) => {
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAdmin),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar dados do admin');
      }
      const data: Admin = await response.json();
      setAdmin(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    admin,
    isLoading,
    error,
    updateAdminData,
  };
}