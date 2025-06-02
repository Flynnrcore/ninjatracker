import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import { ErrorPage, MainPage, TrackerPage, NewTrainPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage picUrl="/error-img.webp" message="Упс! Что-то пошло не так" />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: '/tracker',
        element: <TrackerPage />,
      },
      {
        path: '/newtrain',
        element: <NewTrainPage />,
      },
      {
        path: '*',
        element: <ErrorPage picUrl="/404-img.webp" message="Страница не найдена" />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
