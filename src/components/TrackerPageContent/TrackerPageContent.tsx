import { useCallback } from 'react';
import { useRemoteTraining } from '@/hooks/useRemoteTraining';
import { useTrainingFilters } from '@/hooks/useTrainingFilters';
import { useViewMode } from '@/hooks/useViewMode';
import LoaderFallback from '../LoaderFallback';
import { toast } from 'sonner';
import PageWrapper from '../PageWrapper';
import { TrainingFilters, ViewModeToggle, TrainingCards, TrainingTable } from './components';

const TrackerPageContent = () => {
  const { trainings, loading, deleteTraining, setTrainings } = useRemoteTraining();
  const { viewMode, setViewMode } = useViewMode();
  const { selectedInstrument, selectedType, setSelectedInstrument, setSelectedType, filteredTrainings } =
    useTrainingFilters(trainings);

  const handleRemoveTraining = useCallback(
    async (id: number | string) => {
      try {
        await deleteTraining(Number(id));
        setTrainings(prev => prev.filter(train => train.id !== id));
        toast.success('Тренировка удалена');
      } catch {
        toast.error('Ошибка при удалении тренировки');
      }
    },
    [deleteTraining, setTrainings],
  );

  if (loading) return <LoaderFallback />;

  return (
    <PageWrapper title="Журнал тренировок">
      {/* Фильтры и переключение вида */}
      <div className="flex flex-col justify-between gap-4 border-b border-stone-200 pb-4 sm:flex-row sm:items-center sm:gap-6">
        <TrainingFilters
          selectedInstrument={selectedInstrument}
          selectedType={selectedType}
          onInstrumentChange={setSelectedInstrument}
          onTypeChange={setSelectedType}
        />
        <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
      </div>

      {/* Данные тренировок */}
      {viewMode === 'table' ? (
        <div className="mt-4 h-[calc(100vh-200px)]">
          <TrainingTable trainings={filteredTrainings} onDeleteTraining={handleRemoveTraining} />
        </div>
      ) : (
        <TrainingCards trainings={filteredTrainings} onDeleteTraining={handleRemoveTraining} />
      )}
    </PageWrapper>
  );
};

export default TrackerPageContent;
