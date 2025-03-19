import { CheckCircle } from 'lucide-react';

import { ScrollReveal } from './scroll-reveal';

const benefits = [
  'Real-time synchronization across all devices',
  'Offline access to your events and schedules',
  'Optimized for both desktop and mobile experiences',
  'Automatic backups to keep your data safe'
];

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="w-full h-screen py-12 md:py-24 lg:py-32 flex items-center snap-start snap-always relative overflow-hidden">
      {/* Subtle animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/5 animate-gradient-slow"></div>

      <div className="@container px-4 md:px-6 min-w-full relative z-10">
        <div className="mx-auto grid max-w-5xl items-center justify-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <ScrollReveal direction="left">
            <img
              src="/placeholder.svg?height=550&width=550"
              width={550}
              height={550}
              alt="Calendar App Mobile View"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
            />
          </ScrollReveal>

          <div className="flex flex-col justify-center space-y-4">
            <ScrollReveal direction="right">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter @max-5xl:mx-auto sm:text-4xl relative w-fit text-center">
                  Take your calendar everywhere
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full @max-5xl:left-1/2 @max-5xl:-translate-x-1/2"></span>
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed @max-5xl:text-center mt-4">
                  Our app works seamlessly across all your devices, ensuring you&apos;re always up to date no matter
                  where you are.
                </p>
              </div>
            </ScrollReveal>

            <div className="@max-5xl:m-auto">
              <ul className="grid gap-4 mt-6">
                {benefits.map((benefit, index) => (
                  <ScrollReveal key={index} delay={300 + index * 150} direction="right">
                    <li className="flex items-center gap-2 transition-all duration-300 hover:translate-x-1">
                      <CheckCircle className="h-5 w-5 text-primary animate-pulse-slow" />
                      <span>{benefit}</span>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
