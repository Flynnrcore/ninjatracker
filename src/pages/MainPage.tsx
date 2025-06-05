import { PATH, withBaseUrl } from '@/constants/paths';
import BackgroundAnimation from '../components/BackgroundAnimation';

const MainPage = () => {
  const sectionStyle = 'w-full flex flex-col items-center gap-8 px-4 py-8 md:px-6 lg:px-0 lg:py-6';
  const articleStyle = 'rounded-2xl p-6 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300';

  return (
    <div className="flex flex-col items-center justify-center pb-12">
      <section className="relative w-full flex items-center justify-center overflow-hidden py-8 md:py-12">
        <BackgroundAnimation countNotes={50} />
        <div className="z-10 flex flex-col lg:flex-row items-center gap-6 lg:gap-12 rounded-2xl border border-gray-200 bg-white p-6 mx-4 md:mx-8 max-w-6xl">
          <img 
            className="w-full lg:w-1/3 rounded-2xl object-cover" 
            src={PATH.MAIN_PAGE_LOGO} 
            alt="Ninja practicing with music" 
          />
          <div className="text-center lg:text-left space-y-4">
            <h1 className="font-[LogoFont] text-5xl sm:text-6xl md:text-7xl lg:text-8xl">NinjaTracker</h1>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">Ваш личный музыкальный трекер</h3>
            <p className="text-lg md:text-xl lg:text-2xl">Легко отслеживайте прогресс в занятиях музыкой.</p>
            <p className="text-lg md:text-xl lg:text-2xl">
              Ставьте цели, ведите записи и достигайте новых высот вместе с{' '}
              <span className="font-[LogoFont] text-2xl md:text-3xl lg:text-4xl">NinjaTracker!</span>
            </p>
            <a href={withBaseUrl('/newtrain')}>
              <button className="mt-4 md:mt-6 w-full sm:w-auto rounded-lg bg-yellow-500 px-6 py-3 text-lg md:text-xl text-white transition-all hover:scale-105 hover:bg-yellow-400 active:scale-95">
                Начать тренировку
              </button>
            </a>
          </div>
        </div>
      </section>

      <section className={sectionStyle}>
        <h2>Отслеживание прогресса занятий</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl">
          {[
            {
              title: "Детальный учет времени",
              description: "Записывайте время, потраченное на каждое упражнение и песню, чтобы точно знать, куда уходит ваше время."
            },
            {
              title: "Визуализация данных",
              description: "Преобразуйте свои данные в наглядные графики и статистику для быстрого понимания прогресса."
            },
            {
              title: "Персонализация",
              description: "Настраивайте параметры отслеживания под свои уникальные нужды, будь то жанр или инструмент."
            },
            {
              title: "Сравнение периодов",
              description: "Сравните текущий прогресс с предыдущими периодами, чтобы сохранять мотивацию и видеть свой рост."
            }
          ].map((item, index) => (
            <article key={index} className={articleStyle}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${sectionStyle} max-w-6xl`}>
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="flex flex-col gap-8 rounded-2xl bg-white p-6 md:p-8 shadow-lg w-full lg:w-1/2">
            <h2>Планирование тренировок и репертуара</h2>
            {[
              {
                title: "Создание расписаний",
                description: "Составляйте гибкие расписания тренировок и репертуаров, чтобы ничего не забыть."
              },
              {
                title: "Отслеживание выполнения",
                description: "Отмечайте выполненные упражнения и песни, чтобы видеть свой прогресс."
              },
              {
                title: "Анализ результатов",
                description: "Регулярно анализируйте свои достижения и корректируйте планы для достижения лучших результатов."
              }
            ].map((item, index) => (
              <article key={index} className="flex items-start gap-4">
                <img className="h-10 w-10 md:h-12 md:w-12 object-cover mt-1" src={withBaseUrl('/shuriken.webp')} alt="marker list" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
          <img
            className="hidden lg:block w-full lg:w-1/2 object-contain"
            src={PATH.MAIN_PAGE_SHEDULE_IMG}
            alt="ninja with schedule"
          />
        </div>
      </section>

      <section className={`${sectionStyle} max-w-6xl`}>
        <h2>Управление заметками и идеями</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 w-full">
          {[
            {
              title: "Заметки о тренировках",
              description: "Создавайте заметки о каждой тренировке, чтобы не забыть важные моменты и идеи."
            },
            {
              title: "Сохранение идей",
              description: "Фиксируйте все свои музыкальные идеи и вдохновения для будущих проектов."
            },
            {
              title: "Организация",
              description: "Организуйте заметки по категориям и тегам для быстрого поиска и удобства."
            },
            {
              title: "Интеграция ресурсов",
              description: "Добавляйте ссылки на полезные ресурсы, видеоуроки и музыкальные примеры."
            }
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

export default MainPage;