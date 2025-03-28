import { type ReactNode, useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number; // delay in ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: string; // e.g., '20px'
  once?: boolean;
}

export const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = '2rem',
  once = true
}: ScrollRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Initial state - hidden
    element.style.opacity = '0';

    // Set initial transform based on direction
    switch (direction) {
      case 'up':
        element.style.transform = `translateY(${distance})`;
        break;
      case 'down':
        element.style.transform = `translateY(-${distance})`;
        break;
      case 'left':
        element.style.transform = `translateX(${distance})`;
        break;
      case 'right':
        element.style.transform = `translateX(-${distance})`;
        break;
      case 'none':
        element.style.transform = 'none';
        break;
    }

    // Set transition
    element.style.transition = `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0) translateX(0)';
            }, 100);

            if (once) {
              observer.unobserve(element);
            }
          } else if (!once) {
            element.style.opacity = '0';
            switch (direction) {
              case 'up':
                element.style.transform = `translateY(${distance})`;
                break;
              case 'down':
                element.style.transform = `translateY(-${distance})`;
                break;
              case 'left':
                element.style.transform = `translateX(${distance})`;
                break;
              case 'right':
                element.style.transform = `translateX(-${distance})`;
                break;
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [delay, direction, distance, once]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};
