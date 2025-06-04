import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Carousel from '@/components/Carousel'; // Custom Carousel
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ShoppingCart, User as UserIcon, Search as SearchIcon, Star, MessageSquare, ShieldCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/components/ui/use-toast"; // For sonner/toast notifications

// Mock product data - in a real app, this would come from an API
const mockProducts = {
  'plp001': { 
    id: 'plp001', name: 'Advanced Smartphone Pro Max', category: 'Smartphones', price: 999.99, stock: 20,
    images: [
      { id: 'img1', src: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load', alt: 'Smartphone front view' },
      { id: 'img2', src: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load', alt: 'Smartphone back view' },
      { id: 'img3', src: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load', alt: 'Smartphone side view' },
    ],
    description: "Experience the pinnacle of mobile technology with the Advanced Smartphone Pro Max. Featuring a stunning Super Retina XDR display, an incredibly powerful A17 Bionic chip, and a pro-grade camera system for breathtaking photos and videos. Long-lasting battery life and durable design make it the perfect companion for your everyday adventures and professional needs.",
    specifications: [
      { title: 'Display', value: '6.7-inch Super Retina XDR OLED' },
      { title: 'Processor', value: 'A17 Bionic Chip with Neural Engine' },
      { title: 'Storage', value: '256GB / 512GB / 1TB' },
      { title: 'RAM', value: '12GB' },
      { title: 'Main Camera', value: '48MP Wide, 12MP Ultrawide, 12MP Telephoto' },
      { title: 'Front Camera', value: '12MP TrueDepth' },
      { title: 'Battery', value: 'Up to 28 hours video playback' },
      { title: 'OS', value: 'Latest iOS' },
    ],
    reviews: [
        { id: 'rev1', author: 'John D.', rating: 5, comment: 'Absolutely fantastic phone! The camera is a game-changer.', date: '2023-10-15' },
        { id: 'rev2', author: 'Jane S.', rating: 4, comment: 'Great performance and battery life. A bit pricey though.', date: '2023-10-20' },
    ],
    avgRating: 4.5,
  },
  // Add more mock products if needed, matching IDs from ProductListingPage
   'fp001': { 
    id: 'fp001', name: 'Premium Wireless Headphones', category: 'Audio', price: 199.99, stock: 50,
    images: [
      { id: 'img_h1', src: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load', alt: 'Headphones main view' },
      { id: 'img_h2', src: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load', alt: 'Headphones on ear' },
    ],
    description: "Immerse yourself in pure audio bliss with these Premium Wireless Headphones. Featuring active noise cancellation, plush earcups for maximum comfort, and an impressive 30-hour battery life. Crystal-clear sound quality for music, calls, and podcasts.",
    specifications: [
      { title: 'Type', value: 'Over-Ear, Wireless' },
      { title: 'Noise Cancellation', value: 'Active Noise Cancellation (ANC)' },
      { title: 'Battery Life', value: 'Up to 30 hours with ANC' },
      { title: 'Connectivity', value: 'Bluetooth 5.2, 3.5mm Audio Jack' },
      { title: 'Driver Size', value: '40mm Dynamic Drivers' },
    ],
    reviews: [
        { id: 'rev_h1', author: 'Mike P.', rating: 5, comment: 'Best headphones I have ever owned. ANC is superb!', date: '2023-11-01' },
    ],
    avgRating: 5.0,
  }
};

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [product, setProduct] = useState<typeof mockProducts.plp001 | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null); // Example for product variants

  useEffect(() => {
    console.log('ProductDetailPage loaded for productId:', productId);
    // Simulate API call
    if (productId && mockProducts[productId as keyof typeof mockProducts]) {
      setProduct(mockProducts[productId as keyof typeof mockProducts]);
    } else {
      // Handle product not found, maybe navigate to a 404 page or show message
      console.error('Product not found for ID:', productId);
      setProduct(null); // Or navigate('/not-found')
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    console.log(`PDP: Add ${quantity} of ${product.name} (ID: ${product.id}, Variant: ${selectedVariant || 'N/A'}) to cart`);
    toast({
      title: "Added to Cart!",
      description: `${quantity} x ${product.name} ${selectedVariant ? `(${selectedVariant})` : ''} added to your cart.`,
      // action: <ToastAction altText="View Cart" onClick={() => navigate('/cart')}>View Cart</ToastAction>,
    });
    // Actual add to cart logic would go here
  };

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Basic Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
                <Link to="/" className="font-bold">ElectroMart</Link>
                <Button onClick={() => navigate(-1)}>Go Back</Button>
            </div>
        </header>
        <main className="flex-grow container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold">Product Not Found</h1>
          <p className="text-muted-foreground">The product you are looking for does not exist or may have been removed.</p>
          <Button onClick={() => navigate('/product-listing')} className="mt-4">Browse Products</Button>
        </main>
      </div>
    );
  }

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
                <Link to="/" legacyBehavior passHref><NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink></Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/product-listing" legacyBehavior passHref><NavigationMenuLink className={navigationMenuTriggerStyle()}>All Products</NavigationMenuLink></Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
            <form className="hidden sm:block"><div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search products..." className="pl-9 h-9 w-40 lg:w-64" />
            </div></form>
            <Button variant="ghost" size="icon" onClick={() => navigate('/cart')}><ShoppingCart className="h-5 w-5" /><span className="sr-only">Cart</span></Button>
            <Avatar className="h-8 w-8 cursor-pointer"><AvatarImage src="https://i.pravatar.cc/40?u=userPDP" alt="User Avatar" /><AvatarFallback>U</AvatarFallback></Avatar>
          </div>
        </div>
      </header>

      <main className="container max-w-screen-xl mx-auto px-4 py-8 flex-grow">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/product-listing">Products</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink asChild><Link to={`/product-listing?category=${product.category.toLowerCase()}`}>{product.category}</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{product.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images Carousel */}
          <div>
            <Carousel slides={product.images} aspectRatio={1/1} showArrows showDots />
          </div>

          {/* Product Details & Actions */}
          <div className="space-y-6">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{product.name}</h1>
            
            <div className="flex items-center space-x-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
                <span className="text-sm text-muted-foreground">({product.reviews.length} reviews)</span>
            </div>

            <p className="text-3xl font-semibold text-primary">${product.price.toFixed(2)}</p>
            
            {product.stock > 0 ? (
                 <Badge variant={product.stock < 10 ? "destructive" : "default"}>
                    {product.stock < 10 ? `Only ${product.stock} left in stock!` : `${product.stock} in stock`}
                </Badge>
            ) : (
                <Badge variant="outline">Out of Stock</Badge>
            )}

            <p className="text-gray-700 leading-relaxed">{product.description.substring(0, 150)}...</p>
            
            {/* Variant Selection (Example) */}
            {product.specifications.find(spec => spec.title === "Storage") && (
              <div className="space-y-2">
                <Label htmlFor="variant-select">Storage Options:</Label>
                <Select onValueChange={setSelectedVariant} defaultValue={product.specifications.find(s => s.title === "Storage")?.value.split(" / ")[0]}>
                  <SelectTrigger id="variant-select" className="w-[200px]">
                    <SelectValue placeholder="Select storage" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.specifications.find(s => s.title === "Storage")?.value.split(" / ").map(v => (
                      <SelectItem key={v} value={v}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="quantity" className="text-sm font-medium">Quantity:</Label>
                <Input 
                  type="number" 
                  id="quantity" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                  min="1" 
                  max={product.stock > 0 ? product.stock : 1}
                  className="w-20"
                  disabled={product.stock === 0}
                />
              </div>
              <Button size="lg" onClick={handleAddToCart} className="flex-1 sm:flex-none" disabled={product.stock === 0}>
                <ShoppingCart className="mr-2 h-5 w-5" /> {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
            </div>
             <div className="flex space-x-4 text-sm text-muted-foreground pt-4">
                <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 mr-2 text-green-600" /> Secure Checkout
                </div>
                <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-blue-600" /> 24/7 Support
                </div>
            </div>
          </div>
        </div>

        {/* Tabs for Description, Specs, Reviews */}
        <div className="mt-12 lg:mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
              <TabsTrigger value="description">Full Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-6 prose max-w-none">
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value="specifications" className="py-6">
              <Accordion type="single" collapsible className="w-full">
                {product.specifications.map((spec, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{spec.title}</AccordionTrigger>
                    <AccordionContent>{spec.value}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
            <TabsContent value="reviews" className="py-6 space-y-6">
              {product.reviews.length > 0 ? product.reviews.map(review => (
                <div key={review.id} className="border p-4 rounded-lg bg-white">
                  <div className="flex items-center mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <p className="ml-2 text-sm font-semibold">{review.author}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{review.date}</p>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              )) : <p>No reviews yet for this product.</p>}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-slate-800 text-slate-300 mt-auto">
        <div className="container max-w-screen-xl mx-auto px-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} ElectroMart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetailPage;