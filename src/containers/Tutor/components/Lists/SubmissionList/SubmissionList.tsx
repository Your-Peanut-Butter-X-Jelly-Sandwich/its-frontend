import React from 'react';
import Link from 'next/link';

const SubmissionsList = ({ submissions, qn_id }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Student Email
            </th>
            <th scope="col" className="px-6 py-3">
              Submission Number
            </th>
            <th scope="col" className="px-6 py-3">
              Score
            </th>
            <th scope="col" className="px-6 py-3">
              Submission Time
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {submissions?.submissions.map((submission) => (
            <tr className="bg-white border-b hover:bg-gray-50" key={submission.pk}>
              <td className="px-6 py-4">{submission.submitted_by.email}</td>
              <td className="px-6 py-4">{submission.submission_number}</td>
              <td className="px-6 py-4">{submission.score}</td>
              <td className="px-6 py-4">{new Date(submission.submission_date).toLocaleString()}</td>
              <td className="px-6 py-4">
                <Link href={`/en/tutor/questions/${qn_id}/submissions/${submission.pk}`}>
                  <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                    View Detail
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionsList;
