import { PATH, withBaseUrl } from '@/constants/paths';
import BackgroundAnimation from '../components/BackgroundAnimation';

const MainPage = () => {
  const sectionStyle = 'flex flex-col items-center gap-4 className={textStyle}-4 lg:w-8/9';
  const articleStyle = 'rounded-2xl p-5 shadow-lg bg-white';
  const textStyle = 'text-lg text-gray-700';

  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-stone-50">
      <section className="relative flex items-center justify-center overflow-hidden">
        <BackgroundAnimation countNotes={50} />
        <div className="z-1 m-10 flex items-center gap-12 rounded-2xl border-1 bg-white">
          <img className="w-1/3 rounded-2xl" src={PATH.MAIN_PAGE_LOGO} alt="Ninja practicing with music" />
          <div className="p className={textStyle}-10 text-center">
            <h1 className="font-[LogoFont] text-8xl">NinjaTracker</h1>
            <h3 className="text-5xl font-bold"> Ваш личный музыкальный трекер</h3>
            <p className="mt-2 text-2xl">Легко отслеживайте прогресс в занятиях музыкой.</p>
            <p className="text-2xl">
              Ставьте цели, ведите записи и достигайте новых высот вместе с{' '}
              <span className="font-[LogoFont] text-4xl">NinjaTracker!</span>
            </p>
            <a href={withBaseUrl("/newtrain")}>
              <button className="mt-6 w-md rounded-lg bg-yellow-500 px-6 py-3 text-2xl text-white transition-colors hover:scale-105 hover:bg-yellow-400 active:scale-95">
                Начать тренировку
              </button>
            </a>
          </div>
        </div>
      </section>
      <section className={sectionStyle}>
        <h2>Отслеживание прогресса занятий</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <article className={articleStyle}>
            <h3>Детальный учет времени</h3>
            <p className={textStyle}>
              Записывайте время, потраченное на каждое упражнение и песню, чтобы точно знать, куда уходит ваше время.
            </p>
          </article>
          <article className={articleStyle}>
            <h3>Визуализация данных</h3>
            <p className={textStyle}>
              Преобразуйте свои данные в наглядные графики и статистику для быстрого понимания прогресса.
            </p>
          </article>
          <article className={articleStyle}>
            <h3>Персонализация</h3>
            <p className={textStyle}>
              Настраивайте параметры отслеживания под свои уникальные нужды, будь то жанр или инструмент.
            </p>
          </article>
          <article className={articleStyle}>
            <h3>Сравнение периодов</h3>
            <p className={textStyle}>
              Сравните текущий прогресс с предыдущими периодами, чтобы сохранять мотивацию и видеть свой рост.
            </p>
          </article>
        </div>
      </section>
      <section className={`${sectionStyle} flex-row`}>
        <div className="flex flex-col gap-8 rounded-2xl bg-white p-10 shadow-lg">
          <h2>Планирование тренировок и репертуара</h2>
          <article className="flex items-center gap-5">
            <img className="h-12 w-12 object-cover" src="/shuriken.webp" alt="marker list" />
            <div>
              <h3>Создание расписаний</h3>
              <p className={textStyle}>
                Составляйте гибкие расписания тренировок и репертуаров, чтобы ничего не забыть.
              </p>
            </div>
          </article>
          <article className="flex items-center gap-5">
            <img className="h-12 w-12 object-cover" src="/shuriken.webp" alt="marker list" />
            <div>
              <h3>Отслеживание выполнения</h3>
              <p className={textStyle}>Отмечайте выполненные упражнения и песни, чтобы видеть свой прогресс.</p>
            </div>
          </article>
          <article className="flex items-center gap-5">
            <img className="h-12 w-12 object-cover" src="/shuriken.webp" alt="marker list" />
            <div>
              <h3>Анализ результатов</h3>
              <p className={textStyle}>
                Регулярно анализируйте свои достижения и корректируйте планы для достижения лучших результатов.
              </p>
            </div>
          </article>
        </div>
        <img className="h-full w-1/2 rounded-2xl object-cover" src={PATH.MAIN_PAGE_SHEDULE_IMG} alt="ninja with schedule" />
      </section>
      <section className={`${sectionStyle} mb-10`}>
        <h2>Управление заметками и идеями</h2>
        <div className="grid grid-cols-1 gap-8 pt-5 md:grid-cols-2 lg:grid-cols-2">
          <article className={articleStyle}>
            <h3>Заметки о тренировках</h3>
            <p className={textStyle}>Создавайте заметки о каждой тренировке, чтобы не забыть важные моменты и идеи.</p>
          </article>
          <article className={articleStyle}>
            <h3>Сохранение идей</h3>
            <p className={textStyle}>Фиксируйте все свои музыкальные идеи и вдохновения для будущих проектов.</p>
          </article>
          <article className={articleStyle}>
            <h3>Организация</h3>
            <p className={textStyle}>Организуйте заметки по категориям и тегам для быстрого поиска и удобства.</p>
          </article>
          <article className={articleStyle}>
            <h3>Интеграция ресурсов</h3>
            <p className={textStyle}>Добавляйте ссылки на полезные ресурсы, видеоуроки и музыкальные примеры.</p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
