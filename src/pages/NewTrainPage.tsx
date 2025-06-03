import DatePickerDemo from '@/components/DatePicker';
import Metronome from '../components/Metronome';
import Timer from '../components/Timer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import StarRating from '@/components/StarRaiting';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const NewTrainPage = () => {
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
        <div className="flex items-start gap-4">
          <div className="w-1/2">
            <label htmlFor="trainName">Название тренировки:</label>
            <Input id="trainName" type="text" className="h-9" placeholder="Название тренировки" />
            <label htmlFor="trainDescription" className="mt-3">
              Описание:
            </label>
            <Textarea id="trainDescription" placeholder="Описание тренировки" className="h-25" />
          </div>
          <div className="w-1/2">
            <label htmlFor="trainDate">Дата тренировки:</label>
            <DatePickerDemo id="trainDate" />
            <label htmlFor="exerciseType" className="mt-4">
              Тип тренировки:
            </label>
            <RadioGroup className="flex" defaultValue="exercises">
              <div className="flex space-x-2">
                <RadioGroupItem value="exercises" id="exercises" />
                <Label htmlFor="exercises">Упражения</Label>
              </div>
              <div className="flex space-x-2">
                <RadioGroupItem value="songs" id="songs" />
                <Label htmlFor="songs">Песни</Label>
              </div>
              <div className="flex space-x-2">
                <RadioGroupItem value="rhythm" id="rhythm" />
                <Label htmlFor="rhythm">Ритмика</Label>
              </div>
            </RadioGroup>
            <label htmlFor="trainDifficulty" className="mt-3">
              Сложность:
            </label>
            <StarRating id="trainDifficulty" value={difficulty} onChange={setDifficulty} name="difficulty" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="trainInstrument" className="mt-3 text-center">
            Инструмент:
          </label>
          <ToggleGroup variant="outline" defaultValue="eguitar" id="trainInstrument" type="single">
            <ToggleGroupItem className="h-[100px]" value="piano">
              <img className="max-h-[100px]" src="/icons/piano.webp" alt="piano" />
            </ToggleGroupItem>
            <ToggleGroupItem className="h-[100px]" value="drums">
              <img className="max-h-[100px]" src="/icons/drums.webp" alt="drums" />
            </ToggleGroupItem>
            <ToggleGroupItem className="h-[100px]" value="bass">
              <img className="max-h-[100px]" src="/icons/bass.webp" alt="bass" />
            </ToggleGroupItem>
            <ToggleGroupItem className="h-[100px]" value="eguitar">
              <img className="max-h-[80px]" src="/icons/eguitar.webp" alt="electric-guitar" />
            </ToggleGroupItem>
            <ToggleGroupItem className="h-[100px]" value="acguitar">
              <img className="max-h-[80px]" src="/icons/aguitar.webp" alt="acoustic-guitar" />
            </ToggleGroupItem>
            <ToggleGroupItem className="h-[100px]" value="vocal">
              <img className="max-h-[90px]" src="/icons/microphone.webp" alt="vocal" />
            </ToggleGroupItem>
            <ToggleGroupItem className="h-[100px]" value="other">
              <img className="max-h-[100px]" src="/icons/other.webp" alt="other" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
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

export default NewTrainPage;
