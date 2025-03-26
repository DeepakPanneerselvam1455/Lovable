
import React from 'react';
import { Home, Search, User } from 'lucide-react';
import { Button } from './ui/button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 border-b bg-background">
      <div className="container flex items-center justify-between max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2">
          <Home className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-semibold tracking-tight">HomeHaven</h1>
        </div>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}
                href="/"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className={cn("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground")}
                href="/properties"
              >
                Properties
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[400px] p-4">
                  <div className="grid gap-3">
                    <div className="p-4 rounded-md hover:bg-accent">
                      <h3 className="text-sm font-medium">Our Story</h3>
                      <p className="text-sm text-muted-foreground">Learn about our mission and values</p>
                    </div>
                    <div className="p-4 rounded-md hover:bg-accent">
                      <h3 className="text-sm font-medium">Contact Us</h3>
                      <p className="text-sm text-muted-foreground">Get in touch with our team</p>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button>
            <User className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
