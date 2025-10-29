import { useCourse } from '@/context/CourseContext';
import { useEffect, useState } from 'react';

export const CourseViewer = () => {
  const [liaScriptUrl, setLiaScriptUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const { courseResponse } = useCourse();
  useEffect(() => {
    try {
      // URL к вашему API endpoint
      const apiUrl = `${import.meta.env.VITE_API_URL}/mock-liascript/${courseResponse?.folder_id}`;

      // LiaScript загрузит markdown напрямую с этого URL
      const url = `https://liascript.github.io/course/?${apiUrl}`;

      setLiaScriptUrl(url);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <iframe
      src={liaScriptUrl}
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
      }}
      title="LiaScript Course"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
    />
  );
};
