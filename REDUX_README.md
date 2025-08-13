# Redux Integration with Redux Toolkit

This project now uses **React Redux** and **Redux Toolkit** for state management, replacing the custom hooks approach with a more robust and scalable solution.

## 🚀 What's New

- **Redux Toolkit**: Modern Redux with simplified syntax and built-in best practices
- **React Redux**: Official React bindings for Redux
- **Async Thunks**: Built-in support for async operations (API calls)
- **TypeScript Support**: Full type safety throughout the Redux store
- **DevTools Integration**: Better debugging and development experience

## 📁 File Structure

```
lib/store/
├── index.ts              # Main store configuration
├── hooks.ts              # Typed Redux hooks
├── providers.tsx         # Redux Provider wrapper
└── slices/
    └── mainTitleSlice.ts # MainTitle state management
```

## 🔧 Store Configuration

### Main Store (`lib/store/index.ts`)

```typescript
import { configureStore } from "@reduxjs/toolkit";
import mainTitleReducer from "./slices/mainTitleSlice";

export const store = configureStore({
  reducer: {
    mainTitle: mainTitleReducer,
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["mainTitle/setLoading", "mainTitle/setError"],
      },
    }),
});
```

### Typed Hooks (`lib/store/hooks.ts`)

```typescript
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./index";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## 🎯 MainTitle Slice

### State Structure

```typescript
interface MainTitleState {
  mainTitles: MainTitle[];
  loading: boolean;
  error: string | null;
  selectedMainTitle: MainTitle | null;
  editingId: string | null;
}
```

### Async Thunks

- `fetchMainTitles()` - Get all main titles
- `createMainTitle(title)` - Create new main title
- `updateMainTitle({id, title})` - Update existing main title
- `deleteMainTitle(id)` - Delete main title

### Actions

- `setLoading(boolean)` - Set loading state
- `setError(string | null)` - Set error message
- `clearError()` - Clear error message
- `setEditingId(string | null)` - Set editing state
- `clearMainTitles()` - Clear all titles

### Selectors

- `selectMainTitles` - Get all main titles
- `selectMainTitleLoading` - Get loading state
- `selectMainTitleError` - Get error message
- `selectSelectedMainTitle` - Get selected main title
- `selectEditingId` - Get current editing ID

## 🎨 Usage Examples

### Basic Component Usage

```typescript
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchMainTitles,
  selectMainTitles,
} from "@/lib/store/slices/mainTitleSlice";

function MyComponent() {
  const dispatch = useAppDispatch();
  const mainTitles = useAppSelector(selectMainTitles);

  useEffect(() => {
    dispatch(fetchMainTitles());
  }, [dispatch]);

  return (
    <div>
      {mainTitles.map((title) => (
        <div key={title._id}>{title.title}</div>
      ))}
    </div>
  );
}
```

### Creating a New Title

```typescript
import { createMainTitle } from "@/lib/store/slices/mainTitleSlice";

const handleCreate = async (title: string) => {
  try {
    await dispatch(createMainTitle(title)).unwrap();
    // Success - state is automatically updated
  } catch (error) {
    // Error is handled by Redux slice
    console.error("Failed to create:", error);
  }
};
```

### Updating a Title

```typescript
import { updateMainTitle } from "@/lib/store/slices/mainTitleSlice";

const handleUpdate = async (id: string, title: string) => {
  try {
    await dispatch(updateMainTitle({ id, title })).unwrap();
    // Success - state is automatically updated
  } catch (error) {
    // Error is handled by Redux slice
    console.error("Failed to update:", error);
  }
};
```

## 🔄 State Flow

1. **Component dispatches action** → `dispatch(createMainTitle("New Title"))`
2. **Redux Toolkit handles async operation** → API call to backend
3. **State automatically updates** → Loading → Success/Error
4. **Component re-renders** → New state is displayed
5. **All components using the same state are updated** → Automatic synchronization

## 🎭 Provider Setup

### Root Layout (`app/layout.tsx`)

```typescript
import { Providers } from "@/lib/store/providers";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
```

### Providers Component (`lib/store/providers.tsx`)

```typescript
"use client";
import { Provider } from "react-redux";
import { store } from "./index";

export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
```

## 🚀 Benefits of This Approach

### ✅ **Centralized State Management**

- Single source of truth for all MainTitle data
- Consistent state across all components
- Easy to debug and track state changes

### ✅ **Automatic Synchronization**

- Multiple components can use the same data
- Updates in one component automatically reflect in others
- No need to manually sync state between components

### ✅ **Built-in Async Handling**

- Loading states automatically managed
- Error handling built-in
- Optimistic updates for better UX

### ✅ **TypeScript Support**

- Full type safety for state, actions, and selectors
- IntelliSense and autocomplete
- Compile-time error checking

### ✅ **Developer Experience**

- Redux DevTools integration
- Action logging and time-travel debugging
- Performance monitoring

## 🔧 Adding New Slices

To add a new feature (e.g., User management):

1. **Create new slice** (`lib/store/slices/userSlice.ts`)
2. **Add to store** (`lib/store/index.ts`)
3. **Export actions and selectors**
4. **Use in components** with `useAppDispatch` and `useAppSelector`

### Example: User Slice

```typescript
// lib/store/slices/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { users: [], loading: false },
  reducers: {
    /* ... */
  },
  extraReducers: (builder) => {
    /* ... */
  },
});

// lib/store/index.ts
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    mainTitle: mainTitleReducer,
    user: userReducer, // Add new reducer
  },
});
```

## 🧪 Testing

### Testing Redux Components

```typescript
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import MyComponent from "./MyComponent";

test("renders with Redux state", () => {
  render(
    <Provider store={store}>
      <MyComponent />
    </Provider>
  );

  // Test your component
});
```

### Testing Redux Slices

```typescript
import mainTitleReducer, {
  fetchMainTitles,
  createMainTitle,
} from "./mainTitleSlice";

test("should handle initial state", () => {
  expect(mainTitleReducer(undefined, { type: "unknown" })).toEqual({
    mainTitles: [],
    loading: false,
    error: null,
    selectedMainTitle: null,
    editingId: null,
  });
});
```

## 🎯 Migration from Custom Hooks

### Before (Custom Hook)

```typescript
const { mainTitles, loading, createMainTitle } = useMainTitles();
await createMainTitle("New Title");
```

### After (Redux)

```typescript
const dispatch = useAppDispatch();
const mainTitles = useAppSelector(selectMainTitles);
const loading = useAppSelector(selectMainTitleLoading);

await dispatch(createMainTitle("New Title")).unwrap();
```

## 🚀 Performance Optimizations

- **Selective Re-renders**: Components only re-render when their specific state changes
- **Memoized Selectors**: Use `createSelector` for complex state computations
- **Batch Updates**: Multiple state changes are batched for better performance

## 🔍 Debugging

### Redux DevTools

1. Install Redux DevTools browser extension
2. Open DevTools → Redux tab
3. Monitor actions, state changes, and performance
4. Time-travel debugging available

### Console Logging

```typescript
// Add to your slice for debugging
.addCase(fetchMainTitles.fulfilled, (state, action) => {
  console.log('Main titles fetched:', action.payload);
  state.mainTitles = action.payload;
  state.loading = false;
})
```

## 📚 Additional Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Redux Documentation](https://react-redux.js.org/)
- [Redux Style Guide](https://redux.js.org/style-guide/)
- [Redux Toolkit Quick Start](https://redux-toolkit.js.org/introduction/quick-start)

## 🎉 Summary

Your project now has a robust, scalable state management solution with:

- ✅ **Redux Toolkit** for simplified Redux development
- ✅ **React Redux** for React integration
- ✅ **Async Thunks** for API operations
- ✅ **TypeScript** support throughout
- ✅ **Automatic state synchronization**
- ✅ **Built-in loading and error states**
- ✅ **Developer-friendly debugging tools**

The MainTitle CRUD functionality is now powered by Redux, making it easy to extend and maintain as your application grows!
