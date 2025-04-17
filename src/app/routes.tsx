import { Home } from '@/components/page/home';
import { Route, Routes } from 'react-router-dom';

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />}></Route>
    </Routes>
  );
}
