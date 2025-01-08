import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-center font-bold text-lg">404 Not Found</h1>
        <p className="text-center">The page you are looking for does not exist</p>
        <Link to='/' className="btn btn-neutral my-4">Go back to home</Link>
      </div>
    </div>
  );
}