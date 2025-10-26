import { Routes, Route } from 'react-router-dom';

export const App = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Routes>
        <Route
          path="/"
          element={
            <div className="text-3xl font-bold underline m-auto text-red-500">
              Linker Frontend Template
            </div>
          }
        />
      </Routes>
    </main>
  );
};
