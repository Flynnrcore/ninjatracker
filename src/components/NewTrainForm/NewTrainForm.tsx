import Metronome from '@/components/Metronome';
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ErrorPageContent from '../ErrorPageContent';
import { PATH } from '@/constants/paths';
import { useAuthContext } from '@/context/AuthContext';
import { useRemoteTraining } from '@/hooks/useRemoteTraining';
import { useDataRefresh } from '@/hooks/useDataRefresh';
import { useFormValidation } from '@/hooks/useFormValidation';
import { TRAINING_FORM_VALIDATION_RULES, FORM_CONSTRAINTS } from '@/constants/validation';
import AuthForm from '../AuthForm/AuthForm';
import { StarRating, InstrumentSelector, TrainType, Timer } from '.';
import { Input, Textarea, DatePicker, Button } from '../ui';
import { Loader2 } from 'lucide-react';

const NewTrainForm = () => {
  const authContext = useAuthContext();
  const { addTraining } = useRemoteTraining();
  const { refreshData } = useDataRefresh();
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const navigate = useNavigate();

  const { validateForm, errors } = useFormValidation(TRAINING_FORM_VALIDATION_RULES);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData(e.target as HTMLFormElement);

      // Валидация формы
      if (!validateForm(formData)) {
        toast.error('Пожалуйста, заполните все обязательные поля');
        setLoading(false);
        return;
      }

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
        // Обновляем данные после успешного добавления
        refreshData();
        toast.success('Тренировка успешно добавлена');
        navigate('/tracker');
      } catch (err: unknown) {
        toast.error((err as Error).message || 'Ошибка при добавлении тренировки');
      } finally {
        setLoading(false);
      }
    },
    [validateForm, difficulty, addTraining, navigate, refreshData],
  );

  if (!authContext?.user) {
    return (
      <ErrorPageContent
        picUrl={PATH.LOCK_IMG}
        message="Пожалуйста, войдите в аккаунт"
        children={<AuthForm mode="login" loader={authContext?.loading} />}
      />
    );
  }

  return (
    <div className="mt-15 flex min-h-screen flex-col items-center bg-stone-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <div className="flex justify-center">
          <h1 className="mb-4 border-b-4 border-yellow-400 pb-2 text-3xl font-bold sm:mb-6 sm:border-b-6 sm:pb-3 sm:text-4xl">
            Новая <span className="relative top-1 font-logo sm:top-2 sm:text-5xl">Ninja</span> тренировка!
          </h1>
        </div>
        <form
          className="w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 md:p-8 lg:w-auto"
          onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:gap-8">
            <div className="h-auto w-full md:w-1/2">
              <div className="flex h-full flex-col space-y-4">
                <div>
                  <label htmlFor="trainName">
                    Название тренировки
                    <span className="required-dot">*</span>:
                  </label>
                  <Input
                    maxLength={FORM_CONSTRAINTS.NAME_MAX_LENGTH}
                    id="trainName"
                    name="name"
                    type="text"
                    className="h-10 w-full sm:h-9"
                    placeholder="Название тренировки"
                    autoComplete="off"
                  />
                </div>
                <div className="flex h-full flex-col">
                  <label htmlFor="trainDescription">Описание:</label>
                  <Textarea
                    maxLength={FORM_CONSTRAINTS.DESCRIPTION_MAX_LENGTH}
                    id="trainDescription"
                    placeholder="Описание тренировки"
                    className="h-24 w-full sm:h-full"
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

            {Object.keys(errors).length > 0 && (
              <div className="text-red-500">Пожалуйста, заполните все обязательные поля</div>
            )}

            <Button type="submit" className="submit-button" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : 'Записать тренировку'}
            </Button>
          </div>
        </form>
      </div>
      <Metronome className="mt-6 w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6" />
    </div>
  );
};

export default NewTrainForm;
