import React, { useState } from 'react';
import Section from './Section';

interface SectionData {
  id: string;
  title: string;
  files: File[];
}

const SectionsContainer: React.FC = () => {
  const [sections, setSections] = useState<SectionData[]>([]);

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

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
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
        <>
          <Section
            key={section.id}
            id={section.id}
            title={section.title}
            files={section.files}
            onTitleChange={updateSectionTitle}
            onFilesChange={updateSectionFiles}
            showBottomBorder={index < sections.length - 1}
          />
          <button
            onClick={() => removeSection(section.id)}
            className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
                   font-medium transition-colors duration-200 flex items-center gap-2"
          >
            Удалить раздел
          </button>
        </>
      ))}
      {sections.length > 0 && (
        <button
          className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
                   font-medium transition-colors duration-200 flex items-center gap-2"
        >
          Сгенерировать курс
        </button>
      )}
    </div>
  );
};

export default SectionsContainer;
