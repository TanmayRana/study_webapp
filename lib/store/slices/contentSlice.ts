import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as contentApi from "@/lib/api/contents";
import { Content } from "@/lib/types/maintitle";

// ============================
// Async Thunks
// ============================
export const fetchContents = createAsyncThunk(
  "content/fetchContents",
  async (_, { rejectWithValue }) => {
    const res = await contentApi.getContents();
    if (!res.success) return rejectWithValue(res.error);
    return res.data || [];
  }
);

export const fetchContentById = createAsyncThunk(
  "content/fetchContentById",
  async (id: string, { rejectWithValue }) => {
    const res = await contentApi.getContentById(id);
    if (!res.success) return rejectWithValue(res.error);
    return res.data;
  }
);

export const createContent = createAsyncThunk(
  "content/createContent",
  async (payload: contentApi.CreateContentRequest, { rejectWithValue }) => {
    const res = await contentApi.createContent(payload);
    if (!res.success) return rejectWithValue(res.error);
    return res.data;
  }
);

export const updateContent = createAsyncThunk(
  "content/updateContent",
  async (
    { id, ...data }: { id: string } & contentApi.UpdateContentRequest,
    { rejectWithValue }
  ) => {
    const res = await contentApi.updateContent(id, data);
    if (!res.success) return rejectWithValue(res.error);
    return res.data;
  }
);

export const deleteContent = createAsyncThunk(
  "content/deleteContent",
  async (id: string, { rejectWithValue }) => {
    const res = await contentApi.deleteContent(id);
    if (!res.success) return rejectWithValue(res.error);
    return id;
  }
);

// ============================
// State
// ============================
interface ContentState {
  contents: Content[];
  selectedContent?: Content;
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  contents: [],
  selectedContent: undefined,
  loading: false,
  error: null,
};

// ============================
// Slice
// ============================
const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchContents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.loading = false;
        state.contents = action.payload;
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch by ID
      .addCase(fetchContentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedContent = action.payload;
      })
      .addCase(fetchContentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create
      .addCase(createContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContent.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) state.contents.unshift(action.payload);
      })
      .addCase(createContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update
      .addCase(updateContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContent.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.contents.findIndex(
          (c) => c._id === action.payload?._id
        );
        if (idx !== -1 && action.payload) state.contents[idx] = action.payload;

        // Update selectedContent if it matches
        if (
          state.selectedContent &&
          state.selectedContent._id === action.payload?._id
        ) {
          state.selectedContent = action.payload;
        }
      })
      .addCase(updateContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete
      .addCase(deleteContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContent.fulfilled, (state, action) => {
        state.loading = false;
        state.contents = state.contents.filter((c) => c._id !== action.payload);

        // Clear selectedContent if it was deleted
        if (state.selectedContent?._id === action.payload) {
          state.selectedContent = undefined;
        }
      })
      .addCase(deleteContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// ============================
// Selectors
// ============================
export const selectContents = (state: { content: ContentState }) =>
  state.content.contents;
export const selectSelectedContent = (state: { content: ContentState }) =>
  state.content.selectedContent;
export const selectContentLoading = (state: { content: ContentState }) =>
  state.content.loading;
export const selectContentError = (state: { content: ContentState }) =>
  state.content.error;

export default contentSlice.reducer;
