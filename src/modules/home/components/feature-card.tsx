import type React from 'react';

interface FeatureCardProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="flex min-w-60 max-w-160 w-full flex-col items-center space-y-2 rounded-lg border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-background/80 backdrop-blur-sm h-full">
      <div className="rounded-full bg-primary/10 p-3 transition-all duration-300 hover:bg-primary/20 group">
        <Icon className="h-6 w-6 text-primary transition-all duration-300 group-hover:scale-110" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-center text-muted-foreground">{description}</p>
    </div>
  );
};
