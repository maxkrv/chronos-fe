import { ScrollReveal } from './scroll-reveal';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Is the app really free?',
    answer: 'Yes, our calendar app is completely free to use with all core features included.'
  },
  {
    question: 'How do I sync across devices?',
    answer: 'Simply sign in with the same account on all your devices, and your calendar will automatically sync.'
  },
  {
    question: 'Can I share my calendar with others?',
    answer: 'Yes, you can easily share your calendar with friends, family, or colleagues.'
  },
  {
    question: 'Is my data secure?',
    answer:
      'We use industry-standard encryption to protect your data and never share your information with third parties.'
  }
];

export const FAQSection = () => {
  return (
    <section
      id="faq"
      className="w-full min-h-screen py-12 md:py-24 lg:py-32 bg-muted grid snap-start snap-always relative overflow-hidden">
      <div className="@container px-4 md:px-6 relative z-10">
        <ScrollReveal className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              <span className="relative inline-block">
                Frequently Asked Questions
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-1 bg-primary rounded-full"></span>
              </span>
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed mt-6">
              Find answers to common questions about our calendar app.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2">
          {faqItems.map((item, index) => (
            <ScrollReveal key={index} delay={200 * (index + 1)} direction={index % 2 === 0 ? 'left' : 'right'}>
              <div className="space-y-2 p-6 border rounded-lg bg-background/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <h3 className="text-xl font-bold">{item.question}</h3>
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
