"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
type PropsType = {
  assignment_id: string;
};
const AssignmentDetailContainer: React.FC<PropsType> = ({
  assignment_id,
}: PropsType) => {
  const pathname = usePathname();
  return (
    <div>
      Assignment {assignment_id} details
      <div>
        This page will show a list of all <strong>questions</strong> for the
        specific assignment, ie. assignment {assignment_id}{" "}
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

export default AssignmentDetailContainer;
