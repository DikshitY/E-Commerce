import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { IoStar } from 'react-icons/io5';
import toast from 'react-hot-toast';
import {
  useAddItemToCartMutation,
  useFetchCartQuery,
  useDeleteItemFromCartMutation,
} from '../store';

const ProductDetailShow = () => {

  const token = JSON.parse(localStorage.getItem('token'))
  const { data, error, isLoading } = useFetchCartQuery();
  const [addItemToCart] = useAddItemToCartMutation();
  const [deleteItemFromCart] = useDeleteItemFromCartMutation();
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [isCart, setIsCart] = useState(false);

  const handleItemAdd = async () => {
    defineCart();
    if(!token){
      return toast.error('Login or Signup to buy items.')
    }
    if (isCart) {
      deleteItemFromCart(params.id);
      toast.success('Item removed from cart.')
    } else {
      addItemToCart(params.id);
      toast.success('Item added to cart.')
    }
  };

  const defineCart = () => {
    data?.items.some((item) => item.itemID._id === params.id)
      ? setIsCart(true)
      : setIsCart(false);
  };

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/${params.id}`
      );
      setProduct(data.product);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    defineCart(data);
  }, [data]);

  let content;

  if (isLoading) {
    content = (
      <h1 className="pt-20 pb-24 mt-8 text-2xl font-semibold">Loading...</h1>
    );
  } else {
    content = (
      <div className="pt-20 pb-24 min-h-screen flex items-center justify-center">
        <div className="shadow-2xl flex bg-white w-3/4 items-center p-4 gap-8 max-md:flex-col max-md:gap-0">
          <div className="flex justify-center overflow-hidden cursor-pointer w-1/2 max-md:w-full">
            <img className='h-96 object-contain max-md:h-auto' src={product.imageUrl} />
          </div>
          <div className="w-1/2 max-md:w-full max-md:px-4 max-md:pb-4 max-sm:px-0 max-sm:pb-0">
            <p className="text-2xl font-semibold mt-3 max-sm:text-xl">
              {product.name}
            </p>
            <p className="text-3xl font-bold mt-1 max-sm:text-2xl">
              Rs.{product.price}
            </p>
            <p className="text-sm text-yellow-700 mt-1">{product.brand}</p>
            <div className="flex items-center text-sm mt-1">
              <p>{product.rating}</p>
              <p>{<IoStar className="text-yellow-400" />}</p>
              <p className="ml-2">({product.reviews})</p>
            </div>
            <div className="flex flex-col gap-4 my-4 w-full">
              <button
                className={`${isCart ? 'bg-[#ff0000]' : 'bg-[#FB641B]'} text-white font-medium px-4 py-2 rounded active:scale-[0.9] transform transition-transform duration-500`}
                onClick={handleItemAdd}
              >
                {isCart ? 'Remove from cart' : 'Add to cart'}
              </button>
            </div>
            <p className="text-[14px] max-sm:text-xs">
              <span className="font-medium">Descirption:</span>
              {product.description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default ProductDetailShow;
