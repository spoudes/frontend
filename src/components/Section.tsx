import React, { useState, useRef, useEffect } from 'react';
import FileUpload from './FileUpload';

interface SectionProps {
  id: string;
  title: string;
  files: File[];
  onTitleChange: (id: string, newTitle: string) => void;
  onFilesChange: (id: string, newFiles: File[]) => void;
  showBottomBorder: boolean;
}

const Section: React.FC<SectionProps> = ({ 
  id, 
  title, 
  files, 
  onTitleChange, 
  onFilesChange,
  showBottomBorder 
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingTitle]);

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (currentTitle.trim()) {
      onTitleChange(id, currentTitle);
    } else {
      setCurrentTitle(title);
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
  };

  return (
    <div className={`py-6 ${showBottomBorder ? 'border-b border-gray-200' : ''}`}>
      <div className="mb-4">
        {isEditingTitle ? (
          <input
            ref={inputRef}
            type="text"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            className="text-2xl font-bold w-full px-2 py-1 border-b-2 border-blue-500 
                       focus:outline-none bg-transparent"
          />
        ) : (
          <h2
            onClick={handleTitleClick}
            className="text-2xl font-bold cursor-pointer hover:text-gray-700 
                       transition-colors duration-150 px-2 py-1"
          >
            {currentTitle}
          </h2>
        )}
      </div>

      <FileUpload
        files={files}
        onFilesChange={(newFiles) => onFilesChange(id, newFiles)}
      />
    </div>
  );
};

export default Section;