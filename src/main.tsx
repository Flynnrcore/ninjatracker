import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import { ErrorPage, MainPage, TrackerPage, NewTrainPage, DashboardPage } from './pages';
import { BASE_URL, PATH } from './constants/paths';
import { TrainingsProvider } from './context/TrainingContext';
import { AuthProvider } from './context/AuthContext';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage picUrl={PATH.NOT_FOUND_IMG} message="Упс! Что-то пошло не так" />,
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
          path: '/new',
          element: <NewTrainPage />,
        },
        {
          path: '/dashboard',
          element: <DashboardPage />,
        },
        {
          path: '*',
          element: <ErrorPage picUrl={PATH.ERROR_IMG} message="Страница не найдена" />,
        },
      ],
    },
  ],
  { basename: BASE_URL },
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <TrainingsProvider>
        <RouterProvider router={router} />
      </TrainingsProvider>
    </AuthProvider>
  </StrictMode>,
);
