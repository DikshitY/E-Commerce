import React, { useEffect, useState } from 'react';
import Modal from '../../components/reusable/ReusableModal';
import Form from '../../components/AddProductForm';
import UpdateProductForm from '../../components/UpdateProductForm';
import axios from '../../Axios';
import toast from 'react-hot-toast';
import SortableTable from '../../components/reusable/SortableTable';

const ShowProducts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/v1/products');
      if (data) {
        setProducts(data.products);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const updateProduct = async (product) => {
    setIsUpdateOpen(!isUpdateOpen);
    setSelectedProduct(product)
  };

  const deleteProduct = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const headers = { Authorization: `Bearer ${token}` };
      const { data } = await axios.delete(
        `/api/v1/products/${id}`,
        { headers }
      );
      if (data) {
        toast.success(data.message);
        getAllProducts();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const config = [
    {
      label: 'S.No.',
      render: (product) => ".",
    },
    {
      label: 'Products',
      render: (product) => product.name,
      sortValue: (product) => product.name,
    },
    {
      label: 'Image',
      render: (product) => (
        <img
          src={product.imageUrl}
          className="h-16 min-w-16 rounded object-scale-down"
        />
      ),
    },
    {
      label: 'Brand',
      render: (product) => product.brand,
      sortValue: (product) => product.brand,
    },
    {
      label: 'Category',
      render: (product) => product.category,
      sortValue: (product) => product.name,
    },
    {
      label: 'Quantity',
      render: (product) => product.quantity,
      sortValue: (product) => product.quantity,
    },
    {
      label: 'Price',
      render: (product) => product.price,
      sortValue: (product) => product.price,
    },
    {
      label: 'Actions',
      render: (product) => (
        <div className='flex gap-4'>
          <button className='py-1 px-2 rounded-xl shadow-xl border-2' onClick={() => updateProduct(product)}>Update</button>
          <button className='bg-[#fd0000] border-2 py-1 px-2 rounded-xl text-white shadow-xl' onClick={() => deleteProduct(product._id)}>Delete</button>
        </div>
      ),
    },
  ];

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const modal = (
    <Modal onClose={handleClick}>
      <Form setIsOpen={setIsOpen} getAllProducts={getAllProducts} />
    </Modal>
  );

  const updateModal = (
    <Modal onClose={updateProduct}>
      <UpdateProductForm setIsOpen={setIsUpdateOpen} getAllProducts={getAllProducts} product={selectedProduct}/>
    </Modal>
  )

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className='max-w-screen'>
      <button
        onClick={handleClick}
        className="bg-black text-white px-4 py-2 rounded-2xl mb-8"
      >
        Add New Product
      </button>
      {isOpen && modal}
      {isUpdateOpen && updateModal}
      {products.length > 0 ? (
        <div>
          <SortableTable data={products} config={config} />
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default ShowProducts;
