// import {
//   MainTitle,
//   CreateMainTitleRequest,
//   UpdateMainTitleRequest,
//   MainTitleApiResponse,
//   MainTitlesApiResponse,
// } from "@/lib/types/maintitle";

// const API_BASE = "/api/maintitles";

// // Get all main titles
// export const getMainTitles = async (): Promise<MainTitlesApiResponse> => {
//   try {
//     const response = await fetch(API_BASE);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching main titles:", error);
//     return {
//       success: false,
//       error: "Failed to fetch main titles",
//     };
//   }
// };

// // Get single main title by ID
// export const getMainTitle = async (
//   id: string
// ): Promise<MainTitleApiResponse> => {
//   try {
//     const response = await fetch(`${API_BASE}/${id}`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching main title:", error);
//     return {
//       success: false,
//       error: "Failed to fetch main title",
//     };
//   }
// };

// // Create new main title
// export const createMainTitle = async (
//   title: string,
//   contents?: string[]
// ): Promise<MainTitleApiResponse> => {
//   try {
//     const response = await fetch(API_BASE, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ title, contents }),
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error creating main title:", error);
//     return {
//       success: false,
//       error: "Failed to create main title",
//     };
//   }
// };

// // Update main title by ID
// export const updateMainTitle = async (
//   id: string,
//   title: string,
//   contents?: string[]
// ): Promise<MainTitleApiResponse> => {
//   try {
//     const response = await fetch(`${API_BASE}/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ title, contents }),
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error updating main title:", error);
//     return {
//       success: false,
//       error: "Failed to update main title",
//     };
//   }
// };

// // Delete main title by ID
// export const deleteMainTitle = async (
//   id: string
// ): Promise<{ success: boolean; message?: string; error?: string }> => {
//   try {
//     const response = await fetch(`${API_BASE}/${id}`, {
//       method: "DELETE",
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error deleting main title:", error);
//     return {
//       success: false,
//       error: "Failed to delete main title",
//     };
//   }
// };

import {
  MainTitle,
  MainTitleApiResponse,
  MainTitlesApiResponse,
} from "@/lib/types/maintitle";

const API_BASE = "/api/maintitles";

// Get all main titles
export const getMainTitles = async (): Promise<MainTitlesApiResponse> => {
  try {
    const response = await fetch(API_BASE);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching main titles:", error);
    return { success: false, error: "Failed to fetch main titles" };
  }
};

// Get single main title by ID
export const getMainTitle = async (
  id: string
): Promise<MainTitleApiResponse> => {
  try {
    console.log("id in getMainTitle", id);

    const response = await fetch(`${API_BASE}/${id}`);
    const data = await response.json();
    console.log("data", data);

    return data;
  } catch (error) {
    console.error("Error fetching main title:", error);
    return { success: false, error: "Failed to fetch main title" };
  }
};

// Create main title
export const createMainTitle = async (
  title: string,
  contents?: string[]
): Promise<MainTitleApiResponse> => {
  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, contents }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating main title:", error);
    return { success: false, error: "Failed to create main title" };
  }
};

// Update main title
export const updateMainTitle = async (
  id: string,
  title: string,
  contents?: string[]
): Promise<MainTitleApiResponse> => {
  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, contents }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating main title:", error);
    return { success: false, error: "Failed to update main title" };
  }
};

// Delete main title
export const deleteMainTitle = async (
  id: string
): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    const response = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting main title:", error);
    return { success: false, error: "Failed to delete main title" };
  }
};
