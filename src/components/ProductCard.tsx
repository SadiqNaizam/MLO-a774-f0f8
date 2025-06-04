import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from 'lucide-react';
// import { useToast } from "@/hooks/use-toast"; // Uncomment if you want to use toast notifications

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  category?: string; // Optional category badge
  onAddToCart: (id: string | number) => void;
  onViewDetails?: (id: string | number) => void; // Optional: for navigating to product detail page
  imageAlt?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  category,
  onAddToCart,
  onViewDetails,
  imageAlt,
}) => {
  // const { toast } = useToast(); // Uncomment for toast notifications
  console.log("Rendering ProductCard:", name);

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onViewDetails if card is clickable
    console.log("Add to cart clicked for product ID:", id);
    onAddToCart(id);
    // Example toast:
    // toast({ title: "Added to cart!", description: `${name} has been added to your cart.` });
  };

  const handleCardClick = () => {
    if (onViewDetails) {
        console.log("Card clicked, viewing details for product ID:", id);
        onViewDetails(id);
    }
  };

  return (
    <Card
        className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer group"
        onClick={handleCardClick}
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={imageAlt || name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
              console.warn(`Failed to load image for ${name} at ${imageUrl}. Falling back to placeholder.`);
            }}
          />
        </AspectRatio>
        {category && (
          <Badge variant="secondary" className="absolute top-2 right-2">
            {category}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <CardTitle className="text-md font-semibold leading-tight line-clamp-2 h-12">
            {name}
        </CardTitle>
        <p className="text-lg font-bold text-primary">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCartClick} variant="outline">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;