import { configureStore } from '@reduxjs/toolkit';
import mainTitleReducer from './slices/mainTitleSlice';
import contentReducer from './slices/contentSlice';

export const store = configureStore({
  reducer: {
    mainTitle: mainTitleReducer,
    content: contentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['mainTitle/setLoading', 'mainTitle/setError', 'content/setLoading', 'content/setError'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
