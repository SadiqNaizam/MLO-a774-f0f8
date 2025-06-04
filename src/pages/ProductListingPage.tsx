import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import Sidebar from '@/components/layout/Sidebar'; // Custom Sidebar
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Label } from "@/components/ui/label";
import { ShoppingCart, User as UserIcon, Search as SearchIcon, FilterIcon, ListRestart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const allProducts = [
  { id: 'plp001', name: 'Advanced Smartphone Pro Max', price: 999.99, imageUrl: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', category: 'Smartphones', brand: 'BrandA', rating: 4.5, specs: { storage: '256GB', ram: '12GB' } },
  { id: 'plp002', name: 'SlimBook Laptop 14 inch', price: 1250.00, imageUrl: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', category: 'Laptops', brand: 'BrandB', rating: 4.2, specs: { processor: 'i7', ram: '16GB' } },
  { id: 'plp003', name: 'Noise Cancelling Over-Ear Headphones', price: 249.00, imageUrl: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', category: 'Audio', brand: 'BrandC', rating: 4.8, specs: { battery: '30hrs' } },
  { id: 'plp004', name: 'Fitness Tracker Watch Series 5', price: 179.50, imageUrl: 'https://images.pexels.com/photos/4156/fashion-people-woman-hands.jpg?auto=compress&cs=tinysrgb&w=600&lazy=load', category: 'Wearables', brand: 'BrandA', rating: 4.0, specs: { display: 'AMOLED' } },
  { id: 'plp005', name: 'Curved Gaming Monitor 32 inch', price: 450.00, imageUrl: 'https://images.pexels.com/photos/1999463/pexels-photo-1999463.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', category: 'Monitors', brand: 'BrandD', rating: 4.6, specs: { refreshRate: '144Hz' } },
  { id: 'plp006', name: 'Compact Digital Camera', price: 599.00, imageUrl: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', category: 'Cameras', brand: 'BrandB', rating: 4.3, specs: { megapixels: '24MP' } },
  { id: 'plp007', name: 'Smart Home Hub Central', price: 129.99, imageUrl: 'https://images.pexels.com/photos/3251000/pexels-photo-3251000.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', category: 'Smart Home', brand: 'BrandC', rating: 4.1, specs: { connectivity: 'Wi-Fi, Zigbee' } },
  { id: 'plp008', name: 'Portable Bluetooth Speaker X', price: 79.99, imageUrl: 'https://images.pexels.com/photos/1279925/pexels-photo-1279925.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load', category: 'Audio', brand: 'BrandD', rating: 4.7, specs: { waterproof: 'IPX7' } },
];

const ITEMS_PER_PAGE = 6;

const ProductListingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ category: '', brand: [], priceRange: [0, 1500], rating: 0 });
  const [sortOption, setSortOption] = useState('relevance');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
    console.log('ProductListingPage loaded. Initial category from URL:', category);
  }, [location.search]);

  const filteredAndSortedProducts = React.useMemo(() => {
    let products = allProducts.filter(p => {
      if (filters.category && p.category.toLowerCase() !== filters.category.toLowerCase()) return false;
      if (filters.brand.length > 0 && !filters.brand.includes(p.brand)) return false;
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;
      if (filters.rating > 0 && p.rating < filters.rating) return false;
      if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });

    switch (sortOption) {
      case 'price_asc': products.sort((a, b) => a.price - b.price); break;
      case 'price_desc': products.sort((a, b) => b.price - a.price); break;
      case 'rating_desc': products.sort((a, b) => b.rating - a.rating); break;
      // 'relevance' is default (no specific sort or could be by ID/name)
    }
    return products;
  }, [filters, sortOption, searchTerm]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredAndSortedProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleBrandChange = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brand: prev.brand.includes(brand) ? prev.brand.filter(b => b !== brand) : [...prev.brand, brand]
    }));
    setCurrentPage(1);
  };
  
  const resetFilters = () => {
    setFilters({ category: '', brand: [], priceRange: [0, 1500], rating: 0 });
    setSortOption('relevance');
    setSearchTerm('');
    setCurrentPage(1);
    navigate('/product-listing'); // Clear URL params
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const handleAddToCart = (productId: string | number) => console.log(`PLP: Add product ${productId} to cart`);
  const handleViewDetails = (productId: string | number) => navigate(`/product-detail/${productId}`);

  const uniqueBrands = Array.from(new Set(allProducts.map(p => p.brand)));
  const uniqueCategories = Array.from(new Set(allProducts.map(p => p.category)));

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
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
            <form className="hidden sm:block" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search products..." className="pl-9 h-9 w-40 lg:w-64" value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} />
              </div>
            </form>
            <Button variant="ghost" size="icon" onClick={() => navigate('/cart')}><ShoppingCart className="h-5 w-5" /><span className="sr-only">Cart</span></Button>
            <Avatar className="h-8 w-8 cursor-pointer"><AvatarImage src="https://i.pravatar.cc/40?u=userPLP" alt="User Avatar" /><AvatarFallback>U</AvatarFallback></Avatar>
          </div>
        </div>
      </header>

      <main className="container max-w-screen-2xl mx-auto px-4 py-8 flex-grow">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{filters.category ? filters.category : 'All Products'}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar for Filters */}
          <Sidebar title="Filter Products" className="md:w-1/4 lg:w-1/5">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Category</h3>
                <RadioGroup value={filters.category} onValueChange={(value) => {setFilters(f => ({ ...f, category: value })); setCurrentPage(1); navigate(`/product-listing?category=${value.toLowerCase()}`);}}>
                  {uniqueCategories.map(cat => (
                    <div key={cat} className="flex items-center space-x-2">
                      <RadioGroupItem value={cat} id={`cat-${cat}`} />
                      <Label htmlFor={`cat-${cat}`}>{cat}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <Separator/>
              <div>
                <h3 className="text-lg font-semibold mb-2">Brand</h3>
                {uniqueBrands.map(brand => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox id={`brand-${brand}`} checked={filters.brand.includes(brand)} onCheckedChange={() => handleBrandChange(brand)} />
                    <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                  </div>
                ))}
              </div>
              <Separator/>
              <div>
                <h3 className="text-lg font-semibold mb-2">Price Range</h3>
                <Slider
                  defaultValue={[0, 1500]}
                  min={0} max={1500} step={50}
                  value={filters.priceRange}
                  onValueChange={(value) => {setFilters(f => ({ ...f, priceRange: value })); setCurrentPage(1);}}
                  className="mt-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
              <Separator/>
               <div>
                <h3 className="text-lg font-semibold mb-2">Rating</h3>
                 <RadioGroup value={String(filters.rating)} onValueChange={(value) => {setFilters(f => ({ ...f, rating: Number(value) })); setCurrentPage(1);}}>
                    {[4, 3, 2, 1].map(rate => (
                        <div key={`rate-${rate}`} className="flex items-center space-x-2">
                        <RadioGroupItem value={String(rate)} id={`rate-${rate}`} />
                        <Label htmlFor={`rate-${rate}`}>{rate} Star & Up</Label>
                        </div>
                    ))}
                 </RadioGroup>
              </div>
              <Button onClick={resetFilters} variant="outline" className="w-full mt-4">
                <ListRestart className="mr-2 h-4 w-4" /> Reset Filters
              </Button>
            </div>
          </Sidebar>

          {/* Product Grid and Sorting */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h1 className="text-2xl font-bold">{filters.category ? filters.category : 'All Products'} ({filteredAndSortedProducts.length})</h1>
              <div className="flex items-center gap-2">
                <Label htmlFor="sort-by" className="text-sm">Sort by:</Label>
                <Select value={sortOption} onValueChange={(value) => {setSortOption(value); setCurrentPage(1);}}>
                  <SelectTrigger id="sort-by" className="w-[180px]">
                    <SelectValue placeholder="Sort products" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating_desc">Rating: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map(product => (
                    <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    category={product.category}
                    onAddToCart={handleAddToCart}
                    onViewDetails={handleViewDetails}
                    imageAlt={product.name}
                    />
                ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <FilterIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your filters or search term.</p>
                    <Button onClick={resetFilters} variant="outline">Clear Filters</Button>
                </div>
            )}

            {totalPages > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} disabled={currentPage === 1} />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                     (i < 2 || i > totalPages - 3 || Math.abs(i + 1 - currentPage) <= 1) ? (
                        <PaginationItem key={i}>
                        <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }} isActive={currentPage === i + 1}>
                            {i + 1}
                        </PaginationLink>
                        </PaginationItem>
                     ) : ( (i === 2 && currentPage > 4) || (i === totalPages - 3 && currentPage < totalPages - 3) ? 
                        <PaginationEllipsis key={`ellipsis-${i}`} /> : null
                     )
                  ))}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} disabled={currentPage === totalPages} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
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

export default ProductListingPage;