import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import { publicProtectedFlattenRoutes } from './routes';
import Homepage from './pages/Homepage';
import { albumRoute } from './routes/routes.contants';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to={albumRoute} replace />} />
        {publicProtectedFlattenRoutes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={<Homepage>{route.element}</Homepage>}
          />
        ))}
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
