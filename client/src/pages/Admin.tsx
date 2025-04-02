import './admin.css';
import { Button, Modal, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../api';
import ProductAdmin from '../../assets/components/product-admin';
import CreateProductForm from '../../assets/components/CreateProductForm';
import { Bolt } from 'lucide-react';

const { TextArea } = Input;

interface Product {
  _id: string;
  [key: string]: any;
}

interface AdminData {
  email?: string;
  telefone?: string;
  sobre?: string;
}

const Admin: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [adminData, setAdminData] = useState<AdminData>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm();

  const fetchAdminData = async () => {
    try {
      const response = await fetch('https://backend-api-gold-mu.vercel.app/api/admin');
      const data = await response.json();
      setAdminData(data);
      form.setFieldsValue(data);
    } catch (error) {
      message.error('Failed to load admin data');
    }
  };

  const showModal2 = () => {
    setIsModalOpen(true);
    fetchAdminData();
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel2 = () => {
    setIsModalOpen(false);
  };

  const handleAdminSubmit = async (values: AdminData) => {
    try {
      const response = await fetch('https://backend-api-gold-mu.vercel.app/api/admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update admin data');
      }

      message.success('Admin data updated successfully');
      setIsModalOpen(false);
    } catch (error) {
      message.error((error as Error).message);
    }
  };

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const getProducts = async () => {
    try {
      const products = await fetchProducts();
      setProducts(products);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = (productId: string) => {
    setProducts(products.filter((product) => product._id !== productId));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="admin-container">
        <div className="admin-page">
          <h1>Gestão de Produtos</h1>
        </div>

        <div className='admin-buttons'>
          <Button type="primary" onClick={showModal} icon={<PlusOutlined />} size={'large'}>
            Adicionar Novo
          </Button>

          <Modal
            open={open}
            title="Adicionar Produto"
            onCancel={handleCancel}
            footer={[
              <Button key="back" danger onClick={handleCancel}>
                Cancelar
              </Button>
            ]}
          >
            <CreateProductForm onSuccess={getProducts} />
          </Modal>

          <Button type="primary" onClick={showModal2}>
            <Bolt />
          </Button>

          <Modal title="Editar Informações" open={isModalOpen} onOk={handleOk} onCancel={handleCancel2}>
            <Form
              form={form}
              layout="horizontal"
              style={{ maxWidth: 600 }}
              onFinish={handleAdminSubmit}
            >
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>

              <Form.Item label="Telefone" name="telefone">
                <Input placeholder="insira o +55" />
              </Form.Item>

              <Form.Item label="Sobre" name="sobre">
                <TextArea rows={4} />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>

      <div className="space-align-container">
        {products.map((product) => (
          <ProductAdmin key={product._id} product={product} onDelete={handleDelete} />
        ))}
      </div>
    </>
  );
};

export default Admin;
