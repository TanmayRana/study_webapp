import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { MainTitle } from "@/lib/types/maintitle";
import * as mainTitleApi from "@/lib/api/maintitles";

// -------------------- Async Thunks --------------------

// Fetch all main titles
export const fetchMainTitlesThunk = createAsyncThunk<MainTitle[]>(
  "mainTitle/fetchMainTitles",
  async () => {
    const response = await mainTitleApi.getMainTitles();
    if (response.success && response.data) return response.data;
    throw new Error(response.error || "Failed to fetch main titles");
  }
);

// Fetch single main title by ID
export const fetchMainTitleThunk = createAsyncThunk<MainTitle, string>(
  "mainTitle/fetchMainTitle",
  async (id) => {
    const response = await mainTitleApi.getMainTitle(id);
    if (response.success && response.data) return response.data;
    throw new Error(response.error || "Failed to fetch main title");
  }
);

// Create new main title
export const createMainTitleThunk = createAsyncThunk<
  MainTitle,
  { title: string; contents?: string[] }
>("mainTitle/createMainTitle", async ({ title, contents }) => {
  const response = await mainTitleApi.createMainTitle(title, contents);
  if (response.success && response.data) return response.data;
  throw new Error(response.error || "Failed to create main title");
});

// Update existing main title
export const updateMainTitleThunk = createAsyncThunk<
  MainTitle,
  { id: string; title: string; contents?: string[] }
>("mainTitle/updateMainTitle", async ({ id, title, contents }) => {
  const response = await mainTitleApi.updateMainTitle(id, title, contents);
  if (response.success && response.data) return response.data;
  throw new Error(response.error || "Failed to update main title");
});

// Delete main title
export const deleteMainTitleThunk = createAsyncThunk<string, string>(
  "mainTitle/deleteMainTitle",
  async (id) => {
    const response = await mainTitleApi.deleteMainTitle(id);
    if (response.success) return id;
    throw new Error(response.error || "Failed to delete main title");
  }
);

// -------------------- State --------------------

interface MainTitleState {
  mainTitles: MainTitle[];
  loading: boolean;
  error: string | null;
  selectedMainTitle: MainTitle | null;
  editingId: string | null;
}

const initialState: MainTitleState = {
  mainTitles: [],
  loading: false,
  error: null,
  selectedMainTitle: null,
  editingId: null,
};

// -------------------- Slice --------------------

const mainTitleSlice = createSlice({
  name: "mainTitle",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setSelectedMainTitle: (state, action: PayloadAction<MainTitle | null>) => {
      state.selectedMainTitle = action.payload;
    },
    setEditingId: (state, action: PayloadAction<string | null>) => {
      state.editingId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // -------- Fetch all --------
    builder
      .addCase(fetchMainTitlesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainTitlesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.mainTitles = action.payload;
      })
      .addCase(fetchMainTitlesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch main titles";
      });

    // -------- Fetch single --------
    builder
      .addCase(fetchMainTitleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMainTitleThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMainTitle = action.payload;
      })
      .addCase(fetchMainTitleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch main title";
      });

    // -------- Create --------
    builder
      .addCase(createMainTitleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMainTitleThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.mainTitles.unshift(action.payload);
      })
      .addCase(createMainTitleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create main title";
      });

    // -------- Update --------
    builder
      .addCase(updateMainTitleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMainTitleThunk.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.mainTitles.findIndex(
          (mt) => mt._id === action.payload._id
        );
        if (idx !== -1) state.mainTitles[idx] = action.payload;
        if (state.selectedMainTitle?._id === action.payload._id) {
          state.selectedMainTitle = action.payload;
        }
        state.editingId = null;
      })
      .addCase(updateMainTitleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update main title";
      });

    // -------- Delete --------
    builder
      .addCase(deleteMainTitleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMainTitleThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.mainTitles = state.mainTitles.filter(
          (mt) => mt._id !== action.payload
        );
        if (state.selectedMainTitle?._id === action.payload) {
          state.selectedMainTitle = null;
        }
      })
      .addCase(deleteMainTitleThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete main title";
      });
  },
});

// -------------------- Exports --------------------
export const {
  setLoading,
  setError,
  clearError,
  setSelectedMainTitle,
  setEditingId,
} = mainTitleSlice.actions;

// Selectors
export const selectMainTitles = (state: { mainTitle: MainTitleState }) =>
  state.mainTitle.mainTitles;
export const selectMainTitleLoading = (state: { mainTitle: MainTitleState }) =>
  state.mainTitle.loading;
export const selectMainTitleError = (state: { mainTitle: MainTitleState }) =>
  state.mainTitle.error;
export const selectSelectedMainTitle = (state: { mainTitle: MainTitleState }) =>
  state.mainTitle.selectedMainTitle;
export const selectEditingId = (state: { mainTitle: MainTitleState }) =>
  state.mainTitle.editingId;

export default mainTitleSlice.reducer;
