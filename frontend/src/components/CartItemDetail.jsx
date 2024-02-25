import { useState, useEffect } from 'react';
import {
  useFetchCartQuery,
  useAddItemToCartMutation,
  useDeleteItemFromCartMutation,
  useDeleteSingleItemFromCartMutation,
} from '../store';

const CartItemDetail = ({ item }) => {
  const [isCart, setIsCart] = useState(false);
  const { data } = useFetchCartQuery();
  const [addItemToCart] = useAddItemToCartMutation();
  const [deleteItemFromCart] = useDeleteItemFromCartMutation();
  const [deleteSingleItemFromCart] = useDeleteSingleItemFromCartMutation();

  const handleAddItem = () => {
    addItemToCart(item.itemID._id);
  };

  const handleRemoveItem = () => {
    deleteSingleItemFromCart(item.itemID._id);
  };

  const handleClick = async () => {
    defineCart();

    if (isCart) {
      deleteItemFromCart(item.itemID._id);
    } else {
      addItemToCart(item.itemID._id);
    }
  };

  const defineCart = () => {
    data?.items.some((product) => product.itemID._id == item.itemID._id)
      ? setIsCart(true)
      : setIsCart(false);
  };

  useEffect(() => {
    defineCart(data);
  }, [data]);

  return (
    <div className="flex gap-4 items-center max-sm:flex-col max-sm:w-[46%]">
      <div className="w-1/4 overflow-hidden max-sm:w-full">
        <img className='h-48 object-contain' src={item.itemID.imageUrl} />
      </div>
      <div className="w-3/4 max-sm:w-full">
        <p className="text-md">{item.itemID.name}</p>
        <p className="text-md font-bold tracking-wider">
          Rs.{item.itemID.price}
        </p>
        <p className="text-xs text-yellow-700">{item.itemID.brand}</p>
        <div className='flex gap-2 items-center max-sm:flex-col max-sm:items-start'>
          <div className="flex items-center">
            <button
              disabled={item.quantity == 1}
              onClick={handleRemoveItem}
              className="bg-slate-300 px-2 border border-slate-600 cursor-pointer"
            >
              -
            </button>
            <p className="bg-slate-300 px-2 border-y border-slate-600 cursor-pointer">
              {item.quantity}
            </p>
            <button
              disabled={item.itemID.quantity == item.quantity}
              className="bg-slate-300 px-2 border border-slate-600 cursor-pointer"
              onClick={handleAddItem}
            >
              +
            </button>
          </div>
          <button
            onClick={handleClick}
            className={`${
              isCart ? 'bg-[#ff0000]' : 'bg-[#ff9925]'
            } text-white text-sm font-medium px-4 py-[6px] rounded active:scale-[0.9] transform transition-transform duration-500`}
          >
            {isCart ? 'Remove from cart' : 'Add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemDetail;
