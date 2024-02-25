import React from 'react';
import mobileImg from '../assets/images/hero(1).jpg';
import amazonFashion from '../assets/images/amazonFashion(1).jpg';

const Carousel = () => {
  return (
    <div className="carousel w-full">
      <div
        id="slide1"
        className="carousel-item relative w-full h-72 max-sm:h-44"
      >
        <img src={amazonFashion} className="object-cover w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 max-sm:left-2 max-sm:right-2">
          <a href="#slide4" className="btn btn-circle max-sm:w-7">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle max-sm:w-7">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img src={mobileImg} className="object-cover w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 max-sm:left-2 max-sm:right-2">
          <a href="#slide1" className="btn btn-circle max-sm:w-7">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle max-sm:w-7">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img src={amazonFashion} className="object-cover w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 max-sm:left-2 max-sm:right-2">
          <a href="#slide2" className="btn btn-circle max-sm:w-7">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle max-sm:w-7">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <img src={mobileImg} className="object-cover w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 max-sm:left-2 max-sm:right-2">
          <a href="#slide3" className="btn btn-circle max-sm:w-7">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle max-sm:w-7">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
