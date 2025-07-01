import { PATH } from '@/constants/paths';

export const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <article className="article">
    <h3>{title}</h3>
    <p>{description}</p>
  </article>
);

export const ListFeature = ({ title, description }: { title: string; description: string }) => (
  <article className="flex items-start gap-4">
    <img className="mt-1 h-10 w-10 object-cover md:h-12 md:w-12" src={PATH.SHURIKEN} loading="lazy" alt="marker list" />
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </article>
);
