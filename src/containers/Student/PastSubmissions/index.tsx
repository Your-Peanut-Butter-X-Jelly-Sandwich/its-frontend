"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "antd";
type PropsType = {
  assignment_id: string;
  qn_id: string;
};

const PastSubmissionsContainer: React.FC<PropsType> = ({
  assignment_id,
  qn_id,
}: PropsType) => {
  const pathname = usePathname();
  return (
    <div>
      Here you can see ALL past attempts for question{" "}
      <strong className="text-red-600">{qn_id}</strong> under assignment{" "}
      <strong className="text-red-600">{assignment_id}</strong> and the
      corresponding reports.
      <div>
        <Link href={`${pathname}/${1}`}>
          <Button>Submission 1</Button>
        </Link>
      </div>
      <div>
        <Link href={`${pathname}/${2}`}>
          <Button>Submission 2</Button>
        </Link>
      </div>
    </div>
  );
};

export default PastSubmissionsContainer;
