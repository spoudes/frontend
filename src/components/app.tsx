import { Routes, Route } from 'react-router-dom';
import SectionsContainer from './SectionsContainer';
import { CourseViewer } from './LiascriptViewer';
import { CourseProvider } from '../context/CourseContext';
export const App = () => {
  return (
    <CourseProvider>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Routes>
          <Route path="/" element={<SectionsContainer />} />
          <Route path="/course" element={<CourseViewer />} />
        </Routes>
      </main>
    </CourseProvider>
  );
};
