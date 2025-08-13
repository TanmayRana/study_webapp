export interface Content {
  _id: string;
  title: string;
  mainTitle?: string | null; // ObjectId reference to MainTitle
  content: string;
  createdAt: string; // ISO date string from API
  updatedAt: string;
}

export interface MainTitle {
  _id: string;
  title: string;
  contents: Content[]; // Populated contents
  createdAt: string;
  updatedAt: string;
}

// =======================
// API Request Types
// =======================
export interface CreateContentRequest {
  title: string;
  mainTitle?: string | null; // Optional MainTitle ID
  content: string;
}

export type UpdateContentRequest = Partial<CreateContentRequest>;

export interface CreateMainTitleRequest {
  title: string;
  contents?: string[]; // Array of Content IDs
}

export type UpdateMainTitleRequest = Partial<CreateMainTitleRequest>;

// =======================
// API Response Types
// =======================
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export type ContentApiResponse = ApiResponse<Content>;
export type ContentsApiResponse = ApiResponse<Content[]>;
export type MainTitleApiResponse = ApiResponse<MainTitle>;
export type MainTitlesApiResponse = ApiResponse<MainTitle[]>;
