import { IoStar } from 'react-icons/io5';
import { useNavigate } from 'react-router';

function ProductShow({ product }) {
  const navigate = useNavigate();

  const handleShowProduct = (id) => {
    navigate(`${id}`);
  };

  return (
    <div className="product-div bg-white w-44 p-4">
      <div onClick={() => handleShowProduct(product._id)} className="flex justify-center cursor-pointer relative overflow-hidden">
        <img
          src={product.imageUrl}
          className="h-32 object-contain hover:scale-110 transform transition-transform duration-300"
        />
        <button
          className="pl-2 show-btn hidden z-10 absolute bg-blue-300 text-white left-0 right-0 bottom-0"
        >
          Show Product
        </button>
      </div>
      <p className="text-sm font-semibold mt-3">{product.name}</p>
      <p className="text-blue-600 mt-1">Rs.{product.price}</p>
      <p className="text-sm text-yellow-700 mt-1">{product.brand}</p>
      <div className="flex items-center text-sm mt-1">
        <p>{product.rating}</p>
        <p>{<IoStar className="text-yellow-400" />}</p>
        <p className="ml-2">({product.reviews})</p>
      </div>
    </div>
  );
}

export default ProductShow;
