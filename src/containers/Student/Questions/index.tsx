"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const QuestionsContainer: React.FC = () => {
  const pathname = usePathname();
  return (
    <div>
      List of Questions
      <div>
        This page will show a list of all <strong>questions</strong> assigned to
        the student
      </div>
      <button className="bg-black text-white p-5 rounded-lg">
        <Link href={`${pathname}/1`}>Check out question 1</Link>
      </button>
      <button className="bg-black text-white p-5 rounded-lg">
        <Link href={`${pathname}/2`}>Check out question 2</Link>
      </button>
    </div>
  );
};

export default QuestionsContainer;
