import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootPage from './RootPage';
import ProductCreation from './Components/Product/ProductCreation';
import Navbar from './Components/Navbar/Navbar';
import UpdateProduct from './Components/Product/UpdateProduct';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import UserPosts from './Components/User/UserPosts';
import Services from './Components/Services/Service';
import Contact from './Components/Contact/Contact';
import JoinUs from './Components/JoinUs/JoinUs';
import Footer from './Components/Footer/Footer';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<RootPage />} /> 
      <Route path="/joinus" element={<JoinUs />} /> 
      <Route path="/contact" element={<Contact />} /> 
      <Route path="/services" element={<Services />} /> 
      <Route path="/auth/login" element={<Login />} /> 
      <Route path="/auth/register" element={<Register />} /> 
      <Route path="/user/posts/:id" element={<UserPosts />} /> 
      <Route path="/create/post" element={<ProductCreation />} /> 
      <Route path="/update/post/:id" element={<UpdateProduct />} /> 
    </Routes>
    <Footer />

  </BrowserRouter>
  );
};

export default App;
