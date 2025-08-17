// "use client";

// import Link from "next/link";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ArrowRight, FolderOpen } from "lucide-react";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import {
//   selectMainTitles,
//   selectMainTitleLoading,
//   fetchMainTitlesThunk,
// } from "@/lib/store/slices/mainTitleSlice";
// import { useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { ModeToggle } from "./_components/ModeToggle";

// export default function Home() {
//   const dispatch = useAppDispatch();
//   const mainTitles = useAppSelector(selectMainTitles);
//   const loading = useAppSelector(selectMainTitleLoading);
//   const route = useRouter();

//   useEffect(() => {
//     dispatch(fetchMainTitlesThunk());
//   }, [dispatch]);

//   return (
//     <div className="container mx-auto py-6 px-4">
//       {/* Top Action Bar */}
//       <div className="flex items-center justify-between mb-8 flex-col sm:flex-row gap-4">
//         <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
//           Main Titles Dashboard
//         </h1>
//         <Button
//           onClick={() => route.push("/admin")}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all cursor-pointer"
//         >
//           Admin Panel
//           <ArrowRight className="w-4 h-4" />
//         </Button>

//         <ModeToggle />
//       </div>

//       {/* Content Display */}
//       {loading ? (
//         <p className="text-center text-gray-500 py-8 animate-pulse">
//           Loading main titles...
//         </p>
//       ) : mainTitles.length === 0 ? (
//         <p className="text-center text-gray-500 py-8">
//           No titles found. Add new main titles to get started.
//         </p>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {mainTitles.map((mainTitle) => (
//             <Link key={mainTitle._id} href={`/${mainTitle._id}`}>
//               <Card className="group hover:shadow-xl hover:scale-[1.02] transition-transform duration-300 ease-in-out rounded-xl border border-gray-200 bg-white dark:bg-gray-900">
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100">
//                     {mainTitle.title}
//                   </CardTitle>
//                   <FolderOpen className="h-5 w-5 text-gray-500 group-hover:text-blue-500 transition-colors" />
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-xs text-gray-500">
//                     Manage categories & associated content
//                   </p>
//                   <p className="text-xs text-gray-500 mt-2">
//                     Total Contents:{" "}
//                     <span className="font-semibold text-gray-800 dark:text-gray-200">
//                       {mainTitle.contents?.length || 0}
//                     </span>
//                   </p>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, FolderOpen, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectMainTitles,
  selectMainTitleLoading,
  fetchMainTitlesThunk,
} from "@/lib/store/slices/mainTitleSlice";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./_components/ModeToggle";

export default function Home() {
  const dispatch = useAppDispatch();
  const mainTitles = useAppSelector(selectMainTitles);
  const loading = useAppSelector(selectMainTitleLoading);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchMainTitlesThunk());
  }, [dispatch]);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between mb-10 flex-col sm:flex-row gap-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          📚 Main Titles Dashboard
        </h1>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => router.push("/admin")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all"
          >
            Admin Panel
            <ArrowRight className="w-4 h-4" />
          </Button>

          <ModeToggle />
        </div>
      </div>

      {/* Content Display */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
        </div>
      ) : mainTitles.length === 0 ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            No titles found. Add new main titles to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mainTitles.map((mainTitle) => (
            <Link key={mainTitle._id} href={`/${mainTitle._id}`}>
              <Card className="group h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ease-out rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle
                    title={mainTitle.title}
                    className="text-base font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 transition-colors truncate"
                  >
                    {mainTitle.title}
                  </CardTitle>
                  <FolderOpen className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage categories & associated content
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
                    Total Contents:{" "}
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {mainTitle.contents?.length || 0}
                    </span>
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
