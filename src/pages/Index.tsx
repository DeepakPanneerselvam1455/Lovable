
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MapPin, Bed, Bath, Home, User } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import Header from '@/components/Header';
import FilterPanel from '@/components/FilterPanel';
import { properties } from '@/data/properties';
import { Property } from '@/types/property';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    location: '',
    priceRange: [0, 5000] as [number, number],
    bedrooms: '',
    propertyType: ''
  });

  // Apply filters whenever they change
  useEffect(() => {
    applyFilters();
  }, [activeFilters, searchQuery]);

  // Filter function that combines search and filter panel logic
  const applyFilters = () => {
    let filtered = [...properties];
    
    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(property => 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply location filter
    if (activeFilters.location) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(activeFilters.location.toLowerCase())
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(property => 
      property.price >= activeFilters.priceRange[0] && 
      property.price <= activeFilters.priceRange[1]
    );
    
    // Apply bedrooms filter
    if (activeFilters.bedrooms) {
      if (activeFilters.bedrooms === '0') {
        filtered = filtered.filter(property => property.bedrooms === 0);
      } else if (activeFilters.bedrooms === '4+') {
        filtered = filtered.filter(property => property.bedrooms >= 4);
      } else {
        filtered = filtered.filter(property => 
          property.bedrooms === parseInt(activeFilters.bedrooms)
        );
      }
    }
    
    // Apply property type filter
    if (activeFilters.propertyType) {
      filtered = filtered.filter(property => 
        property.type === activeFilters.propertyType
      );
    }
    
    setFilteredProperties(filtered);
  };

  const handleFilterChange = (filters: {
    location: string;
    priceRange: [number, number];
    bedrooms: string;
    propertyType: string;
  }) => {
    setActiveFilters(filters);
  };

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
                <Input 
                  placeholder="Search by location, property name..." 
                  className="w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="flex-shrink-0"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              <Button className="flex-shrink-0">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
            
            {/* Filter Panel */}
            {showFilters && (
              <div className="mt-4 animate-fade-in">
                <FilterPanel onFilterChange={handleFilterChange} />
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Featured Properties */}
      <section className="py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {filteredProperties.length > 0 
                  ? 'Available Properties' 
                  : 'No properties match your filters'}
              </h2>
              <p className="text-muted-foreground">
                Showing {filteredProperties.length} properties
              </p>
            </div>
            <Button variant="outline">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          {filteredProperties.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No properties match your current filters. Try adjusting your search criteria.</p>
            </div>
          )}
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
