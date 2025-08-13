import { useState, useEffect, useCallback } from "react";
import { MainTitle } from "@/lib/types/maintitle";
import * as mainTitleApi from "@/lib/api/maintitles";

interface UseMainTitlesReturn {
  mainTitles: MainTitle[];
  loading: boolean;
  error: string | null;
  createMainTitle: (title: string) => Promise<boolean>;
  updateMainTitle: (id: string, title: string) => Promise<boolean>;
  deleteMainTitle: (id: string) => Promise<boolean>;
  refreshMainTitles: () => Promise<void>;
}

export const useMainTitles = (): UseMainTitlesReturn => {
  const [mainTitles, setMainTitles] = useState<MainTitle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMainTitles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await mainTitleApi.getMainTitles();
      
      if (response.success && response.data) {
        setMainTitles(response.data);
      } else {
        setError(response.error || "Failed to fetch main titles");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const createMainTitle = useCallback(async (title: string): Promise<boolean> => {
    try {
      setError(null);
      const response = await mainTitleApi.createMainTitle(title);
      
      if (response.success && response.data) {
        setMainTitles(prev => [response.data!, ...prev]);
        return true;
      } else {
        setError(response.error || "Failed to create main title");
        return false;
      }
    } catch (err) {
      setError("An unexpected error occurred");
      return false;
    }
  }, []);

  const updateMainTitle = useCallback(async (id: string, title: string): Promise<boolean> => {
    try {
      setError(null);
      const response = await mainTitleApi.updateMainTitle(id, title);
      
      if (response.success && response.data) {
        setMainTitles(prev => 
          prev.map(item => 
            item._id === id ? response.data! : item
          )
        );
        return true;
      } else {
        setError(response.error || "Failed to update main title");
        return false;
      }
    } catch (err) {
      setError("An unexpected error occurred");
      return false;
    }
  }, []);

  const deleteMainTitle = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);
      const response = await mainTitleApi.deleteMainTitle(id);
      
      if (response.success) {
        setMainTitles(prev => prev.filter(item => item._id !== id));
        return true;
      } else {
        setError(response.error || "Failed to delete main title");
        return false;
      }
    } catch (err) {
      setError("An unexpected error occurred");
      return false;
    }
  }, []);

  const refreshMainTitles = useCallback(async () => {
    await fetchMainTitles();
  }, [fetchMainTitles]);

  useEffect(() => {
    fetchMainTitles();
  }, [fetchMainTitles]);

  return {
    mainTitles,
    loading,
    error,
    createMainTitle,
    updateMainTitle,
    deleteMainTitle,
    refreshMainTitles,
  };
};
