"use client";

import { Card } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchContentById,
  selectContentLoading,
  selectSelectedContent,
} from "@/lib/store/slices/contentSlice";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { CopyBlock, dracula } from "react-code-blocks";

const DetailsPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const selectedContent = useAppSelector(selectSelectedContent);
  const loading = useAppSelector(selectContentLoading);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchContentById(params.id as string));
    }
  }, [params.id, dispatch]);

  if (loading) {
    return (
      <p className="text-center text-muted-foreground text-lg py-8 animate-pulse">
        Loading...
      </p>
    );
  }

  if (!selectedContent) {
    return (
      <p className="text-center text-muted-foreground text-lg py-8">
        Content not found.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 space-y-6">
      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
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
