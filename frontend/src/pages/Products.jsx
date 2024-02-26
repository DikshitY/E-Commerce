import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../Axios';
import toast from 'react-hot-toast';
import { setProducts, setDummy } from '../store';
import ProductShow from '../components/ProductShow';
import Filters from '../components/Filters';
import { filterSearch } from '../store';

const Products = () => {
  const dispatch = useDispatch();
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const { products, dummy, searchTerm, brand, price, rating } = useSelector(
    ({ products, searchTerm, filter: { price, rating } }) => {
      return {
        products: products.data,
        dummy: products.dummy,
        searchTerm,
        price,
        rating,
      };
    }
  );

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        category
          ? `/api/v1/products?category=${category}`
          : '/api/v1/products'
      );
      dispatch(setProducts(data.products));
      dispatch(setDummy(data.products));
      dispatch(filterSearch(searchTerm));
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [category]);

  const filterPrice = products.filter((product) => {
    if (price) {
      if (price === 'Under 10000') {
        return product.price < 10000;
      } else if (price === '10000-20000') {
        return product.price >= 10000 && product.price < 20000;
      } else if (price === '20000-30000') {
        return product.price >= 20000 && product.price < 30000;
      } else if (price === '30000-50000') {
        return product.price >= 30000 && product.price <= 50000;
      } else return product.price > 50000;
    } else {
      return product;
    }
  });

  const filterRating = filterPrice.filter((product) => {
    if (rating) {
      return Math.round(product.rating) === rating;
    } else {
      return product;
    }
  });

  let content;
  if (filterRating.length > 0) {
    content = filterRating.map((product) => {
      return <ProductShow key={product._id} product={product} />;
    });
  } else if (!dummy.length > 0) {
    content = <h1 className="mt-8 text-2xl font-semibold">Loading...</h1>;
  } else {
    content = <h1 className="mt-8 text-2xl font-semibold">No result found.</h1>;
  }

  return (
    <div className="pt-16 pb-20 flex gap-4 min-h-screen bg-white max-[768px]:flex-col max-[768px]:gap-0">
      <div className="border-2 shadow-2xl p-4 min-w-60 max-[768px]:hidden">
        {<Filters />}
      </div>
      <div
        onClick={() => setFilterOpen(!filterOpen)}
        className="hidden p-4 text-xl font-semibold max-[768px]:block"
      >
        Filters
      </div>
      <div className={`${filterOpen ? 'flex' : 'hidden'} min-[769px]:hidden`}>
        {<Filters />}
      </div>
      <div className="flex flex-wrap justify-center">{content}</div>
    </div>
  );
};

export default Products;
