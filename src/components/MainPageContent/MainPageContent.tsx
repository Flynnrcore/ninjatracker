import { PATH } from '@/constants/paths';
import BackgroundAnimation from '../BackgroundAnimation';
import { Link } from 'react-router-dom';
import Section from './components/Section';
import { MAIN_PAGE } from '@/constants/mainPage';
import { FeatureCard, ListFeature } from './components/Articles';

const MainPageContent = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-12 pb-12">
      <section className="relative flex w-full items-center justify-center overflow-hidden py-8 md:py-12">
        <BackgroundAnimation countNotes={50} />
        <div className="z-10 mx-4 flex max-w-6xl flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white p-6 pb-0 md:mx-8 lg:flex-row lg:gap-12">
          <img
            className="aspect-auto h-full min-h-[200px] w-full rounded-2xl object-cover lg:w-1/3"
            src={PATH.MAIN_PAGE_LOGO}
            alt="Ninja practicing with music"
            width={1024}
            height={1024}
          />
          <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
            <h1 className="font-logo mb-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl">NinjaTracker</h1>
            <h3 className="mb-1 text-2xl font-bold text-yellow-500 sm:text-3xl md:text-4xl">
              Ваш личный музыкальный трекер
            </h3>
            <p className="mb-1 text-lg text-gray-700 md:text-xl lg:text-2xl">
              Легко отслеживайте прогресс в занятиях музыкой.
            </p>
            <p className="text-lg text-gray-700 md:text-xl lg:text-2xl">
              Ставьте цели, ведите записи и достигайте новых высот <br />
              вместе с{' '}
              <span className="font-logo text-2xl text-yellow-500 sm:relative sm:top-2 md:text-3xl lg:text-4xl">
                NinjaTracker!
              </span>
            </p>
            <Link
              className="w-full min-w-[200px] rounded-lg bg-yellow-500 px-12 py-3 text-lg text-white transition-transform hover:scale-105 hover:bg-yellow-400 active:scale-95 sm:w-auto md:mt-6 md:px-20 md:text-xl"
              to="/new">
              Начать тренировку
            </Link>
          </div>
        </div>
      </section>

      <Section title="Отслеживание прогресса занятий">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {MAIN_PAGE.features.children.map((item, index) => (
            <FeatureCard key={index} title={item.title} description={item.description} />
          ))}
        </div>
      </Section>

      <Section title="" className="max-w-6xl">
        <div className="flex w-full flex-col gap-8 lg:flex-row">
          <div className="order-2 flex w-full flex-col gap-8 rounded-2xl bg-white p-6 shadow-lg sm:order-1 md:p-8 lg:w-1/2">
            <h2>Планирование тренировок и репертуара</h2>
            {MAIN_PAGE.shedule.children.map((item, index) => (
              <ListFeature key={index} title={item.title} description={item.description} />
            ))}
          </div>
          <img
            className="order-1 mt-0 w-full object-contain sm:order-2 lg:block lg:w-1/2"
            src={PATH.MAIN_PAGE_SHEDULE_IMG}
            alt="ninja with schedule"
          />
        </div>
      </Section>

      <Section title="Управление заметками и идеями" className="max-w-6xl">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {MAIN_PAGE.notes.children.map((item, index) => (
            <FeatureCard key={index} title={item.title} description={item.description} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default MainPageContent;
