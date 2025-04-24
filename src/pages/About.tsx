
import React from "react";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-800 mb-8 text-center">
            About Luxury Ceiling Fans
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="lead text-xl text-gray-600 mb-8">
              For over two decades, Luxury Ceiling Fans has been the premier destination for 
              discerning homeowners and interior designers seeking exceptional ceiling fans that 
              combine form and function.
            </p>
            
            <h2 className="font-serif text-2xl mt-12 mb-4">Our Commitment to Excellence</h2>
            <p>
              Every fan in our collection represents the pinnacle of design, craftsmanship, and 
              technological innovation. We partner with renowned designers and use only the finest 
              materials to create ceiling fans that are both artistic statements and engineering marvels.
            </p>
            
            <h2 className="font-serif text-2xl mt-12 mb-4">Sustainability and Quality</h2>
            <p>
              We believe luxury and responsibility go hand in hand. Our fans are manufactured with 
              sustainable practices, energy-efficient motors, and durable components that ensure 
              decades of reliable performance while reducing environmental impact.
            </p>
            
            <h2 className="font-serif text-2xl mt-12 mb-4">Personalized Service</h2>
            <p>
              Our expert team provides personalized consultations to help you find the perfect fan 
              for your space. From technical specifications to design considerations, we're committed 
              to ensuring your complete satisfaction with every purchase.
            </p>
            
            <blockquote className="italic border-l-4 border-amber-400 pl-4 my-8">
              "Our mission is to elevate the ceiling fan from a mere functional necessity to the 
              centerpiece of sophisticated interior design."
            </blockquote>
            
            <p>
              Visit our showroom or explore our online gallery to experience the unparalleled quality 
              and design of Luxury Ceiling Fans.
            </p>
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

export default About;
