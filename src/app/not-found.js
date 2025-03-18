// src/app/not-found.js
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="text-lg mt-4">
        The page you're looking for does not exist. Please visit the{" "}
        <a
          href="/AC"
          className="text-blue-500 hover:underline"
        >
          AC
        </a>{" "}
        or{" "}
        <a
          href="/Refrigerator"
          className="text-blue-500 hover:underline"
        >
          Refrigerator
        </a>{" "}
        page.
      </p>
    </div>
  );
};

export default NotFoundPage;
