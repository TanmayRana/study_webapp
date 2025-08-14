// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ArrowLeft, FolderOpen } from "lucide-react";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

// import {
//   fetchMainTitlesThunk,
//   selectMainTitleLoading,
//   selectMainTitles,
// } from "@/lib/store/slices/mainTitleSlice";
// import { useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// export default function AdminDashboard() {
//   const dispatch = useAppDispatch();
//   const mainTitles = useAppSelector(selectMainTitles);
//   const loading = useAppSelector(selectMainTitleLoading);
//   const route = useRouter();

//   // console.log("mainTitles", mainTitles);

//   useEffect(() => {
//     dispatch(fetchMainTitlesThunk());
//   }, [dispatch]);
//   return (
//     <div className="container mx-auto py-6 px-4">
//       <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
//       <Button onClick={() => route.push("/")}>
//         <ArrowLeft />
//         User Management
//       </Button>

//       {loading ? (
//         <p className="text-center text-muted-foreground py-8">
//           Loading main titles...
//         </p>
//       ) : mainTitles.length === 0 ? (
//         <p className="text-center text-muted-foreground py-8">
//           No titles found. Add new main titles to get started.
//         </p>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {mainTitles.map((mainTitle) => (
//             // <Link key={mainTitle._id} href={`/${mainTitle._id}`}>
//             <Card
//               className="hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ease-in-out rounded-xl border border-gray-200"
//               key={mainTitle._id}
//             >
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">
//                   {mainTitle.title}
//                 </CardTitle>
//                 <FolderOpen className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <p className="text-xs text-muted-foreground">
//                   Manage main title categories and their associated content
//                 </p>
//                 <p className="text-xs text-muted-foreground mt-1">
//                   Total Contents:{" "}
//                   <span className="font-semibold">
//                     {mainTitle.contents?.length || 0}
//                   </span>
//                 </p>
//               </CardContent>
//             </Card>
//             // </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FolderOpen } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchMainTitlesThunk,
  selectMainTitleLoading,
  selectMainTitles,
} from "@/lib/store/slices/mainTitleSlice";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const mainTitles = useAppSelector(selectMainTitles);
  const loading = useAppSelector(selectMainTitleLoading);
  const route = useRouter();

  useEffect(() => {
    dispatch(fetchMainTitlesThunk());
  }, [dispatch]);

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <Button
          variant="outline"
          onClick={() => route.push("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          User Management
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-muted-foreground animate-pulse">
            Loading main titles...
          </p>
        </div>
      ) : mainTitles.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-muted-foreground">
            No titles found. Add new main titles to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mainTitles.map((mainTitle) => (
            <Card
              key={mainTitle._id}
              className="group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-out rounded-2xl border border-gray-200 dark:border-gray-700"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold group-hover:text-primary transition-colors">
                  {mainTitle.title}
                </CardTitle>
                <FolderOpen className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Manage main title categories and their associated content.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Total Contents:{" "}
                  <span className="font-semibold text-foreground">
                    {mainTitle.contents?.length || 0}
                  </span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
