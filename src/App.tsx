import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Header } from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-center" richColors />
    </>
  );
}
