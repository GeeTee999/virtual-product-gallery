
import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Thank you for your message. Our team will contact you shortly.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-800 mb-8 text-center">
            Contact Us
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="p-6 shadow-lg">
              <h2 className="text-2xl font-serif mb-4">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <Input id="name" placeholder="Your name" required />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Your email" required />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <Input id="subject" placeholder="Subject" required />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="How can we help you?" 
                    rows={5}
                    required 
                    className="resize-none"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                  Send Message
                </Button>
              </form>
            </Card>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-6 shadow-lg">
                <h2 className="text-2xl font-serif mb-4">Visit Our Showroom</h2>
                <address className="not-italic">
                  <p className="mb-2">123 Luxury Avenue</p>
                  <p className="mb-2">New York, NY 10001</p>
                  <p className="mb-2">United States</p>
                </address>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="mb-2">
                    <strong>Hours:</strong> Monday-Saturday, 9am-6pm
                  </p>
                </div>
              </Card>
              
              <Card className="p-6 shadow-lg">
                <h2 className="text-2xl font-serif mb-4">Get in Touch</h2>
                <p className="mb-2">
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> info@luxuryfans.com
                </p>
                <p className="mb-2">
                  <strong>Customer Support:</strong> support@luxuryfans.com
                </p>
              </Card>
            </div>
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

export default Contact;
