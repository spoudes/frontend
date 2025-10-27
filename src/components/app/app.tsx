import { Routes, Route } from 'react-router-dom';
import SectionsContainer from '../SectionsContainer';

export const App = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Routes>
        <Route path="/" element={<SectionsContainer />} />
      </Routes>
    </main>
  );
};
