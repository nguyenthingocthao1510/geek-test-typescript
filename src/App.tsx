import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { publicProtectedFlattenRoutes } from './routes';
import Homepage from './pages/Homepage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
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
