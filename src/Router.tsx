import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import { HomePage } from './modules/home/home-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ]
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
