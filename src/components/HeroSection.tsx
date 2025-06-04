import React from 'react';
import { Button } from '@/components/ui/button'; // Example: using shadcn Button
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  imageUrl?: string; // Optional background image
  ctaText: string;
  onCtaClick: () => void;
  imageAlt?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  imageUrl = '/placeholder.svg', // Default placeholder
  ctaText,
  onCtaClick,
  imageAlt = 'Hero image',
}) => {
  console.log("Rendering HeroSection with title:", title);

  return (
    <section className="relative bg-gray-900 text-white py-20 md:py-32">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url(${imageUrl})` }}
        role="presentation"
        aria-label={imageAlt}
      ></div>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <Button size="lg" onClick={onCtaClick} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          {ctaText}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;