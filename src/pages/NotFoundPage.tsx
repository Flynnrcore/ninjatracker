import Footer from '../components/Footer';
import Header from '../components/Header';

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-center text-2xl">Страница не найдена</p>
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
