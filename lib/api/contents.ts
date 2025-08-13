// // import {
// //   Content,
// //   ContentApiResponse,
// //   ContentsApiResponse,
// //   CreateContentRequest,
// //   UpdateContentRequest,
// // } from "@/lib/types/maintitle";

// // const API_BASE = "/api/contents";

// // export const getContents = async (): Promise<ContentsApiResponse> => {
// //   try {
// //     const response = await fetch(API_BASE);
// //     const data = await response.json();
// //     return data;
// //   } catch (error) {
// //     console.error("Error fetching contents:", error);
// //     return {
// //       success: false,
// //       error: "Failed to fetch contents",
// //       data: [],
// //     };
// //   }
// // };

// // export const getContent = async (id: string): Promise<ContentApiResponse> => {
// //   try {
// //     const response = await fetch(`${API_BASE}/${id}`);
// //     const data = await response.json();
// //     return data;
// //   } catch (error) {
// //     console.error("Error fetching content:", error);
// //     return {
// //       success: false,
// //       error: "Failed to fetch content",
// //       data: undefined,
// //     };
// //   }
// // };

// // export const createContent = async (
// //   title: string,
// //   content: string,
// //   mainTitle?: string
// // ): Promise<ContentApiResponse> => {
// //   try {
// //     const response = await fetch(API_BASE, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ title, content, mainTitle }),
// //     });
// //     const data = await response.json();
// //     return data;
// //   } catch (error) {
// //     console.error("Error creating content:", error);
// //     return {
// //       success: false,
// //       error: "Failed to create content",
// //       data: undefined,
// //     };
// //   }
// // };

// // export const updateContent = async (
// //   id: string,
// //   title: string,
// //   content: string,
// //   mainTitle?: string
// // ): Promise<ContentApiResponse> => {
// //   try {
// //     const response = await fetch(`${API_BASE}/${id}`, {
// //       method: "PUT",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ title, content, mainTitle }),
// //     });
// //     const data = await response.json();
// //     return data;
// //   } catch (error) {
// //     console.error("Error updating content:", error);
// //     return {
// //       success: false,
// //       error: "Failed to update content",
// //       data: undefined,
// //     };
// //   }
// // };

// // export const deleteContent = async (
// //   id: string
// // ): Promise<{ success: boolean; message?: string; error?: string }> => {
// //   try {
// //     const response = await fetch(`${API_BASE}/${id}`, {
// //       method: "DELETE",
// //     });
// //     const data = await response.json();
// //     return data;
// //   } catch (error) {
// //     console.error("Error deleting content:", error);
// //     return {
// //       success: false,
// //       error: "Failed to delete content",
// //     };
// //   }
// // };

// import {
//   ContentApiResponse,
//   ContentsApiResponse,
//   CreateContentRequest,
//   UpdateContentRequest,
// } from "@/lib/types/maintitle";

// const API_BASE = "/api/contents";

// const handleResponse = async <T>(res: Response): Promise<T> => {
//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(text || `HTTP ${res.status}`);
//   }
//   return res.json();
// };

// export const getContents = async (): Promise<ContentsApiResponse> => {
//   try {
//     const res = await fetch(API_BASE);
//     return await handleResponse<ContentsApiResponse>(res);
//   } catch (error) {
//     console.error("Error fetching contents:", error);
//     return { success: false, error: String(error), data: [] };
//   }
// };

// export const getContent = async (id: string): Promise<ContentApiResponse> => {
//   try {
//     const res = await fetch(`${API_BASE}/${id}`);
//     return await handleResponse<ContentApiResponse>(res);
//   } catch (error) {
//     console.error("Error fetching content:", error);
//     return { success: false, error: String(error), data: undefined };
//   }
// };

// export const createContent = async (
//   payload: CreateContentRequest
// ): Promise<ContentApiResponse> => {
//   try {
//     const res = await fetch(API_BASE, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     return await handleResponse<ContentApiResponse>(res);
//   } catch (error) {
//     console.error("Error creating content:", error);
//     return { success: false, error: String(error), data: undefined };
//   }
// };

// export const updateContent = async (
//   id: string,
//   payload: UpdateContentRequest
// ): Promise<ContentApiResponse> => {
//   try {
//     const res = await fetch(`${API_BASE}/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     return await handleResponse<ContentApiResponse>(res);
//   } catch (error) {
//     console.error("Error updating content:", error);
//     return { success: false, error: String(error), data: undefined };
//   }
// };

// export const deleteContent = async (
//   id: string
// ): Promise<{ success: boolean; message?: string; error?: string }> => {
//   try {
//     const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
//     return await handleResponse(res);
//   } catch (error) {
//     console.error("Error deleting content:", error);
//     return { success: false, error: String(error) };
//   }
// };

// import { Content } from "@/lib/types/maintitle";

// export interface ApiResponse<T> {
//   success: boolean;
//   data?: T;
//   error?: string;
// }

// export interface CreateContentRequest {
//   title: string;
//   content: string;
//   mainTitle?: string;
// }

// export interface UpdateContentRequest {
//   title: string;
//   content: string;
//   mainTitle?: string;
// }

// // Fetch all contents
// export async function getContents(): Promise<ApiResponse<Content[]>> {
//   const res = await fetch("/api/contents");
//   return res.json();
// }

// // Create content
// export async function createContent(
//   data: CreateContentRequest
// ): Promise<ApiResponse<Content>> {
//   const res = await fetch("/api/contents", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" },
//   });
//   return res.json();
// }

// // Update content
// export async function updateContent(
//   id: string,
//   data: UpdateContentRequest
// ): Promise<ApiResponse<Content>> {
//   const res = await fetch(`/api/contents/${id}`, {
//     method: "PUT",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" },
//   });
//   return res.json();
// }

// // Delete content
// export async function deleteContent(id: string): Promise<ApiResponse<null>> {
//   const res = await fetch(`/api/contents/${id}`, { method: "DELETE" });
//   return res.json();
// }

import { Content } from "@/lib/types/maintitle";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface CreateContentRequest {
  title: string;
  content: string;
  mainTitle?: string;
}

export interface UpdateContentRequest {
  title: string;
  content: string;
  mainTitle?: string;
}

// Fetch all contents
export async function getContents(): Promise<ApiResponse<Content[]>> {
  const res = await fetch("/api/contents");
  return res.json();
}

// Fetch single content by ID
export async function getContentById(
  id: string
): Promise<ApiResponse<Content>> {
  const res = await fetch(`/api/contents/${id}`);
  return res.json();
}

// Create content
export async function createContent(
  data: CreateContentRequest
): Promise<ApiResponse<Content>> {
  const res = await fetch("/api/contents", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

// Update content
export async function updateContent(
  id: string,
  data: UpdateContentRequest
): Promise<ApiResponse<Content>> {
  const res = await fetch(`/api/contents/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

// Delete content
export async function deleteContent(id: string): Promise<ApiResponse<null>> {
  const res = await fetch(`/api/contents/${id}`, { method: "DELETE" });
  return res.json();
}
