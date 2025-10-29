import React, { useState } from 'react';
import Section from './Section';
import { useCourse } from '../context/CourseContext';
import { useNavigate } from 'react-router-dom';
interface SectionData {
  id: string;
  title: string;
  files: File[];
}

interface CourseStructure {
  course_title: string;
  chapters: Array<{
    title: string;
    content: string;
    sub_topics: any[];
  }>;
}

const SectionsContainer: React.FC = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState<SectionData[]>([]);
  const [courseTitle, setCourseTitle] = useState<string>('Новый курс');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { setCourseResponse } = useCourse();
  const addSection = () => {
    const newSection: SectionData = {
      id: Date.now().toString(),
      title: 'Новый раздел',
      files: [],
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
  };

  const updateSectionTitle = (id: string, newTitle: string) => {
    setSections(
      sections.map(section =>
        section.id === id ? { ...section, title: newTitle } : section
      )
    );
  };

  const updateSectionFiles = (id: string, newFiles: File[]) => {
    setSections(
      sections.map(section =>
        section.id === id ? { ...section, files: newFiles } : section
      )
    );
  };

  const handleGenerateCourse = async () => {
    if (sections.length === 0) {
      alert('Добавьте хотя бы один раздел');
      return;
    }

    setIsUploading(true);

    try {
      const courseStructure: CourseStructure = {
        course_title: courseTitle,
        chapters: sections.map(section => ({
          title: section.title,
          content: '',
          sub_topics: [],
        })),
      };

      const formData = new FormData();

      formData.append('course_structure', JSON.stringify(courseStructure));

      sections.forEach((section, index) => {
        section.files.forEach(file => {
          formData.append(`chapter_${index}_files`, file);
        });
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/upload-files`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setCourseResponse(result);
      navigate('/course');
      console.log('Курс успешно сгенерирован:', result);
    } catch (error) {
      console.error('Ошибка при генерации курса:', error);
      alert('Произошла ошибка при отправке курса');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Поле для заголовка курса */}
      <div className="mb-6">
        <input
          type="text"
          value={courseTitle}
          onChange={e => setCourseTitle(e.target.value)}
          placeholder="Название курса"
          className="text-3xl font-bold w-full px-4 py-2 border-2 border-gray-300 
                     rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      <button
        onClick={addSection}
        className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
                   font-medium transition-colors duration-200 flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Добавить раздел
      </button>

      {sections.map((section, index) => (
        <div key={section.id}>
          <Section
            id={section.id}
            title={section.title}
            files={section.files}
            onTitleChange={updateSectionTitle}
            onFilesChange={updateSectionFiles}
            showBottomBorder={index < sections.length - 1}
          />
          <button
            onClick={() => removeSection(section.id)}
            className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg 
                       font-medium transition-colors duration-200"
          >
            Удалить раздел
          </button>
        </div>
      ))}

      {sections.length > 0 && (
        <button
          onClick={handleGenerateCourse}
          disabled={isUploading}
          className={`mt-6 px-6 py-3 rounded-lg font-medium transition-colors 
                     duration-200 flex items-center gap-2
                     ${
                       isUploading
                         ? 'bg-gray-400 cursor-not-allowed'
                         : 'bg-green-500 hover:bg-green-600 text-white'
                     }`}
        >
          {isUploading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Генерация...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Сгенерировать курс
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default SectionsContainer;
