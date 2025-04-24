
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  // Sample cart data - will be replaced with real state management later
  const cartItems = [
    {
      id: 1,
      name: "Classic Luxury Fan",
      price: 599.99,
      quantity: 1,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Industrial Premium Fan",
      price: 899.99,
      quantity: 1,
      image: "/placeholder.svg"
    }
  ];

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 49.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-800 mb-8 text-center">
            Your Shopping Cart
          </h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex py-4 border-b border-gray-100">
                        <div className="w-24 h-24 bg-gray-100 flex-shrink-0 flex items-center justify-center mr-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-20 w-20 object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                          <p className="text-amber-600 font-medium">${item.price.toFixed(2)}</p>
                        </div>
                        <div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              {/* Order Summary */}
              <div>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gray-900 hover:bg-gray-800">
                      Proceed to Checkout
                    </Button>
                  </CardFooter>
                </Card>
                
                <div className="mt-4 text-center">
                  <Link 
                    to="/shop" 
                    className="text-gray-600 hover:text-gray-900 hover:underline inline-flex items-center"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <Card className="p-8 text-center shadow-lg max-w-md mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-medium">Your cart is empty</h2>
                <p className="text-gray-600 mt-2">Add some luxury ceiling fans to get started!</p>
              </div>
              <Button asChild>
                <Link to="/shop">Browse Our Collection</Link>
              </Button>
            </Card>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-900 text-white py-6 mt-8">
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

export default Cart;
