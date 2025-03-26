
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin, Bed, Bath, Home, User } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import Header from '@/components/Header';
import { properties } from '@/data/properties';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 animate-fade-in">
              Find Your Dream Home
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
              Discover thousands of properties for rent in your area. From cozy apartments to spacious houses, we've got you covered.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 p-4 bg-background rounded-lg shadow-lg animate-fade-in">
              <div className="flex-1">
                <Input placeholder="Location" className="w-full" />
              </div>
              <div className="flex-1">
                <Input placeholder="Price range" className="w-full" />
              </div>
              <Button className="flex-shrink-0">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Properties */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">Featured Properties</h2>
            <Button variant="outline">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.slice(0, 6).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-muted/50">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold tracking-tight text-center mb-12">Why Choose HomeHaven</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-primary" />
                  Easy Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Find your perfect property with our intuitive search tools. Filter by location, price, and amenities.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-primary" />
                  Verified Listings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All our properties are verified by our team to ensure quality and accuracy of information.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Dedicated Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our team of experts is always ready to help you with any questions or concerns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="mt-auto bg-background border-t py-8">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">HomeHaven</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted partner in finding the perfect rental property.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-muted-foreground hover:text-foreground">Home</a></li>
                <li><a href="/properties" className="text-muted-foreground hover:text-foreground">Properties</a></li>
                <li><a href="/about" className="text-muted-foreground hover:text-foreground">About Us</a></li>
                <li><a href="/contact" className="text-muted-foreground hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <p className="text-sm text-muted-foreground mb-2">
                123 Main Street, New York, NY 10001
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                info@homehaven.com
              </p>
              <p className="text-sm text-muted-foreground">
                +1 (123) 456-7890
              </p>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} HomeHaven. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
