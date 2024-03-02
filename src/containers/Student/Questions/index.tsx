"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const QuestionsContainer: React.FC = () => {
  const pathname = usePathname();
  return (
    <div>
      <button className="bg-black text-white p-5 m-4 rounded-lg block w-3/5">
        <Link href={`${pathname}/1`}>Back to Student Dashboard</Link>
      </button>
      Select the question you want to attempt
      <button className="bg-black text-white p-5 m-4 rounded-lg block w-3/5">
        <Link href={`${pathname}/1`}>Question 1</Link>
      </button>
      <button className="bg-black text-white p-5 m-4 rounded-lg block w-3/5">
        <Link href={`${pathname}/2`}>Question 2</Link>
      </button>
      <button className="bg-black text-white p-5 m-4 rounded-lg block w-3/5">
        <Link href={`${pathname}/3`}>Question 3</Link>
      </button>
      <button className="bg-black text-white p-5 m-4 rounded-lg block w-3/5">
        <Link href={`${pathname}/4`}>Question 4</Link>
      </button>
      <button className="bg-black text-white p-5 m-4 rounded-lg block w-3/5">
        <Link href={`${pathname}/5`}>Question 5</Link>
      </button>
    </div>
  );
};

export default QuestionsContainer;
