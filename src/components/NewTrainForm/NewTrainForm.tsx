import Metronome from '@/components/Metronome';
import Timer from '@/components/NewTrainForm/Timer/Timer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import StarRating from '@/components/NewTrainForm/StarRating/StarRaiting';
import InstrumentSelector from './InstrumentSelector/InstrumentSelector';
import TrainType from './TrainType/TrainType';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '../ui/datepicker';
import { toast } from 'sonner';
import ErrorPageContent from '../ErrorPageContent';
import { PATH } from '@/constants/paths';
import { useAuthContext, type AuthContextType } from '@/context/AuthContext';
import { useRemoteTraining } from '@/hooks/useRemoteTraining';
import { AuthForm } from '../AuthForm';

const NewTrainForm = () => {
  const { user } = useAuthContext() as AuthContextType;
  const { addTraining } = useRemoteTraining();
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newTrain = {
      name: String(formData.get('name') || ''),
      description: String(formData.get('description') || ''),
      date: String(formData.get('date') || new Date().toISOString()),
      difficulty: Number(formData.get('difficulty') || difficulty),
      instrument: String(formData.get('instrument') || ''),
      timer: Number(formData.get('time') || 0),
      type: String(formData.get('type') || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
    };

    try {
      await addTraining(newTrain);
      toast.success('Тренировка успешно добавлена');
      navigate('/tracker');
    } catch {
      toast.error('Ошибка при добавлении тренировки');
    }
  };

  const buttonStyle =
    'mt-6 w-full rounded-lg bg-yellow-500 px-6 py-3 text-lg md:text-2xl text-white transition-all hover:scale-[1.01] hover:bg-yellow-400 active:scale-95';

  if (!user)
    return (
      <ErrorPageContent
        picUrl={PATH.LOCK_IMG}
        message="Пожалуйста, войдите в аккаунт"
        children={<AuthForm mode="login" />}
      />
    );

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
                  <label htmlFor="trainName">Название тренировки:</label>
                  <Input
                    required
                    maxLength={50}
                    id="trainName"
                    name="name"
                    type="text"
                    className="h-10 w-full sm:h-9"
                    placeholder="Название тренировки"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label htmlFor="trainDescription">Описание:</label>
                  <Textarea
                    maxLength={100}
                    id="trainDescription"
                    placeholder="Описание тренировки"
                    className="h-24 w-full sm:h-20"
                    name="description"
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="space-y-4">
                <div>
                  <label htmlFor="trainDate">Дата тренировки:</label>
                  <DatePicker />
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
