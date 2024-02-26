import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useFetchCartQuery } from '../store';
import CartItemDetail from '../components/CartItemDetail';
import logo from '../assets/images/amazon_logo.png';

const CartPage = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useFetchCartQuery();
  const token = JSON.parse(localStorage.getItem('token'));
  const user = JSON.parse(localStorage.getItem('user'));
  const itemNumber = data?.items.length;

  const total = data?.items.reduce(
    (acc, item) => acc + item.itemID.price * item.quantity,
    0
  );

  const amount = data?.items.reduce(
    (acc, item) => acc + item.itemID.price * item.quantity * 100,
    0
  );

  let content;
  if (!token) {
    content = (
      <div className="flex flex-col text-center w-full items-center gap-8 max-md:gap-4">
        <h1 className="text-xl font-semibold mt-8 max-md:text-lg">
          LogIn or SignUp to add items in the cart!
        </h1>
        <Link
          to="/login"
          className="border-2 border-black px-4 py-2 rounded-md hover:scale-100 transform transition-all duration-200 font-semibold hover:border-3 hover:font-bold hover:text-xl"
        >
          Login
        </Link>
      </div>
    );
  } else if (itemNumber < 1) {
    content = (
      <div className="flex flex-col text-center w-full items-center gap-8 max-md:gap-4">
        <h1 className="text-3xl font-semibold mt-8 max-md:text-2xl">
          No item in the cart!
        </h1>
        <Link
          to="/products"
          className="border-2 border-black px-4 py-2 rounded-md hover:scale-100 transform transition-all duration-200 font-semibold hover:border-3 hover:font-bold hover:text-xl"
        >
          Go to products.
        </Link>
      </div>
    );
  } else {
    content = (
      <div className="w-3/4 max-md:w-full">
        <div>
          <hr className="my-2" />
          {isLoading ? (
            <h1 className="font-semibold text-xl">Loading...</h1>
          ) : (
            <div className="flex flex-col w-full gap-4 max-sm:flex-row max-sm:flex-wrap max-sm:justify-center">
              {data?.items.map((item) => (
                <CartItemDetail key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
        <div></div>
      </div>
    );
  }

  // PAYMENT

  const handlePayment = async (e) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const body = {
      amount,
      currency: 'INR',
      // receiptId: 'asdfgh'
    };

    const response = await fetch('https://e-commerce-cxwb.onrender.com/api/v1/razorpay', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    const order = await response.json();

    var options = {
      key: 'rzp_test_BEpoRjzQAEhiq7',
      amount: total,
      currency: 'INR',
      name: 'Amazon.in',
      description: 'Test Transaction',
      image: logo,
      order_id: order.id,
      handler: async function (response) {
        const body = {
          ...response,
        };
        const validateResponse = await fetch(
          'https://e-commerce-cxwb.onrender.com/api/v1/razorpay/validate',
          {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await validateResponse.json();

        if (!data.success) {
          toast.error('Unable to place order. Try again!');
        }

        navigate('/products');
        toast.success('Order placed successfully.');

        const deleteCart = await fetch(
          'https://e-commerce-cxwb.onrender.com/api/v1/cart',
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const deleteCartData = await deleteCart.json();
        window.location.reload();

      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: '9000090000',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response) {
      toast.error(response.error.description);
    });
    rzp1.open();
    e.preventDefault();
  };

  return (
    <div className="pt-16 pb-24 px-4 justify-between">
      {token && itemNumber > 0 ? (
        <h2 className="text-2xl font-semibold mt-4">Shopping Cart</h2>
      ) : null}
      <div className="flex gap-4 max-md:flex-col max-md:gap-8">
        {content}
        <hr className="" />
        {token && itemNumber > 0 ? (
          <div className="w-1/4 max-sm:w-full">
            <h2 className="text-xl text-gray-500">Price Details</h2>
            <p className="mb-1">
              Subtotal ({itemNumber || 0} {itemNumber > 1 ? 'items' : 'item'}):{' '}
              <span className="font-medium tracking-wide">
                Rs.
                {total || 0}
              </span>
            </p>
            <button
              onClick={handlePayment}
              className="bg-[#FFD814] font-medium px-4 py-2 rounded active:scale-[0.9] transform transition-transform duration-500"
            >
              Proceed to buy
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CartPage;
