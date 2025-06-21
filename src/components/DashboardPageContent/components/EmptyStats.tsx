const EmptyStats = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="text-md text-gray-400">Нет данных</p>
      <p className="text-sm text-gray-400">Начни новую тренировку чтобы увидеть статистику!</p>
    </div>
  );
};

export { EmptyStats };
export default EmptyStats;
