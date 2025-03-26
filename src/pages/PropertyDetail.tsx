
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Bed, Bath, Home, Calendar, Check, User } from 'lucide-react';
import Header from '@/components/Header';
import { properties } from '@/data/properties';

const PropertyDetail = () => {
  // In a real app, you would get the ID from URL params and fetch the property
  const property = properties[0]; // Using the first property as an example

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Image */}
            <div className="relative rounded-lg overflow-hidden h-[400px]">
              <img 
                src={property.imageUrl} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 right-4 text-sm py-1 px-3">${property.price}/month</Badge>
            </div>
            
            {/* Property Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{property.location}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Bed className="w-6 h-6 text-primary mb-2" />
                  <span className="text-lg font-medium">{property.bedrooms}</span>
                  <span className="text-sm text-muted-foreground">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Bath className="w-6 h-6 text-primary mb-2" />
                  <span className="text-lg font-medium">{property.bathrooms}</span>
                  <span className="text-sm text-muted-foreground">Bathrooms</span>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Home className="w-6 h-6 text-primary mb-2" />
                  <span className="text-lg font-medium">{property.area}</span>
                  <span className="text-sm text-muted-foreground">Sq Ft</span>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-muted-foreground mb-6">{property.description}</p>
              
              <h2 className="text-xl font-semibold mb-3">Amenities</h2>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Map Placeholder */}
            <Card>
              <CardContent className="p-4">
                <div className="h-[300px] bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">Map will be displayed here</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Schedule a Viewing</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="w-full flex justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Today
                    </Button>
                    <Button variant="outline" className="w-full flex justify-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Tomorrow
                    </Button>
                  </div>
                  <Button className="w-full">Request Tour</Button>
                  <p className="text-sm text-muted-foreground text-center">
                    You won't be charged yet
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Agent Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">John Smith</h3>
                    <p className="text-sm text-muted-foreground">Property Agent</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mb-2">Message</Button>
                <Button variant="outline" className="w-full">Call</Button>
              </CardContent>
            </Card>
            
            {/* Similar Properties */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Similar Properties</h3>
              <div className="space-y-4">
                {properties.slice(1, 4).map((prop) => (
                  <Card key={prop.id} className="overflow-hidden">
                    <div className="flex">
                      <div className="w-1/3">
                        <img 
                          src={prop.imageUrl} 
                          alt={prop.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="w-2/3 p-3">
                        <h4 className="font-medium text-sm mb-1 truncate">{prop.title}</h4>
                        <p className="text-sm text-muted-foreground mb-1">${prop.price}/month</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span className="mr-2">{prop.bedrooms} Beds</span>
                          <span>{prop.bathrooms} Baths</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer would be here, but we're omitting it for brevity */}
    </div>
  );
};

export default PropertyDetail;
