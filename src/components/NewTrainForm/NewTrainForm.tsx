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
    'mt-6 w-full rounded-lg bg-yellow-500 px-6 py-3 text-2xl text-white transition-colors hover:scale-101 hover:bg-yellow-400';
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 pt-2 pb-6">
      <div className="flex w-full items-center justify-center">
        <h1 className="mb-3 border-b-6 border-yellow-400 pb-3 text-4xl font-bold">
          Новая <span className="relative top-2 font-[LogoFont] text-5xl">Ninja</span> тренировка!
        </h1>
      </div>
      <form className="rounded-2xl border-1 border-gray-100 bg-white p-8 shadow-sm" onSubmit={handleSubmit}>
        <div className="flex w-auto flex-nowrap items-start gap-4 overflow-auto">
          <div className="w-1/2">
            <label htmlFor="trainName">Название тренировки:</label>
            <Input id="trainName" type="text" className="h-9" placeholder="Название тренировки" />
            <label htmlFor="trainDescription" className="mt-3">
              Описание:
            </label>
            <Textarea maxLength={250} id="trainDescription" placeholder="Описание тренировки" className="h-20" />
          </div>
          <div className="w-1/2">
            <label htmlFor="trainDate">Дата тренировки:</label>
            <Input id="trainDate" type="date" className="h-9" />
            <TrainType />
          </div>
        </div>
        <StarRating value={difficulty} onChange={setDifficulty} />
        <InstrumentSelector />
        <div className="mt-3 rounded-2xl border-gray-200 bg-gray-50 p-4 outline-1">
          <Timer />
        </div>
        <button type="submit" className={buttonStyle}>
          Записать тренировку
        </button>
      </form>
      <Metronome className="mt-6 p-4" />
    </div>
  );
};

export default NewTrainForm;
