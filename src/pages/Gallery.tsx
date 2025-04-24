
import React from "react";
import Navbar from "@/components/Navbar";
import ProductViewer from "@/components/ProductViewer";

const Gallery = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-800 mb-8 text-center">
            Interactive Fan Gallery
          </h1>
          
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Explore our collection of luxury ceiling fans in 3D. Customize colors and features to 
            visualize how they would look in your space.
          </p>
          
          <div className="bg-white shadow-lg rounded-lg p-4">
            <ProductViewer />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-800 pt-4 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Luxury Ceiling Fans. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Gallery;
