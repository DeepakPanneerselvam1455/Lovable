
import React, { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Home,
  DollarSign,
  MapPin,
  Bed,
  Bath
} from 'lucide-react';

type FilterPanelProps = {
  onFilterChange: (filters: {
    location: string;
    priceRange: [number, number];
    bedrooms: string;
    propertyType: string;
  }) => void;
}

const FilterPanel = ({ onFilterChange }: FilterPanelProps) => {
  const [location, setLocation] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [bedrooms, setBedrooms] = useState<string>('');
  const [propertyType, setPropertyType] = useState<string>('');
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1] || 5000]);
    updateFilters({
      location,
      priceRange: [value[0], value[1] || 5000],
      bedrooms,
      propertyType
    });
  };
  
  const updateFilters = (filters: {
    location: string;
    priceRange: [number, number];
    bedrooms: string;
    propertyType: string;
  }) => {
    onFilterChange(filters);
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Home className="w-5 h-5 mr-2 text-primary" />
          Filter Properties
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Location Filter */}
        <div>
          <Label htmlFor="location" className="flex items-center text-sm font-medium mb-1">
            <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
            Location
          </Label>
          <Select 
            value={location} 
            onValueChange={(value) => {
              setLocation(value);
              updateFilters({
                location: value,
                priceRange,
                bedrooms,
                propertyType
              });
            }}
          >
            <SelectTrigger id="location">
              <SelectValue placeholder="Any location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any location</SelectItem>
              <SelectItem value="new york">New York</SelectItem>
              <SelectItem value="chicago">Chicago</SelectItem>
              <SelectItem value="miami">Miami</SelectItem>
              <SelectItem value="san francisco">San Francisco</SelectItem>
              <SelectItem value="boston">Boston</SelectItem>
              <SelectItem value="seattle">Seattle</SelectItem>
              <SelectItem value="los angeles">Los Angeles</SelectItem>
              <SelectItem value="dallas">Dallas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Price Range Filter */}
        <div>
          <Label className="flex items-center text-sm font-medium mb-1">
            <DollarSign className="w-4 h-4 mr-1 text-muted-foreground" />
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </Label>
          <Slider
            defaultValue={[0, 5000]}
            max={5000}
            step={100}
            value={[priceRange[0], priceRange[1]]}
            onValueChange={handlePriceChange}
            className="mt-2"
          />
        </div>
        
        {/* Bedrooms Filter */}
        <div>
          <Label htmlFor="bedrooms" className="flex items-center text-sm font-medium mb-1">
            <Bed className="w-4 h-4 mr-1 text-muted-foreground" />
            Bedrooms
          </Label>
          <Select 
            value={bedrooms} 
            onValueChange={(value) => {
              setBedrooms(value);
              updateFilters({
                location,
                priceRange,
                bedrooms: value,
                propertyType
              });
            }}
          >
            <SelectTrigger id="bedrooms">
              <SelectValue placeholder="Any bedrooms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any bedrooms</SelectItem>
              <SelectItem value="0">Studio</SelectItem>
              <SelectItem value="1">1 Bedroom</SelectItem>
              <SelectItem value="2">2 Bedrooms</SelectItem>
              <SelectItem value="3">3 Bedrooms</SelectItem>
              <SelectItem value="4+">4+ Bedrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Property Type Filter */}
        <div>
          <Label htmlFor="propertyType" className="flex items-center text-sm font-medium mb-1">
            <Home className="w-4 h-4 mr-1 text-muted-foreground" />
            Property Type
          </Label>
          <Select 
            value={propertyType} 
            onValueChange={(value) => {
              setPropertyType(value);
              updateFilters({
                location,
                priceRange,
                bedrooms,
                propertyType: value
              });
            }}
          >
            <SelectTrigger id="propertyType">
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any type</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
