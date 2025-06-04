import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label"; // Label might be used for form-like elements if any, or section titles
import { ShoppingCart, User as UserIcon, Search as SearchIcon, ArrowRight } from 'lucide-react';

const placeholderCategories = [
  { id: 'cat1', name: 'Smartphones', imageUrl: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', link: '/product-listing?category=smartphones' },
  { id: 'cat2', name: 'Laptops', imageUrl: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', link: '/product-listing?category=laptops' },
  { id: 'cat3', name: 'Audio Devices', imageUrl: 'https://images.pexels.com/photos/3945657/pexels-photo-3945657.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', link: '/product-listing?category=audio' },
  { id: 'cat4', name: 'Wearables', imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', link: '/product-listing?category=wearables' },
];

const placeholderFeaturedProducts = [
  { id: 'fp001', name: 'Premium Wireless Headphones', price: 199.99, imageUrl: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', category: 'Audio', imageAlt: 'Wireless Headphones' },
  { id: 'fp002', name: 'Ultra HD 4K Monitor', price: 349.50, imageUrl: 'https://images.pexels.com/photos/270700/pexels-photo-270700.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', category: 'Monitors', imageAlt: '4K Monitor' },
  { id: 'fp003', name: 'Latest Gen Smartwatch', price: 299.00, imageUrl: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', category: 'Wearables', imageAlt: 'Smartwatch' },
  { id: 'fp004', name: 'Gaming Laptop Pro', price: 1299.00, imageUrl: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600&lazy=load', category: 'Laptops', imageAlt: 'Gaming Laptop' },
];

const Homepage = () => {
  const navigate = useNavigate();
  console.log('Homepage loaded');

  const handleHeroCtaClick = () => {
    navigate('/product-listing');
  };

  const handleAddToCart = (productId: string | number) => {
    console.log(`Homepage: Add product ${productId} to cart`);
    // Actual add to cart logic would be here
  };

  const handleViewDetails = (productId: string | number) => {
    navigate(`/product-detail/${productId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <img src="https://www.ascendion.com/wp-content/uploads/2023/10/Ascendion-Logo-2023.svg" alt="ElectroMart Logo" className="h-6"/>
            <span className="font-bold sm:inline-block">ElectroMart</span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/product-listing" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    All Products
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {placeholderCategories.map((category) => (
                      <li key={category.id}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={category.link}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{category.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Explore {category.name.toLowerCase()}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
            <form className="hidden sm:block">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search products..." className="pl-9 h-9 w-40 lg:w-64" />
              </div>
            </form>
            <Button variant="ghost" size="icon" onClick={() => navigate('/cart')}>
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
            <Avatar className="h-8 w-8 cursor-pointer" onClick={() => console.log("Avatar clicked")}>
              <AvatarImage src="https://i.pravatar.cc/40?u=user1" alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection
          title="Latest Tech & Gadgets"
          subtitle="Discover innovative electronics and enjoy exclusive deals. Shop now for the best in tech."
          imageUrl="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          imageAlt="Modern electronics setup"
          ctaText="Shop All Products"
          onCtaClick={handleHeroCtaClick}
        />

        {/* Categories Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
                 <Button variant="link" onClick={() => navigate('/product-listing?show=categories')}>
                    View All Categories <ArrowRight className="ml-2 h-4 w-4" />
                 </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {placeholderCategories.map((category) => (
                <Link to={category.link} key={category.id}>
                  <Card className="overflow-hidden transition-all hover:shadow-lg group">
                    <AspectRatio ratio={4 / 3}>
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </AspectRatio>
                    <CardHeader className="p-4">
                      <CardTitle className="text-md text-center font-semibold">{category.name}</CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        <Separator className="my-8" />

        {/* Featured Products Section */}
        <section className="py-12 md:py-16">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
                <Button variant="link" onClick={() => navigate('/product-listing?filter=featured')}>
                    View All Featured <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {placeholderFeaturedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  category={product.category}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                  imageAlt={product.imageAlt}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-slate-800 text-slate-300">
        <div className="container max-w-screen-xl mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-white mb-3">ElectroMart</h3>
              <p className="text-sm">Your one-stop shop for the latest electronics.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-3">Newsletter</h3>
              <Label htmlFor="footer-newsletter" className="sr-only">Email for newsletter</Label>
              <form className="flex gap-2">
                <Input type="email" id="footer-newsletter" placeholder="Enter your email" className="bg-slate-700 border-slate-600 placeholder-slate-400 text-white" />
                <Button type="submit" variant="secondary">Subscribe</Button>
              </form>
            </div>
          </div>
          <Separator className="bg-slate-700 my-6" />
          <p className="text-sm">&copy; {new Date().getFullYear()} ElectroMart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;