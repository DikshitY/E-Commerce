import React from 'react';
import contactImg from '../assets/images/contactus.jpeg';
import { BiMailSend, BiPhoneCall, BiSupport } from 'react-icons/bi';

const ContactPage = () => {
  return (
    <div className="pt-20 pb-28 px-16 min-h-screen flex gap-8 items-center justify-center max-md:flex-col max-md:px-4">
      <div className="overflow-hidden rounded-lg">
        <img src={contactImg} alt="contactus" className="w-full" />
      </div>
      <div className="w-1/2 max-md:w-full">
        <h1 className="text-3xl font-semibold mb-4 bg-slate-900 text-white text-center py-2 rounded-lg max-md:text-xl">Contact Us</h1>
        <p className='mb-2 font-medium'>
          For any query or info about the product feel free to contact available
          24X7
        </p>
        <p className="flex items-center">
          {' '}
          <BiMailSend /> : customer12help@gmail.com
        </p>
        <p className="flex items-center">
          <BiPhoneCall /> : 012-3456789
        </p>
        <p className="flex items-center">
          <BiSupport /> : 1800-0000-0000 (toll free)
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
