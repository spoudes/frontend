import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CourseResponse {
  folder_id?: string;
  status?: string;
  message?: string;
  chapters_count?: number;
}

interface CourseContextType {
  courseResponse: CourseResponse | null;
  setCourseResponse: (response: CourseResponse) => void;
  clearCourseResponse: () => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [courseResponse, setCourseResponse] = useState<CourseResponse | null>(
    null
  );

  const clearCourseResponse = () => {
    setCourseResponse(null);
  };

  return (
    <CourseContext.Provider
      value={{
        courseResponse,
        setCourseResponse,
        clearCourseResponse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse должен использоваться внутри CourseProvider');
  }
  return context;
};
