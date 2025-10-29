import { useEffect, useRef, useState } from "react";
import FileUpload from "./FileUpload";

interface SectionProps {
  id: string;
  title: string;
  files: File[];
  subTopics: string[];
  onTitleChange: (id: string, newTitle: string) => void;
  onFilesChange: (id: string, newFiles: File[]) => void;
  onSubTopicsChange: (id: string, newSubTopics: string[]) => void;
  showBottomBorder: boolean;
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  files,
  subTopics,
  onTitleChange,
  onFilesChange,
  onSubTopicsChange,
  showBottomBorder,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [editingSubTopicIndex, setEditingSubTopicIndex] = useState<
    number | null
  >(null);
  const [subTopicInput, setSubTopicInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const subTopicInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingTitle]);

  useEffect(() => {
    if (editingSubTopicIndex !== null && subTopicInputRef.current) {
      subTopicInputRef.current.focus();
      subTopicInputRef.current.select();
    }
  }, [editingSubTopicIndex]);

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

  const addSubTopic = () => {
    const newSubTopics = [...subTopics, 'Новый подраздел'];
    onSubTopicsChange(id, newSubTopics);
    setEditingSubTopicIndex(newSubTopics.length - 1);
    setSubTopicInput('Новый подраздел');
  };

  const removeSubTopic = (index: number) => {
    const newSubTopics = subTopics.filter((_, i) => i !== index);
    onSubTopicsChange(id, newSubTopics);
  };

  const handleSubTopicClick = (index: number) => {
    setEditingSubTopicIndex(index);
    setSubTopicInput(subTopics[index]);
  };

  const handleSubTopicBlur = () => {
    if (editingSubTopicIndex !== null) {
      if (subTopicInput.trim()) {
        const newSubTopics = [...subTopics];
        newSubTopics[editingSubTopicIndex] = subTopicInput;
        onSubTopicsChange(id, newSubTopics);
      }
      setEditingSubTopicIndex(null);
      setSubTopicInput('');
    }
  };

  const handleSubTopicKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      subTopicInputRef.current?.blur();
    }
  };

  return (
    <div
      className={`py-6 ${showBottomBorder ? 'border-b border-gray-200' : ''}`}
    >
      <div className="mb-4">
        {isEditingTitle ? (
          <input
            ref={inputRef}
            type="text"
            value={currentTitle}
            onChange={e => setCurrentTitle(e.target.value)}
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

      {/* Секция подразделов */}
      <div className="mb-4 ml-6">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-lg font-semibold text-gray-700">Подразделы</h3>
          <button
            onClick={addSubTopic}
            className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded-md 
                       text-sm font-medium transition-colors duration-200 flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
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
            Добавить подраздел
          </button>
        </div>

        {subTopics.length > 0 && (
          <div className="space-y-2">
            {subTopics.map((subTopic, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-purple-50 p-2 rounded-md border border-purple-200"
              >
                <svg
                  className="w-4 h-4 text-purple-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>

                {editingSubTopicIndex === index ? (
                  <input
                    ref={subTopicInputRef}
                    type="text"
                    value={subTopicInput}
                    onChange={e => setSubTopicInput(e.target.value)}
                    onBlur={handleSubTopicBlur}
                    onKeyDown={handleSubTopicKeyDown}
                    className="flex-1 px-2 py-1 border-b-2 border-purple-500 focus:outline-none bg-white"
                  />
                ) : (
                  <span
                    onClick={() => handleSubTopicClick(index)}
                    className="flex-1 cursor-pointer hover:text-purple-700 transition-colors"
                  >
                    {subTopic}
                  </span>
                )}

                <button
                  onClick={() => removeSubTopic(index)}
                  className="p-1 hover:bg-red-100 rounded-full transition-colors"
                  aria-label="Удалить подраздел"
                >
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <FileUpload
        files={files}
        onFilesChange={newFiles => onFilesChange(id, newFiles)}
      />
    </div>
  );
};

export default Section;
