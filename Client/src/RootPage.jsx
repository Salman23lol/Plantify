import React from 'react';
import Home from './Components/Home/Home';
import DisplayProducts from './Components/Product/DisplayProducts';
import AboutUs from './Components/About/Aboutus';



const RootPage = () => {
  return (
    <div className="bg-gray-700">
      <Home />
      <AboutUs />
      <h1 className="text-2xl text-white text-center font-semibold ">View Amazing Products</h1>
      <DisplayProducts />

    </div>
  );
};

export default RootPage;