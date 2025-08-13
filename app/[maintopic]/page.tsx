"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useEffect } from "react";
import {
  fetchMainTitleThunk,
  selectSelectedMainTitle,
  selectMainTitleLoading,
} from "@/lib/store/slices/mainTitleSlice";

const InsidePage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const selectedMainTitle = useAppSelector(selectSelectedMainTitle);
  const loading = useAppSelector(selectMainTitleLoading);

  useEffect(() => {
    if (params?.maintopic) {
      dispatch(fetchMainTitleThunk(params.maintopic as string));
    }
  }, [dispatch, params?.maintopic]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-lg text-gray-500 animate-pulse">Loading topics...</p>
      </div>
    );
  }

  // No data state
  if (!selectedMainTitle || selectedMainTitle.contents?.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-lg text-gray-500">
          No topics found for this category.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 text-gray-800 dark:text-gray-100">
        {selectedMainTitle.title}
      </h1>

      {/* Topics Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {selectedMainTitle.contents?.map((item, idx) => (
          <Link
            key={idx}
            href={`/${params?.maintopic}/details/${item._id}`}
            className="block group"
          >
            <Card className="hover:shadow-xl group-hover:scale-[1.02] transition-all duration-300 ease-in-out rounded-xl border border-gray-200 bg-white dark:bg-gray-900">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                {/* Title with truncation and tooltip */}
                <CardTitle
                  title={item.title}
                  className="text-base font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 transition-colors truncate max-w-[85%]"
                >
                  {item.title}
                </CardTitle>
                <FolderOpen className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  Click to explore more about this topic.
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InsidePage;
