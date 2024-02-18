"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const StudentDashboardContainer: React.FC = () => {
  const pathname = usePathname();
  return (
    <div>
      This is the student landing page. *After logged in as student, this is the
      page we redirect the users to. This page should contain some metrics such
      as: activity, qns solved etc. from this page students can navigate to see
      their assignments.
      <div className="flex justify-center">
        <Link href={`${pathname}/assignments`}>
          <button className="bg-black text-white rounded-lg p-5">
            Check Out Assignments
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboardContainer;
