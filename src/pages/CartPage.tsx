import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { ShoppingCart, User as UserIcon, Search as SearchIcon, Trash2, CreditCard } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Mock cart data
const initialCartItems = [
  { id: 'plp001', name: 'Advanced Smartphone Pro Max', price: 999.99, quantity: 1, imageUrl: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=100&lazy=load', stock: 5 },
  { id: 'fp001', name: 'Premium Wireless Headphones', price: 199.99, quantity: 2, imageUrl: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=100&lazy=load', stock: 10 },
];

const CartPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState(initialCartItems);
  console.log('CartPage loaded');

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.stock)) } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    const itemToRemove = cartItems.find(item => item.id === itemId);
    setCartItems(items => items.filter(item => item.id !== itemId));
    if (itemToRemove) {
        toast({ title: "Item Removed", description: `${itemToRemove.name} removed from cart.`})
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal > 50 ? 0 : 10; // Example: Free shipping over $50
  const total = subtotal + shippingCost;

  const handleProceedToCheckout = () => {
    console.log("Proceeding to checkout with items:", cartItems);
    toast({ title: "Redirecting to Checkout", description: "This is where the checkout process would begin."});
    // navigate('/checkout'); // Assuming a checkout page exists
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
            <Avatar className="h-8 w-8 cursor-pointer"><AvatarImage src="https://i.pravatar.cc/40?u=userCart" alt="User Avatar" /><AvatarFallback>U</AvatarFallback></Avatar>
          </div>
        </div>
      </header>

      <main className="container max-w-screen-lg mx-auto px-4 py-8 lg:py-12 flex-grow">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
            <Button variant="outline" onClick={() => navigate('/product-listing')}>Continue Shopping</Button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button onClick={() => navigate('/product-listing')}>Start Shopping</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items Table */}
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] hidden sm:table-cell">Image</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-center">Remove</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="hidden sm:table-cell">
                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      </TableCell>
                      <TableCell className="font-medium">
                        <Link to={`/product-detail/${item.id}`} className="hover:underline">{item.name}</Link>
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          min="1"
                          max={item.stock}
                          className="w-16 mx-auto text-center h-9"
                        />
                      </TableCell>
                      <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Order Summary Card */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <Label>Subtotal</Label>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <Label>Shipping</Label>
                    <span>{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'Free'}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <Label>Total</Label>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="lg" className="w-full" onClick={handleProceedToCheckout}>
                    <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
               <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md text-sm text-green-700">
                <p><ShieldCheck className="inline h-5 w-5 mr-1" /> Secure payment options available.</p>
              </div>
            </div>
          </div>
        )}
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

export default CartPage;