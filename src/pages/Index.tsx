
import React from "react";
import Navbar from "@/components/Navbar";
import ProductViewer from "@/components/ProductViewer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-12">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
              Experience Luxury Ceiling Fans in 3D
            </h1>
            <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Explore our premium ceiling fans with our interactive 3D viewer. Rotate, zoom, and customize to find your perfect match.
            </p>
            
            <ProductViewer />
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-6 rounded-lg shadow-lg bg-gray-50">
                <h3 className="text-xl font-semibold mb-2">Premium Design</h3>
                <p className="text-gray-600">
                  Crafted with high-quality materials and attention to detail for a luxurious look.
                </p>
              </div>
              
              <div className="p-6 rounded-lg shadow-lg bg-gray-50">
                <h3 className="text-xl font-semibold mb-2">Energy Efficient</h3>
                <p className="text-gray-600">
                  Low power consumption with advanced DC motors and LED lighting.
                </p>
              </div>
              
              <div className="p-6 rounded-lg shadow-lg bg-gray-50">
                <h3 className="text-xl font-semibold mb-2">Smart Controls</h3>
                <p className="text-gray-600">
                  Connect to your smart home with Wi-Fi capabilities and voice control.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">LUXURY CEILING FANS</h3>
              <p className="text-gray-300">
                Bringing elegance and innovation to homes worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Products</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Installation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Contact</h4>
              <p className="text-gray-300 mb-2">Email: info@luxuryfans.com</p>
              <p className="text-gray-300">Phone: (123) 456-7890</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Luxury Ceiling Fans. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
