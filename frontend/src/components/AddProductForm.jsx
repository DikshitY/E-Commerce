import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Form = ({setIsOpen, getAllProducts}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState('');
  const [offer, setOffer] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('brand', brand);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('quantity', quantity);
      formData.append('image', image);
      formData.append('offer', offer);

      const token = JSON.parse(localStorage.getItem('token'));
      const headers = { Authorization: `Bearer ${token}` };

      const { data } = await axios.post(
        'http://localhost:5000/api/v1/products',
        formData,
        { headers }
      );
      if (data) {
        toast.success(data.message);
        setIsOpen(false)
        getAllProducts()
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const handlePriceChange = (e) => {
    const productCost = parseInt(e.target.value) || 0;
    setPrice(productCost);
  };

  const handleQuantityChange = (e) => {
    const productQuantity = parseInt(e.target.value) || 0;
    setQuantity(productQuantity);
  };

  return (
    <div className="w-full hide-scrollbar overflow-y-auto scrollba border-2 rounded-xl shadow-2xl max-sm:w-[300px]">
      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-1 border-2 rounded-xl p-4 shadow-2xl"
      >
        <h1 className="text-[20px] font-bold mb-4">Add New Product</h1>
        <label className="mb-3">
          <p className="font-semibold mb-1">Enter Product Name*</p>
          <input
            type="text"
            placeholder="enter product name"
            className="border-2 w-full rounded-md py-1 px-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="mb-3">
          <p className="font-semibold mb-1">Enter Product Category*</p>
          <input
            type="text"
            className="border-2 w-full rounded-md py-1 px-2"
            placeholder="enter product category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
        <label className="mb-3">
          <p className="font-semibold mb-1">Enter Product Brand*</p>
          <input
            type="text"
            className="border-2 w-full rounded-md py-1 px-2"
            placeholder="enter product brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </label>
        <label className="mb-3">
          <p className="font-semibold mb-1">Enter Product Price*</p>
          <input
            type="number"
            className="border-2 w-full rounded-md py-1 px-2"
            placeholder="enter product price"
            value={price || ''}
            onChange={handlePriceChange}
            required
          />
        </label>
        <label className="mb-2">
          <p className="font-semibold mb-1">Enter Product Description*</p>
          <textarea
            name="description"
            rows="3"
            className="border-2 w-full rounded-md py-1 px-2"
            placeholder="enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </label>
        <label className="mb-3">
          <p className="font-semibold mb-1">Enter Product Quantity*</p>
          <input
            type="number"
            className="border-2 w-full rounded-md py-1 px-2"
            placeholder="enter product quantity"
            value={quantity || ''}
            onChange={handleQuantityChange}
            required
          />
        </label>
        <label className="mb-6">
          <p className="font-semibold mb-1">Upload Product Image*</p>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            name="image"
            onChange={e => setImage(e.target.files[0])}
            required
          />
        </label>
        <label className="mb-3 flex gap-4">
          <p className="font-semibold mb-1">Is Product Under Offer</p>
          <input
            type="checkbox"
            name="offer"
            value={offer}
            onChange={(e) => setOffer(e.target.checked)}
          />
        </label>
        <button className="bg-black text-white py-2 rounded-xl text-[18px]">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Form;
