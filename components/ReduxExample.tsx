/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { fetchMainTitles, selectMainTitles, selectMainTitleLoading } from "@/lib/store/slices/mainTitleSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, FileText, FolderOpen } from "lucide-react";
import {
  fetchMainTitlesThunk,
  selectMainTitleLoading,
  selectMainTitles,
} from "@/lib/store/slices/mainTitleSlice";

export default function ReduxExample() {
  const dispatch = useAppDispatch();
  const mainTitles = useAppSelector(selectMainTitles);
  const loading = useAppSelector(selectMainTitleLoading);

  const handleRefresh = () => {
    dispatch(fetchMainTitlesThunk());
  };

  // Helper function to safely get content count
  const getContentCount = (mainTitle: any) => {
    if (!mainTitle.contents) return 0;
    if (Array.isArray(mainTitle.contents)) {
      return mainTitle.contents.length;
    }
    return 0;
  };

  const totalContents = mainTitles.reduce((total, title) => {
    return total + getContentCount(title);
  }, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Redux State Example
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total titles:{" "}
              <span className="font-semibold">{mainTitles.length}</span>
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total contents:{" "}
              <span className="font-semibold">{totalContents}</span>
            </p>
            <FolderOpen className="h-4 w-4 text-blue-500" />
          </div>

          {mainTitles.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Recent titles:</p>
              <div className="space-y-1">
                {mainTitles.slice(0, 3).map((title) => (
                  <div
                    key={title._id}
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    • {title.title}
                    <span className="text-xs text-blue-500 ml-2">
                      ({getContentCount(title)} contents)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500 dark:text-gray-500">
            This component demonstrates how to access Redux state from anywhere
            in your app. The state is automatically synchronized with the
            MainTitleManager component. Now showing content counts for each
            title with safe content handling.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
