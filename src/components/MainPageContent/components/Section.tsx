import { cn } from '@/lib/utils';

type TSection = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const Section = ({ title, children, className }: TSection) => (
  <section className={cn('section', className)}>
    <h2>{title}</h2>
    {children}
  </section>
);

export default Section;
