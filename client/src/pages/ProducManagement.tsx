import React, { useState, FormEvent } from 'react';
// Importações dos componentes modernos (ajuste os paths conforme seu setup)
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Product {
  id: number;
  nome: string;
  imagens: string[]; // URLs das imagens
  description: string;
  specifications: string;
  acessories: string;
  condition: 'Novo' | 'Usado';
}

const initialProducts: Product[] = [
  {
    id: 1,
    nome: 'Produto Exemplo',
    imagens: ['https://via.placeholder.com/300x150'],
    description: 'Descrição do produto exemplo',
    specifications: 'Especificações do produto exemplo',
    acessories: 'Acessórios do produto exemplo',
    condition: 'Novo',
  },
];

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [adminInfo, setAdminInfo] = useState({
    email: '',
    telefone: '',
    sobre: '',
  });
  const [isProductDialogOpen, setProductDialogOpen] = useState(false);
  const [isAdminDialogOpen, setAdminDialogOpen] = useState(false);

  // Função para adicionar um novo produto
  const handleAddProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const novoProduto: Product = {
      id: products.length + 1, // Apenas para exemplo; em produção, use IDs únicos
      nome: formData.get('nome') as string,
      imagens: formData.get('imagens') ? [(formData.get('imagens') as string)] : [],
      description: formData.get('description') as string,
      specifications: formData.get('specifications') as string,
      acessories: formData.get('acessories') as string,
      condition: formData.get('condition') as 'Novo' | 'Usado',
    };
    setProducts([...products, novoProduto]);
    setProductDialogOpen(false);
    e.currentTarget.reset();
  };

  // Função para excluir produto
  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Função para atualizar dados do admin
  const handleAdminUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode realizar uma chamada para atualizar os dados no backend
    setAdminDialogOpen(false);
  };

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mb-8">
        <Button onClick={() => setProductDialogOpen(true)}>
          Adicionar Produto
        </Button>
        <Button variant="secondary" onClick={() => setAdminDialogOpen(true)}>
          Editar Informações do Admin
        </Button>
      </div>

      {/* Lista de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="p-4">
            {product.imagens.length > 0 && (
              <img
                src={product.imagens[0]}
                alt={product.nome}
                className="w-full h-32 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-xl font-bold mb-2">{product.nome}</h3>
            <p className="text-sm text-gray-700 mb-4">{product.description}</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => console.log('Editar', product)}>
                Editar
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteProduct(product.id)}
              >
                Excluir
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Dialog para Adicionar Produto */}
      <Dialog open={isProductDialogOpen} onOpenChange={setProductDialogOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Produto</DialogTitle>
          </DialogHeader>
          <form className="grid gap-4 mt-4" onSubmit={handleAddProduct}>
            <div className="grid gap-1">
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" name="nome" required />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="imagens">Imagem (URL)</Label>
              <Input id="imagens" name="imagens" placeholder="https://..." />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" name="description" rows={3} />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="specifications">Especificações</Label>
              <Textarea id="specifications" name="specifications" rows={3} />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="acessories">Acessórios</Label>
              <Input id="acessories" name="acessories" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="condition">Condição</Label>
              <Select name="condition" defaultValue="Novo">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a condição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Novo">Novo</SelectItem>
                  <SelectItem value="Usado">Usado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Salvar Produto</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog para Editar Informações do Admin */}
      <Dialog open={isAdminDialogOpen} onOpenChange={setAdminDialogOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Informações do Admin</DialogTitle>
          </DialogHeader>
          <form className="grid gap-4 mt-4" onSubmit={handleAdminUpdate}>
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={adminInfo.email}
                onChange={(e) =>
                  setAdminInfo({ ...adminInfo, email: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                name="telefone"
                value={adminInfo.telefone}
                onChange={(e) =>
                  setAdminInfo({ ...adminInfo, telefone: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="sobre">Sobre</Label>
              <Textarea
                id="sobre"
                name="sobre"
                value={adminInfo.sobre}
                onChange={(e) =>
                  setAdminInfo({ ...adminInfo, sobre: e.target.value })
                }
                rows={3}
              />
            </div>
            <Button type="submit">Salvar Informações</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;
