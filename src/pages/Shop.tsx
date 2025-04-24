
import React from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Shop = () => {
  // Sample product data - will be replaced with real API data later
  const products = [
    {
      id: 1,
      name: "Classic Luxury Fan",
      description: "Timeless design with premium materials",
      price: 599.99,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Modern Elite Fan",
      description: "Sleek design with innovative features",
      price: 799.99,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Industrial Premium Fan",
      description: "Powerful performance with bold aesthetics",
      price: 899.99,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Luxury Signature Fan",
      description: "Our flagship model with exclusive finishes",
      price: 1299.99,
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-800 mb-8 text-center">
            Premium Ceiling Fans Collection
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-56 bg-gray-100 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="object-contain h-48 w-full"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-serif">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-xl font-medium text-amber-600 mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800">
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
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

export default Shop;
