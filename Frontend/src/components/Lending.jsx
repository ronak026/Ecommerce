import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Truck, Shield } from 'lucide-react';

function Lending() {
  const shoppingImg = "https://t3.ftcdn.net/jpg/03/65/52/86/240_F_365528663_miV08QzGGVLqhRRQVQ4B9C9PtoTRJiSv.jpg";
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col md:flex-row justify-center items-center text-center md:text-left py-16 px-4 gap-10">
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 drop-shadow mb-6">
            Welcome to Shopply
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto md:mx-0">
            Discover a world of amazing products at unbeatable prices. Your one-stop destination for quality shopping.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 rounded-xl text-lg font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 shadow-lg hover:from-indigo-700 hover:to-pink-600 transition"
          >
            <ShoppingCart className="mr-3 h-6 w-6" />
            Start Shopping
          </Link>
        </div>
        {/* Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={shoppingImg}
            alt="Online Shopping"
            className="w-full max-w-md rounded-2xl shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white/80">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Shopply?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center hover:shadow-xl transition">
              <Star className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">Curated selection of high-quality products from trusted brands.</p>
            </div>
            <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center hover:shadow-xl transition">
              <Truck className="h-12 w-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping to your doorstep.</p>
            </div>
            <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center text-center hover:shadow-xl transition">
              <Shield className="h-12 w-12 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
              <p className="text-gray-600">Safe and secure shopping experience guaranteed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lending;