import React from 'react';
import aboutImg from '../assets/images/about.jpeg';

const AboutPage = () => {
  return (
    <div className="pt-16 pb-28 px-16 min-h-screen flex items-center justify-center">
      <div>
        <img src={aboutImg} alt="aboutus" className="w-full" />
      </div>
      <div className="w-1/2">
        <h1 className="text-3xl font-semibold mb-4  bg-slate-900 text-white w-52 text-center py-2 rounded-lg">About Us</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum
          eligendi, maiores officiis itaque optio, beatae odio alias tempore
          inventore molestiae voluptatibus asperiores! Consequatur nesciunt
          magnam libero qui pariatur explicabo soluta. Lorem ipsum dolor sit
          amet consectetur, adipisicing elit. Vitae dicta fugit quo consequuntur
          ea tempore unde nesciunt voluptatem omnis in quod nostrum quos ipsam,
          suscipit iste consectetur, ut voluptates dolorum. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Velit eum dicta omnis
          consectetur neque ut eligendi corrupti, laborum dolore, repellendus
          numquam suscipit vel error. Aliquid aut consectetur labore. Aperiam,
          quam!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
