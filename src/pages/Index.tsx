
import React from "react";
import Navbar from "@/components/Navbar";
import ProductViewer from "@/components/ProductViewer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        <section className="flex-grow flex items-center justify-center">
          <div className="container mx-auto">
            <ProductViewer />
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-700 pt-4 text-center">
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
