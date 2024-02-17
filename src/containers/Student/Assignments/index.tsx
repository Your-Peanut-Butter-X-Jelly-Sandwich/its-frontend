"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const AssignmentsContainer: React.FC = () => {
  const pathname = usePathname();
  return (
    <div>
      This page should contain a list of assignments currently assigned to the
      students
      <div className="flex justify-center">
        <button className="bg-black text-white p-5 rounded-lg">
          <Link href={`${pathname}/100`}>
            Check out assignment 100
          </Link>
        </button>
      </div>
      <div className="flex justify-center">
        <button className="bg-black text-white p-5 rounded-lg">
          <Link href={`${pathname}/101`}>
            Check out assignment 101
          </Link>
        </button>
      </div>
    </div>
  );
};

export default AssignmentsContainer;
