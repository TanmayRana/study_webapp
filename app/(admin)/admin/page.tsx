"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import {
  fetchMainTitlesThunk,
  selectMainTitleLoading,
  selectMainTitles,
} from "@/lib/store/slices/mainTitleSlice";
import { useEffect } from "react";

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const mainTitles = useAppSelector(selectMainTitles);
  const loading = useAppSelector(selectMainTitleLoading);

  console.log("mainTitles", mainTitles);

  useEffect(() => {
    dispatch(fetchMainTitlesThunk());
  }, [dispatch]);
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {loading ? (
        <p className="text-center text-muted-foreground py-8">
          Loading main titles...
        </p>
      ) : mainTitles.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          No titles found. Add new main titles to get started.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mainTitles.map((mainTitle) => (
            // <Link key={mainTitle._id} href={`/${mainTitle._id}`}>
            <Card
              className="hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ease-in-out rounded-xl border border-gray-200"
              key={mainTitle._id}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {mainTitle.title}
                </CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Manage main title categories and their associated content
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Total Contents:{" "}
                  <span className="font-semibold">
                    {mainTitle.contents?.length || 0}
                  </span>
                </p>
              </CardContent>
            </Card>
            // </Link>
          ))}
        </div>
      )}
    </div>
  );
}
