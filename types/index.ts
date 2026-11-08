export type FileFormatType = 'PDF' | 'JPG' | 'PNG' | 'JPEG' | 'WEBP';

export interface AcademicFileDTO {
  id: string;
  subjectId: string;
  chapterId: string;
  topicId: string;
  studyNoteId: string | null;
  fileName: string;
  fileType: FileFormatType;
  mimeType: string;
  driveFileId: string;
  driveShareUrl: string;
  driveFolderPath: string;
  fileSize: number;
  createdAt: string;
}

export interface StudyNoteDTO {
  id: string;
  subjectId: string;
  chapterId: string;
  topicId: string;
  title: string;
  summary: string;
  author: string | null;
  files: AcademicFileDTO[];
  createdAt: string;
}

export interface YouTubeClassDTO {
  id: string;
  subjectId: string;
  chapterId: string;
  topicId: string | null;
  lectureNumber: number;
  title: string;
  shortDescription: string;
  youtubeUrl: string;
  youtubeVideoId: string;
  thumbnailUrl: string;
  duration: string;
  instructorName: string | null;
  isPopular: boolean;
  createdAt: string;
}

export interface TopicDTO {
  id: string;
  subjectId: string;
  chapterId: string;
  topicNumber: number;
  title: string;
  slug: string;
  description: string;
  additionalResources: string | null;
  youtubeClasses: YouTubeClassDTO[];
  studyNotes: StudyNoteDTO[];
  files: AcademicFileDTO[];
}

export interface ChapterSummaryDTO {
  id: string;
  subjectId: string;
  chapterNumber: number;
  title: string;
  slug: string;
  description: string;
  topicsCount: number;
  youtubeClassesCount: number;
  notesCount: number;
}

export interface SubjectCardDTO {
  id: string;
  code: string | null;
  name: string;
  slug: string;
  department: string;
  description: string;
  iconName: string;
  isSampleData: boolean;
  categoryName: string | null;
  chaptersCount: number;
  youtubeClassesCount: number;
  notesCount: number;
  createdAt: string;
}

export type GlobalSearchResourceType =
  | 'SUBJECT'
  | 'CHAPTER'
  | 'TOPIC'
  | 'YOUTUBE'
  | 'PDF'
  | 'IMAGE';

export interface SearchResultItem {
  id: string;
  type: GlobalSearchResourceType;
  title: string;
  subtitle: string;
  subjectName: string;
  chapterTitle?: string;
  topicTitle?: string;
  href: string;
  externalUrl?: string;
  fileType?: FileFormatType;
  fileSize?: number;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AIChatResourceLink {
  id: string;
  type: GlobalSearchResourceType;
  title: string;
  contextLabel: string;
  href: string;
  externalUrl?: string;
}

export interface AIChatResponsePayload {
  answer: string;
  detectedLanguage: 'en' | 'bn' | 'mixed';
  interpretedIntent: {
    subjectQuery?: string;
    chapterNumber?: number;
    topicQuery?: string;
    resourceFilter: 'ALL' | 'VIDEO' | 'NOTES' | 'INFO';
  };
  resources: AIChatResourceLink[];
  suggestions: string[];
}
