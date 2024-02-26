import mobiles from '../assets/images/15pro.png';
import allProducts from '../assets/images/allProducts.jpg';
import electronics from '../assets/images/lenovoideapad.png';
import appliances from '../assets/images/samsungoven.png';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';

const HomePage = () => {

  return (
    <div className="pt-16 pb-24">
      <Carousel />
        <div className="flex justify-between w-full gap-8 p-8 overflow-x-auto hide-scrollbar max-sm:gap-4 max-sm:p-4">
          <div className="flex flex-col justify-between gap-4 min-w-96 bg-base-100 shadow-xl p-4 rounded-md  max-md:min-w-72 max-sm:min-w-60">
            <h2 className="card-title">Mobiles & SmartPhones</h2>
            <figure className='flex justify-center'>
              <img className='h-48 object-contain' src={mobiles} alt="Mobiles" />
            </figure>
            <div className="card-actions justify-end">
              <Link to={'products?category=Mobile'} className="text-[#007185]">
                See more.
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 min-w-96 bg-base-100 shadow-xl p-4 rounded-md max-md:min-w-72 max-sm:min-w-60">
            <h2 className="card-title">Electronics & Laptops</h2>
            <figure className='flex justify-center'>
              <img className='h-48 object-contain' src={electronics} alt="Electronics" />
            </figure>
            <div className="card-actions justify-end">
              <Link
                to={'products?category=Electronics'}
                className="text-[#007185]"
              >
                See more.
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 min-w-96 bg-base-100 shadow-xl p-4 rounded-md max-md:min-w-72 max-sm:min-w-60">
            <h2 className="card-title">Appliances & TVs</h2>
            <figure className='flex justify-center'>
              <img className='h-48 object-contain' src={appliances} alt="Appliances" />
            </figure>
            <div className="card-actions justify-end">
              <Link to={'products?category=TV'} className="text-[#007185]">
                See more.
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 min-w-96 bg-base-100 shadow-xl p-4 rounded-md max-md:min-w-72 max-sm:min-w-60">
            <h2 className="card-title">All Products</h2>
            <figure className='flex justify-center'>
              <img className='h-48 object-contain' src={allProducts} alt="All Products" />
            </figure>
            <div className="card-actions justify-end">
              <Link to={'products'} className="text-[#007185]">
                See more.
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full gap-8 p-8 overflow-x-auto hide-scrollbar max-sm:gap-4 max-sm:p-4">
          <div className="flex flex-col justify-between gap-4 min-w-96 bg-base-100 shadow-xl p-4 rounded-md  max-md:min-w-72 max-sm:min-w-60">
            <h2 className="card-title">Mobiles & SmartPhones</h2>
            <figure className='flex justify-center'>
              <img className='h-48 object-contain' src={mobiles} alt="Mobiles" />
            </figure>
            <div className="card-actions justify-end">
              <Link to={'products?category=Mobile'} className="text-[#007185]">
                See more.
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 min-w-96 bg-base-100 shadow-xl p-4 rounded-md max-md:min-w-72 max-sm:min-w-60">
            <h2 className="card-title">Electronics & Laptops</h2>
            <figure className='flex justify-center'>
              <img className='h-48 object-contain' src={electronics} alt="Electronics" />
            </figure>
            <div className="card-actions justify-end">
              <Link
                to={'products?category=Electronics'}
                className="text-[#007185]"
              >
                See more.
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 min-w-96 bg-base-100 shadow-xl p-4 rounded-md max-md:min-w-72 max-sm:min-w-60">
            <h2 className="card-title">Appliances & TVs</h2>
            <figure className='flex justify-center'>
              <img className='h-48 object-contain' src={appliances} alt="Appliances" />
            </figure>
            <div className="card-actions justify-end">
              <Link to={'products?category=TV'} className="text-[#007185]">
                See more.
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 min-w-96 bg-base-100 shadow-xl p-4 rounded-md max-md:min-w-72 max-sm:min-w-60">
            <h2 className="card-title">All Products</h2>
            <figure className='flex justify-center'>
              <img className='h-48 object-contain' src={allProducts} alt="All Products" />
            </figure>
            <div className="card-actions justify-end">
              <Link to={'products'} className="text-[#007185]">
                See more.
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
};

export default HomePage;
