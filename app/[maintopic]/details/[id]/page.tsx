"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchContentById,
  selectContentLoading,
  selectSelectedContent,
} from "@/lib/store/slices/contentSlice";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { CopyBlock, dracula } from "react-code-blocks";

const DetailsPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const selectedContent = useAppSelector(selectSelectedContent);
  const loading = useAppSelector(selectContentLoading);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchContentById(params.id as string));
    }
  }, [params.id, dispatch]);

  // Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  // Not Found State
  if (!selectedContent) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Content not found.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 space-y-8">
      {/* Back Button */}
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors shadow border"
      >
        <ArrowLeft className="h-4 w-4" />
        Previous Page
      </Button>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {selectedContent.title}
      </h1>

      {/* Card with Code */}
      <Card className="p-4 md:p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition hover:shadow-xl">
        {selectedContent.content ? (
          <div className="overflow-x-auto rounded-lg">
            <CopyBlock
              text={selectedContent.content}
              language="javascript"
              //   showLineNumbers={true}
              theme={dracula}
              codeBlock
              customStyle={{
                fontSize: "14px",
                borderRadius: "8px",
                backgroundColor: "transparent", // match card background
              }}
            />
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-6">
            No content available.
          </p>
        )}
      </Card>
    </div>
  );
};

export default DetailsPage;
