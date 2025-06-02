import Timer from '../components/Timer';

const NewTrainPage = () => {
  const lS = 'block text-md font-medium pb-2';
  const buttonStyle =
    'mt-6 w-full rounded-lg bg-yellow-500 px-6 py-3 text-2xl text-white transition-colors hover:scale-101 hover:bg-yellow-400';
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 p-6">
      <h1 className="mb-3 border-b-6 border-yellow-400 pb-3 text-4xl font-bold">
        Новая <span className="relative top-2 font-[LogoFont] text-5xl">Ninja</span> тренировка!
      </h1>
      <form className="w-full rounded-2xl bg-white p-8 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-1/2">
            <label htmlFor="trainName">Название тренировки:</label>
            <input id="trainName" type="text" placeholder="Название тренировки" />
            <label htmlFor="trainDescription" className="mt-3">
              Описание:
            </label>
            <textarea id="trainDescription" placeholder="Описание тренировки" className="h-32"></textarea>
          </div>
          <div className="w-1/2">
            <label htmlFor="trainDate">Дата тренировки:</label>
            <input id="trainDate" type="date" />
            <label htmlFor="exerciseType" className="mt-3">
              Тип тренировки:
            </label>
            <select id="exerciseType">
              <option value="scales">Упражнения</option>
              <option value="chords">Ритмика</option>
              <option value="songs">Песни</option>
            </select>
            <label htmlFor="trainDifficulty" className="mt-3">
              Сложность:
            </label>
            <select id="trainDifficulty">
              <option value="easy">★☆☆☆☆</option>
              <option value="medium">★★☆☆☆</option>
              <option value="hard">★★★☆☆</option>
              <option value="expert">★★★★☆</option>
              <option value="master">★★★★★</option>
            </select>
          </div>
        </div>
        <label htmlFor="trainInstrument" className="mt-3 text-center">
          Инструмент:
        </label>
        <select id="trainInstrument">
          <option value="eguitar">Электрогитара</option>
          <option value="piano">Клавишные</option>
          <option value="drums">Барабаны</option>
          <option value="bass">Бас-гитара</option>
          <option value="acguitar">Акустическая гитара</option>
          <option value="ukguitar">Укулеле</option>
          <option value="violin">Скрипка</option>
          <option value="flute">Флейта</option>
          <option value="saxophone">Саксофон</option>
          <option value="voice">Вокал</option>
          <option value="other">Другой</option>
        </select>
        <div className="mt-3">
          <Timer />
        </div>
        <button type="submit" className={buttonStyle}>
          Записать тренировку
        </button>
      </form>
    </div>
  );
};

export default NewTrainPage;
