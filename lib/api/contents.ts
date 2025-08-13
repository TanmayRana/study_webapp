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
