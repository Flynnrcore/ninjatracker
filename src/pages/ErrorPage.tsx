type TErrorPage = { picUrl: string; message: string };

const ErrorPage = ({ picUrl, message }: TErrorPage) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-stone-50">
      <img src={picUrl} alt="Error img" className="mb-6 h-1/2" />
      <h1 className="text-4xl font-bold">{message}</h1>
      <a href="/" className="mt-6 text-yellow-500 hover:underline">
        Вернуться на главную
      </a>
    </div>
  );
};

export default ErrorPage;
