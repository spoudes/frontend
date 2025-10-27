/**
 * TypeScript type definitions
 */

export interface Section {
  id: string;
  name: string;
  files: UploadedFile[];
  expanded: boolean;
  createdAt: Date;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  sectionId: string;
  uploadedAt: Date;
  serverPath?: string;
}

export interface AgentStatus {
  name: string;
  status: 'waiting' | 'processing' | 'completed' | 'failed';
  icon: string;
  duration?: number;
  outputs?: string[];
}

export interface ProcessingStatus {
  jobId: string;
  status: 'idle' | 'processing' | 'completed' | 'failed';
  currentStage?: string;
  agents: Record<string, AgentStatus>;
  progress: number;
}

export interface MarkdownResult {
  content: string;
  filePath: string;
  wordCount: number;
  generatedAt: string;
}

export interface TestQuestion {
  question: string;
  type: 'multiple' | 'open' | 'true_false';
  options?: string[];
  correctAnswer?: number;
  userAnswer?: number | string;
  explanation?: string;
}

export interface TestResult {
  tests: {
    multiple_choice: TestQuestion[];
    open_ended: TestQuestion[];
    true_false: TestQuestion[];
  };
  filePath: string;
  totalQuestions: number;
}

export interface DiagramResult {
  diagrams: Record<string, string>;
  filePaths: string[];
  count: number;
}

export interface ProcessingResult {
  markdown?: MarkdownResult;
  tests?: TestResult;
  diagrams?: DiagramResult;
}

export interface AppState {
  sections: Section[];
  currentSection: string | null;
  uploadedFiles: UploadedFile[];
  processingStatus: ProcessingStatus;
  results: ProcessingResult;
  theme: 'light' | 'dark';
  activeTab: string;
  activeResultTab: string;
}