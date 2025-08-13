"use client";

import MainTitleManager from "@/components/MainTitleManager";
import ReduxExample from "@/components/ReduxExample";

export default function AdminMainTitlePage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Main Title Management
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Create, edit, and manage main titles for your application
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MainTitleManager />
        </div>
        <div>
          <ReduxExample />
        </div>
      </div>
    </div>
  );
}
