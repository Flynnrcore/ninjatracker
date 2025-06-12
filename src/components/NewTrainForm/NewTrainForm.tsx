import Metronome from '@/components/Metronome';
import Timer from '@/components/NewTrainForm/Timer/Timer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import StarRating from '@/components/NewTrainForm/StarRating/StarRaiting';
import InstrumentSelector from './InstrumentSelector/InstrumentSelector';
import TrainType from './TrainType/TrainType';

const NewTrainForm = () => {
  const [difficulty, setDifficulty] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const buttonStyle =
    'mt-6 w-full rounded-lg bg-yellow-500 px-6 py-3 text-lg md:text-2xl text-white transition-all hover:scale-[1.01] hover:bg-yellow-400 active:scale-95';

  return (
    <div className="mt-15 flex min-h-screen flex-col items-center bg-stone-50 px-4 py-6 sm:px-6 lg:justify-center lg:px-8">
      <div className="w-full max-w-4xl">
        <div className="flex justify-center">
          <h1 className="mb-4 border-b-4 border-yellow-400 pb-2 text-3xl font-bold sm:mb-6 sm:border-b-6 sm:pb-3 sm:text-4xl">
            Новая <span className="font-[LogoFont] sm:relative sm:top-2 sm:text-5xl">Ninja</span> тренировка!
          </h1>
        </div>
        <form
          className="w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 md:p-8 lg:w-auto"
          onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <div className="w-full md:w-1/2">
              <div className="space-y-4">
                <div>
                  <label htmlFor="trainName" className="block text-sm font-medium text-gray-700 sm:text-base">
                    Название тренировки:
                  </label>
                  <Input id="trainName" type="text" className="h-10 w-full sm:h-9" placeholder="Название тренировки" />
                </div>
                <div>
                  <label htmlFor="trainDescription" className="block text-sm font-medium text-gray-700 sm:text-base">
                    Описание:
                  </label>
                  <Textarea
                    maxLength={250}
                    id="trainDescription"
                    placeholder="Описание тренировки"
                    className="h-24 w-full sm:h-20"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="space-y-4">
                <div>
                  <label htmlFor="trainDate" className="block text-sm font-medium text-gray-700 sm:text-base">
                    Дата тренировки:
                  </label>
                  <Input id="trainDate" type="date" className="h-10 w-full sm:h-9" />
                </div>
                <TrainType />
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-6">
            <StarRating value={difficulty} onChange={setDifficulty} />
            <InstrumentSelector />
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 sm:rounded-2xl">
              <Timer />
            </div>

            <button type="submit" className={buttonStyle}>
              Записать тренировку
            </button>
          </div>
        </form>
      </div>
      <Metronome className="mt-6 w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6" />
    </div>
  );
};

export default NewTrainForm;
