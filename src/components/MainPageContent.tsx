import { PATH, withBaseUrl } from '@/constants/paths';
import BackgroundAnimation from '../components/BackgroundAnimation';
import { Link } from 'react-router-dom';

const MainPageContent = () => {
  const sectionStyle = 'w-full flex flex-col items-center gap-8 px-4 py-8 md:px-6 lg:px-0 lg:py-6';
  const articleStyle = 'rounded-2xl p-6 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300';

  return (
    <div className="flex flex-col items-center justify-center pt-12 pb-12">
      <section className="relative flex items-center justify-center w-full py-8 overflow-hidden md:py-12">
        <BackgroundAnimation countNotes={50} />
        <div className="z-10 flex flex-col items-center max-w-6xl gap-6 p-6 mx-4 bg-white border border-gray-200 rounded-2xl md:mx-8 lg:flex-row lg:gap-12">
          <img
            className="object-cover w-full rounded-2xl lg:w-1/3"
            src={PATH.MAIN_PAGE_LOGO}
            alt="Ninja practicing with music"
          />
          <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-8 text-center">
            <h1 className="mb-2 font-[LogoFont] text-5xl sm:text-6xl md:text-7xl lg:text-8xl">NinjaTracker</h1>
            <h3 className="mb-1 text-2xl font-bold text-yellow-500 sm:text-3xl md:text-4xl">
              Ваш личный музыкальный трекер
            </h3>
            <p className="mb-1 text-lg text-gray-700 md:text-xl lg:text-2xl">
              Легко отслеживайте прогресс в занятиях музыкой.
            </p>
            <p className="text-lg text-gray-700 md:text-xl lg:text-2xl">
              Ставьте цели, ведите записи и достигайте новых высот <br />
              вместе с{' '}
              <span className="font-[LogoFont] text-2xl text-yellow-500 sm:relative sm:top-2 md:text-3xl lg:text-4xl">
                NinjaTracker!
              </span>
            </p>
            <Link to="/new">
              <button className="w-full px-6 py-3 mt-4 text-lg text-white transition-all bg-yellow-500 rounded-lg hover:scale-105 hover:bg-yellow-400 active:scale-95 sm:w-auto md:mt-6 md:text-xl">
                Начать тренировку
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className={sectionStyle}>
        <h2>Отслеживание прогресса занятий</h2>
        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Детальный учет времени',
              description:
                'Записывайте время, потраченное на каждое упражнение и песню, чтобы точно знать, куда уходит ваше время.',
            },
            {
              title: 'Визуализация данных',
              description:
                'Преобразуйте свои данные в наглядные графики и статистику для быстрого понимания прогресса.',
            },
            {
              title: 'Персонализация',
              description:
                'Настраивайте параметры отслеживания под свои уникальные нужды, будь то жанр или инструмент.',
            },
            {
              title: 'Сравнение периодов',
              description:
                'Сравните текущий прогресс с предыдущими периодами, чтобы сохранять мотивацию и видеть свой рост.',
            },
          ].map((item, index) => (
            <article key={index} className={articleStyle}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${sectionStyle} max-w-6xl`}>
        <div className="flex flex-col w-full gap-8 lg:flex-row">
          <div className="flex flex-col w-full gap-8 p-6 bg-white shadow-lg rounded-2xl md:p-8 lg:w-1/2">
            <h2>Планирование тренировок и репертуара</h2>
            {[
              {
                title: 'Создание расписаний',
                description: 'Составляйте гибкие расписания тренировок и репертуаров, чтобы ничего не забыть.',
              },
              {
                title: 'Отслеживание выполнения',
                description: 'Отмечайте выполненные упражнения и песни, чтобы видеть свой прогресс.',
              },
              {
                title: 'Анализ результатов',
                description:
                  'Регулярно анализируйте свои достижения и корректируйте планы для достижения лучших результатов.',
              },
            ].map((item, index) => (
              <article key={index} className="flex items-start gap-4">
                <img
                  className="object-cover w-10 h-10 mt-1 md:h-12 md:w-12"
                  src={withBaseUrl('shuriken.webp')}
                  alt="marker list"
                />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
          <img
            className="hidden object-contain w-full lg:block lg:w-1/2"
            src={PATH.MAIN_PAGE_SHEDULE_IMG}
            alt="ninja with schedule"
          />
        </div>
      </section>

      <section className={`${sectionStyle} max-w-6xl`}>
        <h2>Управление заметками и идеями</h2>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              title: 'Заметки о тренировках',
              description: 'Создавайте заметки о каждой тренировке, чтобы не забыть важные моменты и идеи.',
            },
            {
              title: 'Сохранение идей',
              description: 'Фиксируйте все свои музыкальные идеи и вдохновения для будущих проектов.',
            },
            {
              title: 'Организация',
              description: 'Организуйте заметки по категориям и тегам для быстрого поиска и удобства.',
            },
            {
              title: 'Интеграция ресурсов',
              description: 'Добавляйте ссылки на полезные ресурсы, видеоуроки и музыкальные примеры.',
            },
          ].map((item, index) => (
            <article key={index} className={articleStyle}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainPageContent;
